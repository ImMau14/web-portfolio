import { useState, useRef, useEffect } from "react"
import { IoIosMenu } from "react-icons/io"
import type { Page } from "./types"

interface LinksProps {
  pages: Page[]
}

const DELAY_CLASSES = [
  "delay-0", // idx 0
  "delay-40", // idx 1
  "delay-80", // idx 2
  "delay-120", // idx 3
  "delay-160", // idx 4
  "delay-200", // idx 5+
] as const

export const LinksForMobiles = ({ pages }: LinksProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [animationStage, setAnimationStage] = useState<"hidden" | "entering" | "visible" | "exiting">("hidden")
  const menuRef = useRef<HTMLUListElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      setAnimationStage("entering")
      const timer = setTimeout(() => setAnimationStage("visible"), 250)
      return () => clearTimeout(timer)
    } else {
      setAnimationStage((prev) => {
        if (prev !== "hidden") {
          const _ = setTimeout(() => setAnimationStage("hidden"), 250)
          return "exiting"
        }
        return prev
      })
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as Node)
      ) {
        closeMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const getDelayClass = (idx: number): string => {
    return DELAY_CLASSES[Math.min(idx, DELAY_CLASSES.length - 1)]
  }

  return (
    <div className="relative flex items-center md:hidden">
      <button
        ref={btnRef}
        onClick={toggleMenu}
        className="relative z-30 bg-transparent text-[#eff3ff] transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Links"
        aria-expanded={isOpen}
      >
        <IoIosMenu className="text-3xl text-gray-300" />
      </button>

      <ul
        ref={menuRef}
        className={`absolute right-0 top-6 z-40 mt-2 w-40 overflow-hidden rounded-md border-2 border-silver-800 bg-silver-1000 shadow-lg transition-all duration-250 ease-spring ${animationStage === "hidden" ? "invisible max-h-0 -translate-y-2 scale-95 opacity-0" : ""} ${animationStage === "entering" ? "visible max-h-96 translate-y-0 scale-100 opacity-100" : ""} ${animationStage === "visible" ? "visible max-h-96 translate-y-0 scale-100 opacity-100" : ""} ${animationStage === "exiting" ? "visible max-h-0 -translate-y-2 scale-95 opacity-0" : ""} `}
      >
        {pages.map((page, idx) => (
          <li
            key={idx}
            className={`border-b border-silver-800 transition-all duration-200 ease-out last:border-b-0 hover:bg-emerald-500/20 ${
              animationStage === "entering"
                ? `-translate-y-1 opacity-0 ${getDelayClass(idx)}`
                : animationStage === "visible"
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-1 opacity-0 delay-0"
            } `}
          >
            <a
              href={page.href}
              onClick={closeMenu}
              className="block px-4 py-3 font-body text-sm text-gray-200 transition-colors duration-150 hover:text-white"
            >
              {page.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LinksForMobiles
