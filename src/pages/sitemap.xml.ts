// Dynamically generates sitemap.xml listing all pages with last modification dates.

import type { APIRoute } from 'astro'
import { fetchPages } from './_lib_db'

type PageEntry = {
  slug: string
  updatedAt?: Date | string | null
}

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
]

export const GET: APIRoute = async ({ request, site }) => {
  const origin = (site?.href ?? new URL(request.url).origin).replace(/\/$/, '')

  const staticUrls = STATIC_PAGES.map(
    (p) =>
      `<url><loc>${origin}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
  ).join('')

  const pages = await fetchPages()

  const projectUrls = pages
    .map((p: PageEntry) => {
      const loc = `${origin}/projects/${p.slug}`
      const lastmod = p.updatedAt ? `<lastmod>${new Date(p.updatedAt).toISOString()}</lastmod>` : ''
      return `<url><loc>${loc}</loc>${lastmod}</url>`
    })
    .join('')

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${projectUrls}</urlset>`

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
