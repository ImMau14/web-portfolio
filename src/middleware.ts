// Astro middleware handling admin auth redirection, CSP nonce injection, security headers, and HTML script nonce patching.

import { createHash } from 'node:crypto'
import type { MiddlewareHandler } from 'astro'
import { verifyAdminCookie } from '@/lib/auth'

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url)

  // Generate a unique nonce for CSP and make it available to layouts/pages
  const nonce = createHash('sha256').update(Math.random().toString()).digest('base64')
  context.locals.cspNonce = nonce

  // If already logged in, redirect away from login page
  if (url.pathname.startsWith('/admin/login')) {
    const isAuthorized = verifyAdminCookie(context.cookies)
    if (isAuthorized) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/admin' },
      })
    }
  }

  // Protect admin routes (except login/logout API)
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

  // Add security headers to every response
  const headers = new Headers(response.headers)
  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'no-referrer-when-downgrade')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')

  // Content Security Policy: allow inline styles/scripts in dev, use nonce in production
  if (import.meta.env.DEV) {
    headers.set(
      'Content-Security-Policy',
      "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:; script-src 'self' 'unsafe-inline'; connect-src 'self' https://api.github.com https://*.blob.vercel-storage.com https://astro.build;",
    )
  } else {
    headers.set(
      'Content-Security-Policy',
      `default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:; script-src 'self' 'nonce-${nonce}'; connect-src 'self' https://api.github.com https://*.blob.vercel-storage.com;`,
    )
  }

  // If the response is HTML, inject the nonce into every <script> tag that doesn’t already have one
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('text/html')) {
    const html = await response.text()
    const modifiedHtml = html.replace(
      /<script(\s(?![^>]*\bnonce=)[^>]*)?>/g,
      (_match, attrs) => `<script nonce="${nonce}"${attrs || ''}>`,
    )
    return new Response(modifiedHtml, {
      status: response.status,
      headers,
    })
  }

  return new Response(response.body, {
    status: response.status,
    headers,
  })
}
