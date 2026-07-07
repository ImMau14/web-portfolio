// Service layer for project CRUD operations, with authorization checks via admin cookie.

import type { AstroCookies } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '@/db/client'
import { projects } from '@/db/schema'
import { verifyAdminCookie } from '@/lib/auth'

export type CreateProjectInput = {
  title: string
  description: string
  slug: string
  content?: string
  technologies?: string
  githubUrl?: string | null
  liveUrl?: string | null
  image?: string | null
  isFeatured?: boolean
  date: string
}

// Insert a new project after verifying admin authorization
export async function createProject(input: CreateProjectInput, cookies: AstroCookies) {
  const authorized = verifyAdminCookie(cookies)
  if (!authorized) throw new Error('Unauthorized')

  await db.insert(projects).values({
    title: input.title,
    description: input.description,
    slug: input.slug,
    content: input.content ?? '',
    technologies: input.technologies ?? '',
    githubUrl: input.githubUrl ?? null,
    liveUrl: input.liveUrl ?? null,
    image: input.image ?? null,
    isFeatured: input.isFeatured ? 1 : 0,
    date: input.date,
  })
}

// Retrieve all projects
export async function getAllProjects() {
  return db.select().from(projects).all()
}

// Fetch a single project by its slug
export async function getProjectBySlug(slug: string) {
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).all()
  return rows[0] ?? null
}

// Get only featured projects
export async function getFeaturedProjects() {
  return db.select().from(projects).where(eq(projects.isFeatured, 1)).all()
}

// Update an existing project, only applying provided fields
export async function updateProject(
  slug: string,
  data: Partial<CreateProjectInput>,
  cookies: AstroCookies,
) {
  const authorized = verifyAdminCookie(cookies)
  if (!authorized) throw new Error('Unauthorized')

  const updateData: Record<string, unknown> = {}
  if (data.title !== undefined) updateData.title = data.title
  if (data.description !== undefined) updateData.description = data.description
  if (data.slug !== undefined) updateData.slug = data.slug
  if (data.content !== undefined) updateData.content = data.content
  if (data.technologies !== undefined) updateData.technologies = data.technologies
  if (data.githubUrl !== undefined) updateData.githubUrl = data.githubUrl ?? null
  if (data.liveUrl !== undefined) updateData.liveUrl = data.liveUrl ?? null
  if (data.image !== undefined) updateData.image = data.image ?? null
  if (data.isFeatured !== undefined) updateData.isFeatured = data.isFeatured ? 1 : 0
  if (data.date !== undefined) updateData.date = data.date

  if (Object.keys(updateData).length === 0) return

  await db.update(projects).set(updateData).where(eq(projects.slug, slug))
}

// Delete a project by slug after admin verification
export async function deleteProject(slug: string, cookies: AstroCookies) {
  const authorized = verifyAdminCookie(cookies)
  if (!authorized) throw new Error('Unauthorized')

  await db.delete(projects).where(eq(projects.slug, slug))
}
