// Authentication utilities: password verification, JWT token generation/verification, admin cookie check, and CSRF validation.

import type { AstroCookies } from 'astro'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = import.meta.env.JWT_SECRET
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(import.meta.env.ADMIN_PASSWORD, 12)

// Compare a plain password against the stored hash
export async function verifyPassword(password: string): Promise<boolean> {
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH)
}

// Create a JWT for the admin session (24h expiry)
export function generateToken(): string {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' })
}

// Verify a JWT token’s validity
export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

// Check the admin_auth cookie for a valid JWT
export function verifyAdminCookie(cookies: AstroCookies): boolean {
  const cookie = cookies.get('admin_auth')
  if (!cookie) return false
  return verifyToken(cookie.value)
}

// Validate the CSRF token cookie against the request header
export function verifyCsrf(cookies: AstroCookies, request: Request): boolean {
  const cookieToken = cookies.get('csrf_token')?.value
  const headerToken = request.headers.get('x-csrf-token')
  return !!cookieToken && cookieToken === headerToken
}
