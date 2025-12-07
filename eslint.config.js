import { defineConfig } from "eslint/config"
import js from "@eslint/js"
import globals from "globals"

import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

import reactPlugin from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import tailwind from "eslint-plugin-tailwindcss"
import importPlugin from "eslint-plugin-import"
import prettierPlugin from "eslint-plugin-prettier"

import astroPlugin from "eslint-plugin-astro"
import astroParser from "astro-eslint-parser"

import { FlatCompat } from "@eslint/eslintrc"
import path from "path"
import url from "url"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const compat = new FlatCompat({ baseDirectory: __dirname })

export default defineConfig([
  {
    ignores: ["dist", "build", "node_modules", ".cache", "./.astro/**", "*.config.*"],
    settings: {
      react: { version: "detect" },
    },
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: compat.extends("plugin:react/recommended", "plugin:@typescript-eslint/recommended", "prettier"),
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooks,
      tailwindcss: tailwind,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.eslint.json"],
        },
      },
      react: { version: "detect" },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: ["./tsconfig.eslint.json"],
      },
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "tailwindcss/classnames-order": "error",
      "tailwindcss/no-custom-classname": "error",
      "tailwindcss/no-contradicting-classname": "error",
      "import/no-unresolved": "error",
      "prettier/prettier": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },

  {
    files: ["**/*.astro"],
    extends: compat.extends("prettier"),
    processor: "astro/astro",
    plugins: {
      astro: astroPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooks,
      tailwindcss: tailwind,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.eslint.json"],
        },
      },
      react: { version: "detect" },
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: false },
        extraFileExtensions: [".astro"],
      },
      globals: globals.browser,
    },
    rules: {
      "import/no-unresolved": "off",
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "off",
      "tailwindcss/classnames-order": "error",
      "tailwindcss/no-custom-classname": "error",
      "tailwindcss/no-contradicting-classname": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
    },
  },

  {
    files: ["src/content.config.ts"],
    rules: {
      "import/no-unresolved": "off",
    },
  },
])
