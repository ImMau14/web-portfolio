import { useEffect, useState } from "react"
import { FaRegStar } from "react-icons/fa"
import { FaCodeFork, FaGithub, FaLock } from "react-icons/fa6"
import { GrView } from "react-icons/gr"
import TechIcon, { type TechIconKey } from "@components/ProjectCard/TechIcon"

type RepoData = {
  title: string
  date: string | Date
  lang: string
  tech: string[]
  githubUrl: string
  image: string
  alt: string
  description: string
  isPublic: boolean
}

type GitHubData = {
  stargazers_count: number
  forks_count: number
  subscribers_count?: number
}

interface Translations {
  loadingText: string
  noData: string
  unknownError: string
  stars: string
  forks: string
  watchers: string
  privateText: string
}

interface RepoCardProps {
  data: RepoData
  langData: Translations
}

const sanitizeRepoName = (url: string) => {
  if (!url) return ""
  return url.replace(/^https?:\/\/(www\.)?github\.com\//i, "").replace(/\/$/, "")
}

const toIsoDateFallback = (d: string | Date) => {
  try {
    const dateObj = d instanceof Date ? d : new Date(String(d))
    if (isNaN(dateObj.getTime())) return String(d)
    return dateObj.toISOString().split("T")[0]
  } catch {
    return String(d)
  }
}

const RepoCard = ({ data, langData }: RepoCardProps) => {
  const { title, date, lang, tech = [], githubUrl = "", image, alt, description, isPublic } = data

  const repoName = sanitizeRepoName(githubUrl)

  const [githubStats, setGithubStats] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [formattedDate, setFormattedDate] = useState<string>(() => toIsoDateFallback(date))

  const { loadingText, noData, unknownError, stars, forks, watchers, privateText } = langData

  useEffect(() => {
    try {
      const dateObj = date instanceof Date ? date : new Date(String(date))
      if (!isNaN(dateObj.getTime())) {
        const candidateLocale = typeof lang === "string" && lang.length === 2 ? `${lang}-${lang.toUpperCase()}` : lang
        try {
          const formatted = dateObj.toLocaleDateString(candidateLocale as string)
          setFormattedDate(formatted)
        } catch {
          setFormattedDate(toIsoDateFallback(date))
        }
      } else {
        setFormattedDate(String(date))
      }
    } catch {
      setFormattedDate(String(date))
    }
  }, [date, lang])

  useEffect(() => {
    const fetchRepoData = async () => {
      if (!isPublic) {
        setLoading(false)
        setError(noData)
        return
      }

      if (!repoName) {
        setLoading(false)
        setError("Invalid GitHub URL")
        return
      }

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`https://api.github.com/repos/${repoName}`)

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const repoData = await response.json()

        setGithubStats({
          stargazers_count: repoData.stargazers_count ?? 0,
          forks_count: repoData.forks_count ?? 0,
          subscribers_count: repoData.subscribers_count ?? repoData.watchers_count ?? 0,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : unknownError)
      } finally {
        setLoading(false)
      }
    }

    fetchRepoData()
  }, [isPublic, repoName, noData, unknownError])

  return (
    <article className="flex h-[600px] transform flex-col items-center gap-4 rounded-xl border-2 border-silver-700 bg-gradient-to-b from-silver-850 via-silver-900 to-silver-950 p-2 transition-transform duration-1000 ease-in-out hover:scale-[102%] md:w-full">
      <img src={image} alt={alt} className="rounded-xl border-2 border-silver-600/30" />
      <div className="flex h-full w-full flex-col gap-4 px-2 pb-2">
        <h1 className="font-heading text-2xl text-silver-400">{repoName || title}</h1>
        <p className="font-body text-silver-500">{description}</p>

        {tech.length > 0 && (
          <div className="flex flex-row gap-2">
            {tech.map((t) => (
              <TechIcon key={t} icon={t as TechIconKey} size={30} title={t} />
            ))}
          </div>
        )}

        {loading && isPublic && <p className="text-silver-500/70">{loadingText}...</p>}

        {error && <p className="text-orange-300/70">{error}</p>}

        {githubStats && isPublic && (
          <div className="mt-4 flex flex-row gap-4 text-silver-500">
            <div className="flex items-center gap-1">
              <FaRegStar />
              <span>
                {githubStats.stargazers_count} {stars}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaCodeFork />
              <span>
                {githubStats.forks_count} {forks}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <GrView />
              <span>
                {githubStats.subscribers_count ?? 0} {watchers}
              </span>
            </div>
          </div>
        )}

        <div className="mt-auto flex w-full flex-row justify-between gap-4">
          <span className="font-body text-sm text-silver-450/80">{formattedDate}</span>

          {isPublic && githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-2xl text-silver-500 transition-colors duration-200 hover:text-silver-400 active:text-white"
              aria-label={`Open ${title} on GitHub`}
            >
              <FaGithub />
              <span className="sr-only">Open repository on GitHub</span>
            </a>
          ) : (
            <div
              className="flex items-center gap-2 text-silver-500 hover:cursor-not-allowed"
              title="Private"
              aria-label="Private"
            >
              <FaLock />
              <span>{privateText}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default RepoCard
