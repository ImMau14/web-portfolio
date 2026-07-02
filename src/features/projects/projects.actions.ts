import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro/zod'
import { createProject } from './projects.service'

export const server = {
  createProject: defineAction({
    accept: 'form',
    input: z.object({
      title: z.string().trim().min(1),
      description: z.string().trim().min(1),
      slug: z.string().trim().min(1),
      content: z.string().optional().default(''),
      technologies: z.string().optional().default(''),
      link: z.url({ normalize: true }).optional().nullable(),
      githubUrl: z.url({ normalize: true }).optional().nullable(),
      liveUrl: z.url({ normalize: true }).optional().nullable(),
    }),
    handler: async (input, context) => {
      try {
        const projectData = {
          title: input.title,
          description: input.description,
          slug: input.slug,
          content: input.content,
          technologies: input.technologies,
          ...(input.link !== undefined ? { link: input.link } : {}),
          ...(input.githubUrl !== undefined ? { githubUrl: input.githubUrl } : {}),
          ...(input.liveUrl !== undefined ? { liveUrl: input.liveUrl } : {}),
        }
        await createProject(projectData, context.cookies)
        return { success: true }
      } catch (_error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not save project',
        })
      }
    },
  }),
}
