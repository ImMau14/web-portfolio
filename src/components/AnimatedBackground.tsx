import React, { useEffect, useRef, useState, useCallback } from "react"
import bgVideo from "@assets/bg.webm"
import { motion } from "framer-motion"

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

    const onCanPlayThrough = () => markReady()
    const onLoadedData = () => markReady()
    const onPlaying = () => markReady()

    v.addEventListener("canplaythrough", onCanPlayThrough)
    v.addEventListener("loadeddata", onLoadedData)
    v.addEventListener("playing", onPlaying)

    const tryPlay = async () => {
      try {
        await v.play()
      } catch (err) {
        console.warn("Video autoplay prevented or failed to play programmatically:", err)
      }
    }
    tryPlay().catch(() => {})

    timeoutRef.current = window.setTimeout(() => {
      markReady()
    }, loadTimeoutMs)

    return () => {
      v.removeEventListener("canplaythrough", onCanPlayThrough)
      v.removeEventListener("loadeddata", onLoadedData)
      v.removeEventListener("playing", onPlaying)
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [loadTimeoutMs, markReady])

  return (
    <section className={`relative w-full overflow-visible ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[-10] h-[calc(100vh-5rem-4.8rem)] overflow-hidden">
        <motion.video
          ref={videoRef}
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="pointer-events-none h-full w-full select-none object-cover object-top opacity-50"
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-5rem-5rem)] w-full flex-col items-center justify-center">
        {children}
      </div>
    </section>
  )
}

export default AnimatedBackground
