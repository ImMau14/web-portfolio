import { defineCollection, z } from "astro:content"
import { locales } from "@content/utils"

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    // eslint-disable-next-line
    date: z.preprocess((v: any) => new Date(String(v)), z.date()),
    lang: z.enum(locales),
    slug: z.string().optional(),
    tech: z.array(z.string()).optional(),
    image: z.string().optional(),
    alt: z.string().optional(),
    description: z.string().optional(),
    githubUrl: z.string().optional(),
    isPublic: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
  }),
  computedFields: {
    slug: {
      type: "string",
      // eslint-disable-next-line
      resolve: (entry: any) => {
        return entry.data.slug ?? entry.id.replace(/^[^/]+\//, "")
      },
    },
  },
})

const pages = defineCollection({
  type: "data",
  schema: z.any(),
})

export const collections = {
  projects,
  pages,
}
