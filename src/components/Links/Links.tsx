import { LinksForDesktops } from "./LinksForDesktops"
import { LinksForMobiles } from "./LinksForMobiles"
import type { Page } from "./types"

export const Links = ({ pages }: Page[]) => {
  return (
    <>
      <LinksForMobiles pages={pages} />
      <LinksForDesktops pages={pages} />
    </>
  )
}

export default Links
