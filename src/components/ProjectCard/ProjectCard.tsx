import { FaGithub, FaLock } from "react-icons/fa6"
import { IoOpenOutline } from "react-icons/io5"
import TechIcon, { type TechIconKey } from "./TechIcon"

export interface ProjectCardProps {
  title: string
  image: string | { src: string }
  alt?: string
  description?: string
  techs?: TechIconKey[]
  githubUrl?: string | null
  articleUrl?: string | null
  isPublic: boolean
  className?: string
  techIconSize?: number | string
  techIconClassName?: string
}

function resolveImageSrc(img: string | { src: string }) {
  return typeof img === "string" ? img : img.src
}

export const ProjectCard = ({
  title,
  image,
  alt = "",
  description,
  techs = [],
  githubUrl = null,
  articleUrl = null,
  isPublic,
  className = "",
  techIconSize = 20,
  techIconClassName,
}: ProjectCardProps) => {
  const imgSrc = resolveImageSrc(image)

  return (
    <article
      className={`pointer-events-auto relative z-0 grid h-[400px] w-full transform grid-rows-[auto_1fr] overflow-hidden rounded-xl border-2 border-silver-550/50 bg-gradient-to-b from-silver-300 via-silver-300 to-gray-200 ease-in-out before:absolute before:top-0 before:h-2 before:w-full before:bg-gradient-to-b before:from-silver-1000/5 before:to-transparent after:pointer-events-none after:absolute after:bottom-0 after:h-3 after:w-full after:bg-gradient-to-t after:from-silver-50/50 after:to-transparent md:transition-transform md:duration-200 md:hover:scale-[104%] dark:border-silver-700 dark:bg-gradient-to-b dark:from-silver-850 dark:via-silver-900 dark:to-silver-950 dark:before:h-6 dark:before:from-silver-1000/10 dark:after:pointer-events-none dark:after:absolute dark:after:bottom-0 dark:after:w-full dark:after:bg-gradient-to-t dark:after:from-silver-150/5 dark:after:to-transparent ${className}`}
      aria-labelledby={`project-card-${title}`}
    >
      <div className="w-full overflow-hidden bg-red-400 md:h-48">
        <img src={imgSrc} alt={alt || `${title} preview`} className="w-full object-cover md:h-full" loading="lazy" />
      </div>

      <section className="flex h-full w-full flex-col gap-3 p-4">
        <h1
          id={`project-card-${title}`}
          className="font-heading text-2xl leading-tight text-silver-800 dark:text-silver-350"
        >
          {title}
        </h1>

        {description && (
          <p className="mb-2 line-clamp-3 font-body text-sm text-silver-750 dark:text-silver-400">{description}</p>
        )}

        <div className="flex items-center gap-2 text-3xl">
          {techs.map((t) => (
            <TechIcon key={t} icon={t} size={techIconSize} className={techIconClassName} title={t} />
          ))}
        </div>

        <div className="mt-auto flex items-center justify-end gap-4">
          {articleUrl && (
            <a
              href={articleUrl}
              className="flex items-center gap-2 text-2xl text-silver-800 transition-colors duration-200 hover:text-silver-400 active:text-white dark:text-silver-500"
              aria-label={`Open ${title} article`}
            >
              <IoOpenOutline />
              <span className="sr-only">Read article</span>
            </a>
          )}

          {isPublic && githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-2xl text-silver-800 transition-colors duration-200 hover:text-silver-400 active:text-white dark:text-silver-500"
              aria-label={`Open ${title} on GitHub`}
            >
              <FaGithub />
              <span className="sr-only">Open repository on GitHub</span>
            </a>
          ) : (
            <div
              className="flex items-center gap-2 text-silver-800 hover:cursor-not-allowed hover:text-silver-400 dark:text-silver-500"
              title={isPublic ? "Repo not provided" : "Private repository"}
              aria-hidden={false}
              role="img"
            >
              <FaLock />
              <span className="sr-only">{isPublic ? "No repository provided" : "Private repository"}</span>
            </div>
          )}
        </div>
      </section>
    </article>
  )
}

export default ProjectCard
