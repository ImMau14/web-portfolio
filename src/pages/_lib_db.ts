import { db } from '@/db/client'
import { projects } from '@/db/schema'

export async function fetchPages() {
  const rows = await db
    .select({
      slug: projects.slug,
      date: projects.createdAt,
    })
    .from(projects)
    .all()

  return rows.map((row) => ({
    slug: row.slug,
    updatedAt: row.date,
  }))
}
