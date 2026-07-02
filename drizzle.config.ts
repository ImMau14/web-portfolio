import { defineConfig } from 'drizzle-kit'

const url = process.env.ASTRO_DB_REMOTE_URL
if (!url) throw new Error('Falta ASTRO_DB_REMOTE_URL')

const authToken = process.env.ASTRO_DB_APP_TOKEN
if (!authToken) throw new Error('Falta ASTRO_DB_APP_TOKEN')

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'turso',
  dbCredentials: {
    url,
    authToken,
  },
})
