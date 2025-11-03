export const locales = ["en", "es"] as const
export const defaultLocale = "en"
export type Locale = (typeof locales)[number]
