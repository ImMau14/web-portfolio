// Admin login form with password field, CSRF via POST to /api/login.

import { motion } from 'motion/react'
import { HiLockClosed } from 'react-icons/hi2'

export default function LoginForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' as const }}
      className="w-full max-w-sm rounded-3xl border border-ui-border-muted bg-ui-front p-8 shadow-2ui"
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ui-primary/10">
        <HiLockClosed className="h-7 w-7 text-ui-primary" aria-hidden="true" />
      </div>

      <h1 className="mb-2 text-center font-geist text-2xl font-bold text-ui-text">Admin</h1>
      <p className="mb-8 text-center text-sm text-ui-text-muted">Enter your password to continue</p>

      <form method="POST" action="/api/login" className="space-y-4">
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ui-text-muted">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full rounded-full border border-ui-border bg-ui-back px-4 py-2.5 text-ui-text placeholder:text-ui-text-muted/50 transition-shadow focus:outline-none focus:ring-2 focus:ring-ui-primary focus:ring-offset-2 focus:ring-offset-ui-front"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-ui-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-ui-primary-hover active:bg-ui-primary-active"
        >
          Sign in
        </button>
      </form>
    </motion.div>
  )
}
