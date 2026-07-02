import type { APIRoute } from 'astro'
import { hashPassword } from '@/lib/auth'

const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD?.trim() ?? ''

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!ADMIN_PASSWORD) {
    return new Response('Server misconfiguration', { status: 500 })
  }

  const formData = await request.formData()
  const password = formData.get('password')?.toString().trim() ?? ''

  const inputHash = hashPassword(password)
  const expectedHash = hashPassword(ADMIN_PASSWORD)

  if (inputHash !== expectedHash) {
    return new Response('Incorrect password', { status: 401 })
  }

  cookies.set('admin_auth', expectedHash, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return redirect('/admin', 302)
}
