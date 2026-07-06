import { RateLimiterMemory } from 'rate-limiter-flexible'

export const loginLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60 * 15,
})
