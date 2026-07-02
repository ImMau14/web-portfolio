import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const client = createClient({
  url: import.meta.env.ASTRO_DB_REMOTE_URL,
  authToken: import.meta.env.ASTRO_DB_APP_TOKEN,
})

export const db = drizzle(client, { schema })
