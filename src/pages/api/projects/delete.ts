import type { APIRoute } from 'astro'
import { z } from 'astro/zod'
import { deleteProject } from '@/features/projects/projects.service'
import { verifyAdminCookie, verifyCsrf } from '@/lib/auth'

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

    const schema = z.object({
      slug: z.string().trim().min(1),
    })

    const { slug } = schema.parse(rawData)
    await deleteProject(slug, cookies)

    return redirect('/admin/projects', 302)
  } catch (error) {
    if (import.meta.env.PROD) {
      console.error('Delete project error:', error)
      return new Response('Something went wrong', { status: 500 })
    }
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 400 })
    }
    return new Response('Internal Server Error', { status: 500 })
  }
}
