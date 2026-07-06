import { motion } from 'motion/react'
import { useState } from 'react'
import { HiFolder } from 'react-icons/hi2'

type Project = {
  id: number
  title: string
  slug: string
  description: string
  image?: string | null
}

function getCsrfToken(): string {
  const match = document.cookie.match(/(?:^|; )csrf_token=([^;]*)/)
  return match ? (match[1] ?? '') : ''
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
} as const

const card = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
} as const

export default function ProjectList({
  projects: initial = [],
  editBase,
}: {
  projects: Project[]
  editBase: string
}) {
  const [projects, setProjects] = useState<Project[]>(initial)
  const [loading, setLoading] = useState(false)

  async function handleDelete(slug: string) {
    if (!confirm('Delete project? This action cannot be undone.')) return
    setLoading(true)
    try {
      const body = new URLSearchParams()
      body.append('slug', slug)

      const res = await fetch('/api/projects/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': getCsrfToken(),
        },
        body: body.toString(),
      })

      if (!res.ok) throw new Error('Delete failed')

      setProjects((p) => p.filter((x) => x.slug !== slug))
    } catch (_e) {
      alert('Could not delete project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {projects.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {projects.map((p) => (
            <motion.div
              key={p.id}
              variants={card}
              className="group overflow-hidden rounded-3xl border border-ui-border-muted bg-ui-front shadow-3ui transition-shadow hover:shadow-2ui"
            >
              {p.image && (
                <div className="overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full object-cover aspect-video" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-geist text-lg font-semibold text-ui-text">
                      {p.title}
                    </h3>
                    <p className="text-sm text-ui-text-muted">{p.slug}</p>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        (window.location.href = `${editBase}/${encodeURIComponent(p.slug)}/edit`)
                      }
                      className="rounded-full bg-ui-primary px-3.5 py-1.5 text-xs font-semibold text-on-primary transition-colors hover:bg-ui-primary-hover active:bg-ui-primary-active"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.slug)}
                      disabled={loading}
                      className="rounded-full bg-ui-danger/10 px-3.5 py-1.5 text-xs font-semibold text-ui-danger transition-colors hover:bg-ui-danger/20 active:bg-ui-danger/30 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-ui-text-muted">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' as const }}
          className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-ui-border-muted px-6 py-12 text-center"
        >
          <HiFolder className="h-10 w-10 text-ui-text-muted/40" aria-hidden="true" />
          <p className="text-ui-text-muted">No projects yet</p>
          <a
            href="/admin/projects/new"
            className="rounded-full bg-ui-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-ui-primary-hover"
          >
            Create your first project
          </a>
        </motion.div>
      )}
    </div>
  )
}
