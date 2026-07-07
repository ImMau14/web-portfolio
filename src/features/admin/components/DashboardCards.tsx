// Dashboard cards showing admin actions: Projects link and a placeholder for future tools.

import { motion } from 'motion/react'
import { HiOutlineArchiveBox, HiOutlinePlus } from 'react-icons/hi2'

// Staggered animation variants for the container and items
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
} as const

export default function DashboardCards() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-2"
    >
      <motion.a
        href="/admin/projects"
        variants={item}
        className="group rounded-3xl border border-ui-border-muted bg-ui-front p-6 shadow-3ui transition-shadow hover:shadow-2ui"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ui-primary/10 text-ui-primary transition-colors group-hover:bg-ui-primary group-hover:text-on-primary">
            <HiOutlineArchiveBox className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-geist text-lg font-semibold text-ui-text">Projects</h2>
            <p className="text-sm text-ui-text-muted">Create and edit portfolio projects</p>
          </div>
        </div>
      </motion.a>

      <motion.div
        variants={item}
        className="rounded-3xl border border-dashed border-ui-border-muted p-6"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ui-text-muted/10 text-ui-text-muted">
            <HiOutlinePlus className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-geist text-lg font-semibold text-ui-text-muted">Coming soon</h2>
            <p className="text-sm text-ui-text-muted/70">More admin tools on the way</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
