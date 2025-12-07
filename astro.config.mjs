import { defineConfig } from "astro/config"

import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"

import { fileURLToPath, URL } from "node:url"

export default defineConfig({
  site: "https://immau14.vercel.app",

  experimental: {
    csp: {
      scriptDirective: {
        resources: ["'self'"],
      },

      styleDirective: {
        resources: ["'self'"],
      },

      directives: ["connect-src 'self' https://api.github.com", "img-src 'self'", "font-src 'self'"],
    },
  },

  integrations: [tailwind(), react(), sitemap()],

  vite: {
    plugins: [],
    resolve: {
      alias: {
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@content": fileURLToPath(new URL("./src/content", import.meta.url)),
      },
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        maxParallelFileOps: 1,
      },
    },
    optimizeDeps: {
      force: false,
    },
  },

  output: "static",

  build: {
    inlineStylesheets: "auto",
  },

  server: {
    host: true,
    port: 4321,
  },
})
