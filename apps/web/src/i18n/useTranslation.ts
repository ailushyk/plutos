import 'server-only'
import { log } from '@/utils/log'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () =>
    import('@/i18n/translations/en.json').then((module) => module.default),
  ua: () =>
    import('@/i18n/translations/ua.json').then((module) => module.default),
  pl: () =>
    import('@/i18n/translations/pl.json').then((module) => module.default),
}

export const useTranslation = async (locale: Locale) => {
  const dictionary = await dictionaries[locale]()
  const t = (key: string) => {
    let value = key.split('.').reduce((obj, k) => {
      return obj ? obj[k] : null
    }, dictionary)

    if (!value) {
      log(`Missing translation for "${key}" in the "${locale}" locale`)
    }
    if (value === '') {
      log(`Empty translation for key: "${key}" in the "${locale}" locale`)
    }

    return value || key
  }
  return { dictionary, t }
}
