import { useMemo, useState } from 'react'
import type { Project } from '../types'
import ProjectCard from './ProjectCard'

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
  const allTechs = useMemo(() => {
    const techSet = new Set<string>()
    projects.forEach((p) => {
      let techs: string[] = []
      try {
        const parsed = JSON.parse(p.technologies)
        if (Array.isArray(parsed)) techs = parsed
      } catch {
        techs = p.technologies
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      }
      techs.forEach((t) => {
        techSet.add(t)
      })
    })
    return Array.from(techSet).sort()
  }, [projects])

  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const filteredProjects = selectedTech
    ? projects.filter((p) => {
        let techs: string[] = []
        try {
          const parsed = JSON.parse(p.technologies)
          if (Array.isArray(parsed)) techs = parsed
        } catch {
          techs = p.technologies
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        }
        return techs.includes(selectedTech)
      })
    : projects

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setSelectedTech(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedTech === null
              ? 'bg-ui-primary text-on-primary'
              : 'bg-ui-back border border-ui-border text-ui-text-muted hover:bg-ui-base hover:text-ui-text'
          }`}
        >
          All
        </button>
        {allTechs.map((tech) => (
          <button
            type="button"
            key={tech}
            onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTech === tech
                ? 'bg-ui-primary text-on-primary'
                : 'bg-ui-back border border-ui-border text-ui-text-muted hover:bg-ui-base hover:text-ui-text'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-ui-border bg-ui-front p-12 text-center">
          <p className="text-ui-text-muted">No projects found for this technology.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
