// Rate limiter for login attempts using in-memory store (5 attempts per 15 minutes).

import { RateLimiterMemory } from 'rate-limiter-flexible'

export const loginLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60 * 15,
})
