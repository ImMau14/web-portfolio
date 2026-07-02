import { createHash } from 'node:crypto'
import type { AstroCookies } from 'astro'

const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD

export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

export function verifyAdminCookie(cookies: AstroCookies): boolean {
  const cookie = cookies.get('admin_auth')
  if (!cookie) return false
  const expectedHash = hashPassword(ADMIN_PASSWORD)
  return cookie.value === expectedHash
}
