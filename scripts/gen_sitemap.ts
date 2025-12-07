import * as fs from "fs"
import * as path from "path"

const baseUrl: string = process.argv[2] || "https://immau14.vercel.app"

const folder: string = process.argv[3] || "dist"

function walk(dir: string, filelist: string[] = []): string[] {
  try {
    const files: string[] = fs.readdirSync(dir)

    files.forEach((file) => {
      const filepath: string = path.join(dir, file)
      const stat: fs.Stats = fs.statSync(filepath)

      if (stat.isDirectory()) {
        // Llamada recursiva para subdirectorios
        walk(filepath, filelist)
      } else {
        // Agregar el archivo a la lista
        filelist.push(filepath)
      }
    })
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }
  return filelist
}

function toUrl(filePath: string): string {
  const rel: string = path.relative(folder, filePath).replace(/\\/g, "/")

  if (rel === "index.html") {
    return baseUrl + "/"
  }

  return (
    baseUrl +
    "/" +
    rel
      .replace(/index.html$/, "")
      .replace(/\.html$/, "")
      .replace(/\/$/, "")
  )
}

if (!fs.existsSync(folder)) {
  console.error("Folder not found:", folder)
  process.exit(1)
}

const files: string[] = walk(folder)
const htmlFiles: string[] = files.filter((f) => f.endsWith(".html") || f.endsWith(".htm"))

console.log('<?xml version="1.0" encoding="UTF-8"?>')
console.log('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

for (const f of htmlFiles) {
  const url: string = toUrl(f)

  const mtime: string = fs.statSync(f).mtime.toISOString().split("T")[0]

  console.log("  <url>")
  console.log("    <loc>" + url + "</loc>")
  console.log("    <lastmod>" + mtime + "</lastmod>")
  console.log("  </url>")
}

console.log("</urlset>")
