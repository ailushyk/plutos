import { userLocale } from '@/lib/user-locale/user-locale'

export const formatDate = (date: Date, locale?: string) => {
  if (!locale) {
    locale = userLocale.get()
  }

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
