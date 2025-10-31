import type { Page } from "./types"

export const LinksForDesktops = ({ pages }: Page[]) => {
  return (
    <>
      <ul className="hidden gap-8 space-x-4 md:flex">
        {pages.map((page, index) => (
          <li key={index}>
            <a
              href={page.href}
              className="font-body text-md relative bg-gradient-to-b from-gray-100 via-gray-100 to-gray-200 bg-clip-text font-semibold text-transparent duration-100 hover:text-white"
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
