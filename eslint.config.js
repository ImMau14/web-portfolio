import { defineConfig } from "eslint/config"
import js from "@eslint/js"
import globals from "globals"

import tsParser from "@typescript-eslint/parser"
import tsPlugin from "@typescript-eslint/eslint-plugin"

import reactPlugin from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"

import tailwindcss from "eslint-plugin-tailwindcss"
import importPlugin from "eslint-plugin-import"

import astroPlugin from "eslint-plugin-astro"
import astroParser from "astro-eslint-parser"

export default defineConfig([
  {
    ignores: ["node_modules", "dist", "build", ".cache", ".astro", "**/*.config.*"],
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
      import: importPlugin,
    },

    settings: {
      react: { version: "detect" },
    },

    rules: {
      "no-var": "error",
      "prefer-const": "error",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "import/no-unresolved": "off",
    },
  },

  {
    files: ["**/*.{jsx,tsx,astro,html}"],
    plugins: {
      tailwindcss,
    },
    rules: {
      "tailwindcss/classnames-order": "error",
      "tailwindcss/no-custom-classname": "error",
      "tailwindcss/no-contradicting-classname": "error",
    },
  },

  {
    files: ["**/*.astro"],

    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "module",
        extraFileExtensions: [".astro"],
      },
      globals: globals.browser,
    },

    plugins: {
      astro: astroPlugin,
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooks,
    },

    processor: "astro/astro",

    rules: {
      "astro/no-conflict-set-directives": "error",
      "astro/no-unused-define-vars-in-style": "error",

      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "off",

      "import/no-unresolved": "off",
    },
  },

  {
    files: ["src/content.config.ts"],
    rules: {
      "import/no-unresolved": "off",
    },
  },
])
