import { defineConfig } from "astro/config"

import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"

// For alias imports
import { fileURLToPath, URL } from "node:url"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],

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
