// API route for admin login, verifies password, issues JWT and CSRF tokens, rate-limited.

import type { APIRoute } from 'astro'
import { generateToken, verifyPassword } from '@/lib/auth'
import { loginLimiter } from '@/lib/rateLimiter'

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

  // Apply rate limiting
  try {
    await loginLimiter.consume(ip)
  } catch {
    return new Response('Too many attempts. Try again later.', { status: 429 })
  }

  const formData = await request.formData()
  const password = formData.get('password')?.toString().trim() ?? ''

  const valid = await verifyPassword(password)
  if (!valid) {
    return new Response('Incorrect password', { status: 401 })
  }

  // Generate session JWT and CSRF token, set as cookies
  const token = generateToken()
  cookies.set('admin_auth', token, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  const csrfToken = crypto.randomUUID()
  cookies.set('csrf_token', csrfToken, {
    httpOnly: false,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return redirect('/admin', 302)
}
