import type { Page } from "./types"

interface LinksProps {
  pages: Page[]
}
export const LinksForDesktops = ({ pages }: LinksProps) => {
  return (
    <>
      <ul className="hidden gap-8 space-x-4 md:flex">
        {pages.map((page, index) => (
          <li key={index}>
            <a
              href={page.href}
              className="relative bg-gradient-to-b from-gray-950 via-gray-950 to-gray-800 bg-clip-text font-body font-semibold text-transparent duration-100 hover:text-gray-900 active:text-gray-800 dark:from-gray-100 dark:via-gray-100 dark:to-gray-200 dark:hover:text-silver-300 dark:active:text-white"
            >
              {page.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default LinksForDesktops
