import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  githubUrl: text('github_url'),
  liveUrl: text('live_url'),
  technologies: text('technologies').notNull(),
  image: text('image'), // base64 data URL, optional
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})
