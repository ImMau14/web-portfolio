import type { MiddlewareHandler } from 'astro'
import { verifyAdminCookie } from '@/lib/auth'

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url)

  if (url.pathname.startsWith('/admin/login')) {
    const isAuthorized = verifyAdminCookie(context.cookies)
    if (isAuthorized) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/admin' },
      })
    }
  }

  if (
    url.pathname.startsWith('/admin') &&
    !url.pathname.startsWith('/admin/login') &&
    !url.pathname.startsWith('/api/login') &&
    !url.pathname.startsWith('/api/logout')
  ) {
    const isAuthorized = verifyAdminCookie(context.cookies)
    if (!isAuthorized) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/admin/login' },
      })
    }
  }

  const response = await next()

  const headers = new Headers(response.headers)
  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'no-referrer-when-downgrade')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:; script-src 'self' 'unsafe-inline';",
  )

  return new Response(response.body, {
    status: response.status,
    headers,
  })
}
