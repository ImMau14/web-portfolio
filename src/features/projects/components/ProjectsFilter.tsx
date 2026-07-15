import type React from 'react'
import { useMemo, useState } from 'react'
import { FaExternalLinkAlt, FaGithub, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'
import type { Project } from '../types'
import ProjectCard from './ProjectCard'

type AvailabilityFilter = 'all' | 'repo' | 'demo' | 'both'
type DateSort = 'newest' | 'oldest'

function parseTechs(technologies: string): string[] {
  try {
    const parsed = JSON.parse(technologies)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  }
}

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
  const allTechs = useMemo(() => {
    const techSet = new Set<string>()
    projects.forEach((p) => {
      for (const t of parseTechs(p.technologies)) {
        techSet.add(t)
      }
    })
    return Array.from(techSet).sort()
  }, [projects])

  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [availability, setAvailability] = useState<AvailabilityFilter>('all')
  const [dateSort, setDateSort] = useState<DateSort>('newest')

  const filteredProjects = useMemo(() => {
    let result = projects

    if (selectedTech) {
      result = result.filter((p) => parseTechs(p.technologies).includes(selectedTech))
    }

    if (availability === 'repo') {
      result = result.filter((p) => !!p.githubUrl)
    } else if (availability === 'demo') {
      result = result.filter((p) => !!p.liveUrl)
    } else if (availability === 'both') {
      result = result.filter((p) => !!p.githubUrl && !!p.liveUrl)
    }

    result = [...result].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateSort === 'newest' ? dateB - dateA : dateA - dateB
    })

    return result
  }, [projects, selectedTech, availability, dateSort])

  const availabilityOptions: [AvailabilityFilter, string, React.ReactNode][] = [
    ['all', 'All', null],
    ['repo', 'Has Repo', <FaGithub key="repo" className="text-[10px]" />],
    ['demo', 'Has Demo', <FaExternalLinkAlt key="demo" className="text-[10px]" />],
    [
      'both',
      'Repo + Demo',
      <>
        <FaGithub className="text-[10px]" />
        <FaExternalLinkAlt className="text-[10px]" />
      </>,
    ],
  ]

  return (
    <div>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-ui-text-muted font-medium uppercase tracking-wider">
            Show:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {availabilityOptions.map(([value, label, icon]) => (
              <button
                type="button"
                key={value}
                onClick={() => setAvailability(value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  availability === value
                    ? 'bg-ui-primary text-on-primary shadow-sm'
                    : 'bg-ui-back border border-ui-border text-ui-text-muted hover:bg-ui-base hover:text-ui-text hover:border-ui-border-hover'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          <span className="hidden sm:block w-px h-5 bg-ui-border" />

          <button
            type="button"
            onClick={() => setDateSort(dateSort === 'newest' ? 'oldest' : 'newest')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-ui-back border border-ui-border text-ui-text-muted hover:bg-ui-base hover:text-ui-text"
            title={dateSort === 'newest' ? 'Showing newest first' : 'Showing oldest first'}
          >
            {dateSort === 'newest' ? (
              <FaSortAmountDown className="text-[10px]" />
            ) : (
              <FaSortAmountUp className="text-[10px]" />
            )}
            {dateSort === 'newest' ? 'Newest' : 'Oldest'}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedTech(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              selectedTech === null
                ? 'bg-ui-primary text-on-primary shadow-sm'
                : 'bg-ui-back border border-ui-border text-ui-text-muted hover:bg-ui-base hover:text-ui-text hover:border-ui-border-hover'
            }`}
          >
            All tech
          </button>
          {allTechs.map((tech) => (
            <button
              type="button"
              key={tech}
              onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedTech === tech
                  ? 'bg-ui-primary text-on-primary shadow-sm'
                  : 'bg-ui-back border border-ui-border text-ui-text-muted hover:bg-ui-base hover:text-ui-text hover:border-ui-border-hover'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 text-xs text-ui-text-muted">
        {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-ui-border bg-ui-front p-12 text-center">
          <p className="text-ui-text-muted">No projects match the selected filters.</p>
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
