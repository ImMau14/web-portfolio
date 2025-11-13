import React from "react"
import type { IconType } from "react-icons"
import { RiJavascriptFill, RiHtml5Fill, RiTailwindCssFill } from "react-icons/ri"
import { SiAstro, SiTypescript, SiFlask, SiActix, SiExpress, SiSqlite } from "react-icons/si"
import { FaReact, FaCss3Alt, FaPython, FaRust } from "react-icons/fa"
import { BiLogoPostgresql } from "react-icons/bi"

const duration = "duration-100"

const ICONS = {
  javascript: {
    component: RiJavascriptFill,
    defaultClassName: `text-yellow-400 hover:text-yellow-300 ${duration}`,
  },
  typescript: {
    component: SiTypescript,
    defaultClassName: `text-blue-400 hover:text-blue-300 ${duration}`,
  },
  html: {
    component: RiHtml5Fill,
    defaultClassName: `text-orange-400 hover:text-orange-300 ${duration}`,
  },
  css: {
    component: FaCss3Alt,
    defaultClassName: `text-sky-400 hover:text-sky-300 ${duration}`,
  },
  astro: {
    component: SiAstro,
    defaultClassName: `text-purple-400 hover:text-purple-300 ${duration}`,
  },
  react: {
    component: FaReact,
    defaultClassName: `text-sky-300 hover:text-sky-200 ${duration}`,
  },
  tailwind: {
    component: RiTailwindCssFill,
    defaultClassName: `text-sky-400 hover:text-sky-300 ${duration}`,
  },
  python: {
    component: FaPython,
    defaultClassName: `text-blue-400 hover:text-blue-300 ${duration}`,
  },
  flask: {
    component: SiFlask,
    defaultClassName: `text-silver-300 hover:text-silver-200 ${duration}`,
  },
  rust: {
    component: FaRust,
    defaultClassName: `text-orange-400 hover:text-orange-300 ${duration}`,
  },
  actix: {
    component: SiActix,
    defaultClassName: `text-silver-300 hover:text-silver-300 ${duration}`,
  },
  postgre: {
    component: BiLogoPostgresql,
    defaultClassName: `text-blue-400 hover:text-blue-300 ${duration}`,
  },
  express: {
    component: SiExpress,
    defaultClassName: `text-silver-300 hover:text-silver-300 ${duration}`,
  },
  sqlite: {
    component: SiSqlite,
    defaultClassName: `text-blue-400 hover:text-blue-300 ${duration}`,
  },
} as const

export type TechIconKey = keyof typeof ICONS

export interface TechIconProps {
  icon: TechIconKey
  size?: number | string
  className?: string
  title?: string
  fallback?: React.ReactNode
}

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export function TechIcon({ icon, size = 20, className, title, fallback = null }: TechIconProps) {
  const entry = ICONS[icon]
  if (!entry) return <>{fallback}</>

  const IconComp = entry.component as IconType
  const finalClassName = cn(entry.defaultClassName, className)

  return <IconComp size={size} className={finalClassName} aria-label={title ?? icon} role="img" />
}

export default TechIcon
