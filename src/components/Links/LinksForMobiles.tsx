import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"
import { IoIosMenu } from "react-icons/io"
import type { Page } from "./types"

export const LinksForMobiles = ({ pages }: Page[]) => {
  const [isOpen, setIsOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    setIsOpen((open) => !open)
  }

  const listVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative flex items-center md:hidden">
      <motion.button
        ref={btnRef}
        onClick={toggleMenu}
        initial={false}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-30"
        style={{
          backgroundColor: "transparent",
          color: "#eff3ff",
        }}
        aria-label="Links"
      >
        <IoIosMenu className="text-3xl text-gray-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            key="dropdown"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={listVariants}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="absolute right-0 top-6 z-40 mt-2 w-40 overflow-hidden rounded-md border-2 border-silver-800 bg-silver-1000 shadow-lg"
          >
            {pages.map((page, idx) => (
              <motion.li
                key={idx}
                variants={itemVariants}
                transition={{ duration: 0.25, ease: "easeOut", delay: idx * 0.04 }}
                initial={false}
                whileHover={{ backgroundColor: "rgba(10, 198, 107, 0.2)" }}
              >
                <a href={page.href} onClick={() => setIsOpen(false)} className="block px-4 py-2 font-body text-sm">
                  {page.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LinksForMobiles
