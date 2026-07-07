// Project creation and editing form with image upload, slug auto-generation, CSRF protection, and validation.

import { motion } from 'motion/react'
import { useState } from 'react'
import { HiArrowPath, HiChevronRight } from 'react-icons/hi2'

type Project = {
  id?: number
  title: string
  description: string
  slug: string
  content?: string
  technologies?: string
  githubUrl?: string | null
  liveUrl?: string | null
  image?: string | null
  isFeatured?: boolean
  date: string
}

type Props = {
  mode: 'create' | 'edit'
  project?: Project
}

// Convert a string into a URL-friendly slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
}

// Retrieve the CSRF token from the browser cookie
function getCsrfToken(): string {
  const match = document.cookie.match(/(?:^|; )csrf_token=([^;]*)/)
  return match ? (match[1] ?? '') : ''
}

export default function ProjectForm({ mode, project }: Props) {
  const [form, setForm] = useState(() => ({
    title: project?.title ?? '',
    description: project?.description ?? '',
    slug: project?.slug ?? '',
    content: project?.content ?? '',
    technologies: project?.technologies ?? '',
    githubUrl: project?.githubUrl ?? '',
    liveUrl: project?.liveUrl ?? '',
    image: null as File | null,
    isFeatured: project?.isFeatured ?? false,
    date: project?.date ?? '',
  }))
  const [imagePreview, setImagePreview] = useState<string | null>(project?.image ?? null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Handle input changes, auto-fill slug from title in create mode
  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setForm((s) => {
      const next = { ...s, [name]: type === 'checkbox' ? checked : value }
      if (name === 'title' && mode === 'create') {
        next.slug = slugify(value)
      }
      return next
    })
  }

  // Update image preview when a new file is selected
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setForm((s) => ({ ...s, image: file }))
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  // Submit form data to the correct API endpoint
  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const data = new FormData(e.currentTarget)

      if (mode === 'edit') {
        if (!project) throw new Error('Missing original project slug')
        data.append('originalSlug', project.slug)
      }

      // If editing and no new image selected, remove the image field to avoid overwriting
      if (mode === 'edit' && !form.image && imagePreview === project?.image) {
        data.delete('image')
      }

      // Hidden field to help the API detect whether the isFeatured checkbox was toggled
      if (mode === 'edit') {
        data.append('isFeatured_touched', 'true')
      }

      const url = mode === 'create' ? '/api/projects/create' : '/api/projects/update'

      const res = await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
          'X-CSRF-Token': getCsrfToken(),
        },
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Save failed (${res.status}): ${text}`)
      }

      window.location.href = '/admin/projects'
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg || 'Could not save')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-full border border-ui-border bg-ui-back px-4 py-2.5 text-ui-text placeholder:text-ui-text-muted/50 transition-shadow focus:outline-none focus:ring-2 focus:ring-ui-primary focus:ring-offset-2 focus:ring-offset-ui-front'

  const textareaClass =
    'w-full rounded-2xl border border-ui-border bg-ui-back px-4 py-2.5 text-ui-text placeholder:text-ui-text-muted/50 transition-shadow focus:outline-none focus:ring-2 focus:ring-ui-primary focus:ring-offset-2 focus:ring-offset-ui-front'

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' as const }}
      className="space-y-5"
    >
      {error && (
        <div className="rounded-2xl border border-ui-danger/30 bg-ui-danger/10 px-4 py-3 text-sm text-ui-danger">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ui-text">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={onChange}
          required
          placeholder="My Awesome Project"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="slug" className="mb-1.5 block text-sm font-medium text-ui-text">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          value={form.slug}
          onChange={onChange}
          required
          placeholder="my-awesome-project"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-ui-text-muted">
          URL-friendly identifier. Auto-generated from title in create mode.
        </p>
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ui-text">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={onChange}
          required
          rows={3}
          placeholder="A short summary of the project..."
          className={textareaClass}
        />
      </div>

      <div>
        <label htmlFor="technologies" className="mb-1.5 block text-sm font-medium text-ui-text">
          Technologies
        </label>
        <input
          id="technologies"
          name="technologies"
          value={form.technologies}
          onChange={onChange}
          placeholder="React, TypeScript, Tailwind"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="githubUrl" className="mb-1.5 block text-sm font-medium text-ui-text">
            GitHub URL
          </label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="url"
            value={form.githubUrl}
            onChange={onChange}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="liveUrl" className="mb-1.5 block text-sm font-medium text-ui-text">
            Live URL
          </label>
          <input
            id="liveUrl"
            name="liveUrl"
            type="url"
            value={form.liveUrl}
            onChange={onChange}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="mb-1.5 block text-sm font-medium text-ui-text">
          Banner Image (horizontal)
        </label>
        {imagePreview && (
          <div className="mb-2 overflow-hidden rounded-2xl border border-ui-border-muted">
            <img src={imagePreview} alt="Preview" className="w-full object-cover aspect-video" />
          </div>
        )}
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-ui-text file:mr-4 file:rounded-full file:border-0 file:bg-ui-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-on-primary file:transition-colors hover:file:bg-ui-primary-hover"
        />
        <p className="mt-1 text-xs text-ui-text-muted">
          Optional. Max 5MB. Will be displayed as a banner.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isFeatured"
          name="isFeatured"
          type="checkbox"
          checked={form.isFeatured}
          onChange={onChange}
          className="h-4 w-4 rounded border-ui-border text-ui-primary focus:ring-ui-primary"
        />
        <label htmlFor="isFeatured" className="text-sm font-medium text-ui-text">
          Featured project
        </label>
      </div>

      <div>
        <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-ui-text">
          Project Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={onChange}
          required
          className={inputClass}
        />
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ui-text-muted transition-colors hover:text-ui-text"
        >
          <HiChevronRight
            className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`}
            aria-hidden="true"
          />
          Advanced
        </button>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' as const }}
            className="mt-3 overflow-hidden"
          >
            <label htmlFor="content" className="mb-1.5 block text-sm font-medium text-ui-text">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={onChange}
              rows={8}
              placeholder="Detailed project write-up (optional)..."
              className={textareaClass}
            />
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-ui-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-ui-primary-hover active:bg-ui-primary-active disabled:opacity-50"
        >
          {loading && <HiArrowPath className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {loading
            ? mode === 'create'
              ? 'Creating...'
              : 'Saving...'
            : mode === 'create'
              ? 'Create Project'
              : 'Save Changes'}
        </button>
        <a
          href="/admin/projects"
          className="rounded-full border border-ui-border px-5 py-2.5 text-sm font-medium text-ui-text transition-colors hover:bg-ui-back"
        >
          Cancel
        </a>
      </div>
    </motion.form>
  )
}
