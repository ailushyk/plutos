import 'server-only'
import type { Locale } from '@/i18n-config'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ua: () => import('@/dictionaries/ua.json').then((module) => module.default),
  pl: () => import('@/dictionaries/pl.json').then((module) => module.default),
}

export const getTranslation = async (locale: Locale) => dictionaries[locale]()
