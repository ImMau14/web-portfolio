import type { APIRoute } from 'astro'
import { fetchPages } from './_lib_db'

type PageEntry = {
  slug: string
  updatedAt?: Date | string | null
}

export const GET: APIRoute = async ({ request, site }) => {
  const origin = site?.href ?? new URL(request.url).origin
  const pages = await fetchPages()

  const urls = pages
    .map((p: PageEntry) => {
      const loc = `${origin}/${p.slug}`
      const lastmod = p.updatedAt ? `<lastmod>${new Date(p.updatedAt).toISOString()}</lastmod>` : ''
      return `<url><loc>${loc}</loc>${lastmod}</url>`
    })
    .join('')

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
