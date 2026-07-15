import { FaBookOpen, FaGithub } from 'react-icons/fa'
import type { Project } from '../types'

export default function ProjectCard({ project }: { project: Project }) {
  const techs = (() => {
    try {
      const parsed = JSON.parse(project.technologies)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return project.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    }
  })()

  const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })

  return (
    <article
      className="group relative flex w-full h-full flex-col rounded-2xl border border-ui-border bg-ui-front shadow-3ui 
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:border-ui-primary"
    >
      {project.image && (
        <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h1 className="font-bold font-geist text-xl leading-tight text-ui-text group-hover:text-ui-primary transition-colors duration-300">
          {project.title}
        </h1>
        <p className="font-geist text-sm leading-relaxed text-ui-text-muted line-clamp-3">
          {project.description}
        </p>

        {techs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {techs.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2.5 py-1 rounded-full border border-ui-border bg-ui-base text-ui-text-muted font-geist
                           transition-all duration-200 hover:border-ui-primary/50 hover:text-ui-text hover:bg-ui-front"
              >
                {tech}
              </span>
            ))}
            {techs.length > 4 && (
              <span
                className="text-[10px] px-2.5 py-1 rounded-full border border-ui-border-muted bg-ui-back text-ui-text-muted/70 font-geist
                               transition-all duration-200 hover:border-ui-primary/50 hover:text-ui-text/80"
              >
                +{techs.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto border-t border-ui-border/30 pt-3 flex items-center justify-between gap-3">
          <span className="text-xs text-ui-text-muted font-geist">{formattedDate}</span>
          <div className="flex items-center gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-1.5 rounded-lg border border-ui-border/50 hover:bg-ui-base transition-colors text-ui-text-muted hover:text-ui-text"
                title="View source on GitHub"
              >
                <FaGithub className="text-sm" />
              </a>
            )}
            <a
              href={`/projects/${project.slug}`}
              className="p-1.5 rounded-lg border border-ui-border/50 hover:bg-ui-base transition-colors text-ui-text-muted hover:text-ui-text"
              title="Project details"
              aria-label="Project details"
            >
              <FaBookOpen className="text-sm" />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live"
                className="px-3 py-1.5 rounded-lg bg-ui-primary text-on-primary text-xs font-semibold hover:bg-ui-primary-hover transition-all duration-200 active:scale-95"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
