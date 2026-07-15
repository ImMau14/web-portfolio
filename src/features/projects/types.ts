export interface Project {
  title: string
  description: string
  slug: string
  image?: string | null
  technologies: string
  date: string
  githubUrl?: string | null
  liveUrl?: string | null
  isFeatured?: number | boolean
}
