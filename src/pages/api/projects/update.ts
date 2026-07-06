import { put } from '@vercel/blob'
import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import sharp, { type Metadata } from 'sharp'
import type { CreateProjectInput } from '@/features/projects/projects.service'
import { updateProject } from '@/features/projects/projects.service'
import { verifyAdminCookie, verifyCsrf } from '@/lib/auth'

const RESERVED_SLUGS = [
  'admin',
  'api',
  'login',
  'logout',
  'projects',
  'new',
  'edit',
  'create',
  'update',
  'delete',
]

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .refine((s) => !RESERVED_SLUGS.includes(s), { message: 'Slug is reserved' })

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!verifyAdminCookie(cookies)) {
    return new Response('Unauthorized', { status: 401 })
  }
  if (!verifyCsrf(cookies, request)) {
    return new Response('Invalid CSRF token', { status: 403 })
  }

  try {
    const formData = await request.formData()
    const rawData = Object.fromEntries(formData.entries())

    const cleanedData = {
      ...rawData,
      githubUrl: rawData.githubUrl?.toString().trim() || null,
      liveUrl: rawData.liveUrl?.toString().trim() || null,
    }

    const imageFile = formData.get('image') as File | null
    let imageUrl: string | null | undefined

    if (imageFile !== null) {
      if (imageFile.size > 0) {
        if (!imageFile.type.startsWith('image/')) {
          return new Response('Invalid image type', { status: 400 })
        }
        if (imageFile.size > 5 * 1024 * 1024) {
          return new Response('Image too large (max 5MB)', { status: 400 })
        }

        const arrayBuffer = await imageFile.arrayBuffer()
        const originalBuffer = Buffer.from(arrayBuffer)

        let metadata: Metadata
        try {
          metadata = await sharp(originalBuffer).metadata()
        } catch (metaError) {
          console.error('sharp metadata error:', metaError)
          return new Response('Unrecognized or corrupted image file', { status: 400 })
        }

        if (!metadata.format) {
          return new Response('Could not detect image format', { status: 400 })
        }

        let processedBuffer: Buffer
        try {
          processedBuffer = await sharp(originalBuffer)
            .resize(1200, 630, {
              fit: 'cover',
              position: 'center',
            })
            .webp({ quality: 80 })
            .toBuffer()
        } catch (sharpError) {
          console.error('sharp processing error:', sharpError)
          return new Response('Image processing failed', { status: 400 })
        }

        const newName = imageFile.name.replace(/\.[^.]+$/, '.webp')

        const blob = await put(newName, processedBuffer, {
          access: 'public',
          contentType: 'image/webp',
        })
        imageUrl = blob.url
      } else {
        imageUrl = null
      }
    }

    const schema = z.object({
      originalSlug: z.string().trim().min(1),
      title: z.string().trim().min(1),
      description: z.string().trim().min(1),
      slug: slugSchema,
      content: z.string().optional().default(''),
      technologies: z.string().optional().default(''),
      githubUrl: z.url().optional().nullable(),
      liveUrl: z.url().optional().nullable(),
      image: z.url().optional().nullable(),
    })

    const inputData: Record<string, unknown> = { ...cleanedData }
    if (imageUrl !== undefined) {
      inputData.image = imageUrl
    }

    const input = schema.parse(inputData)

    const updateData: Partial<CreateProjectInput> = {
      title: input.title,
      description: input.description,
      slug: input.slug,
      content: input.content,
      technologies: input.technologies,
      githubUrl: input.githubUrl ?? null,
      liveUrl: input.liveUrl ?? null,
    }

    if (imageUrl !== undefined) {
      updateData.image = input.image ?? null
    }

    await updateProject(input.originalSlug, updateData, cookies)

    return redirect('/admin/projects', 302)
  } catch (error) {
    console.error('Update project error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    const stack = error instanceof Error ? error.stack : ''

    if (import.meta.env.PROD) {
      return new Response('Something went wrong', { status: 500 })
    }

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 400 })
    }

    return new Response(`Internal Server Error: ${message}\n${stack}`, { status: 500 })
  }
}
