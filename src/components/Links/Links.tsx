import { LinksForDesktops } from "./LinksForDesktops"
import { LinksForMobiles } from "./LinksForMobiles"
import type { Page } from "./types"

interface LinksProps {
  pages: Page[]
}

export const Links = ({ pages }: LinksProps) => {
  return (
    <>
      <LinksForMobiles pages={pages} />
      <LinksForDesktops pages={pages} />
    </>
  )
}

export default Links
