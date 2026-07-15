import { FaChalkboardTeacher } from 'react-icons/fa'
import type { Project } from '../types'
import ProjectCard from './ProjectCard'

export default function FeaturedProjectsList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="w-full h-106 flex flex-col items-center justify-center p-6 rounded-3xl border border-ui-border bg-ui-front shadow-3ui">
        <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-2 rounded-xl">
          <div className="p-8 mb-2 rounded-xl border border-ui-border/50 bg-ui-base transition-all duration-300 hover:scale-105 hover:border-ui-border">
            <FaChalkboardTeacher className="text-5xl text-ui-text-muted" />
          </div>
          <h2 className="text-ui-text text-2xl font-geist text-center font-bold">
            No featured projects yet
          </h2>
          <p className="text-ui-text-muted font-geist text-center">
            When the administrator registers new projects, they will appear here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="mb-4">
        <h1 className="text-ui-text text-3xl font-geist font-bold">My featured projects</h1>
        <p className="text-ui-text-muted text-sm mt-1">
          A curated selection of the most relevant and significant projects that have shaped my
          professional journey as a developer.
        </p>
      </div>
      <ul className="w-full md:p-8 md:bg-ui-base md:border md:border-ui-border md:shadow-ui md:rounded-3xl h-auto min-h-106 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <li key={p.slug} className="w-full h-full">
            <ProjectCard project={p} />
          </li>
        ))}
        {projects.length < 3 &&
          Array.from({ length: 3 - projects.length }).map(() => (
            <li key={`placeholder-${crypto.randomUUID()}`} className="w-full h-full">
              <div
                className="rounded-2xl border border-ui-border bg-ui-front shadow-3ui flex items-center justify-center h-full text-ui-text-muted font-geist text-sm min-h-[12rem] 
                        transition-all duration-300 ease-out hover:-translate-y-1 hover:border-ui-primary"
              >
                Coming soon
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
