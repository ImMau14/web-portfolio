import React, { useEffect, useRef, useState, useCallback } from "react"
import bgVideo from "@assets/bg.webm"

type AnimatedBackgroundProps = {
  children?: React.ReactNode
  className?: string
  loadTimeoutMs?: number
}

export const AnimatedBackground = ({ children, className = "", loadTimeoutMs = 5000 }: AnimatedBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isReady, setIsReady] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const markReady = useCallback(() => {
    setIsReady(true)
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    if (v.readyState >= 4) {
      markReady()
      return
    }

    const handleReady = () => markReady()

    v.addEventListener("canplaythrough", handleReady)
    v.addEventListener("loadeddata", handleReady)
    v.addEventListener("playing", handleReady)

    v.play().catch(() => {
      console.warn("Blocked autoplay")
    })

    timeoutRef.current = window.setTimeout(() => {
      markReady()
    }, loadTimeoutMs)

    return () => {
      v.removeEventListener("canplaythrough", handleReady)
      v.removeEventListener("loadeddata", handleReady)
      v.removeEventListener("playing", handleReady)

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [loadTimeoutMs, markReady])

  return (
    <section className={`relative h-[calc(100vh-5rem)] w-full overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0 z-[-10] overflow-hidden">
        <div className="absolute inset-0 bg-gray-300 dark:bg-purple-900/10" />

        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${isReady ? "opacity-100" : "scale-110 opacity-0 blur-sm"} `}
        >
          <video
            ref={videoRef}
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className={`pointer-events-none h-full w-full select-none object-cover object-top transition-opacity duration-1000 ease-out ${isReady ? "opacity-50" : "opacity-0"} invert dark:invert-0`}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent dark:bg-gradient-to-t dark:from-black/10 dark:via-transparent dark:to-transparent" />
      </div>

      <div className="relative z-10 flex h-[calc(100vh-5rem)] w-full flex-col items-center justify-center">
        {children}
      </div>
    </section>
  )
}

export default AnimatedBackground
