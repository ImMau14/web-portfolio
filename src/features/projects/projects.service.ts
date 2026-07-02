import type { AstroCookies } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/db/client'
import { projects } from '@/db/schema'
import { verifyAdminCookie } from '@/lib/auth'

type CreateProjectInput = {
  title: string
  description: string
  slug: string
  content?: string
  technologies?: string
  link?: string | null
  githubUrl?: string | null
  liveUrl?: string | null
}

export async function createProject(input: CreateProjectInput, cookies: AstroCookies) {
  const authorized = verifyAdminCookie(cookies)
  if (!authorized) throw new Error('Unauthorized')

  await db.insert(projects).values({
    title: input.title,
    description: input.description,
    slug: input.slug,
    content: input.content ?? '',
    technologies: input.technologies ?? '',
    link: input.link ?? null,
    githubUrl: input.githubUrl ?? null,
    liveUrl: input.liveUrl ?? null,
  })
}

export async function getAllProjects() {
  return db.select().from(projects).all()
}

export async function getProjectBySlug(slug: string) {
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).all()
  return rows[0] ?? null
}
