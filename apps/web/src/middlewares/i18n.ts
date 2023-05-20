import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from '@/i18n/i18n-config'

const defaultLocale = 'en'
const definedLocales = [defaultLocale, 'ua', 'pl'] as const

export function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const locales: string[] = [defaultLocale, 'ua', 'pl']
  console.log('languages', languages)
  return matchLocale(languages, locales, defaultLocale)
}

export function i18NMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  if (
    [
      '/sign-in',
      '/sign-up',
      // '/manifest.json',
      // '/favicon.ico',
      // Your other files in `public`
    ].includes(pathname)
  )
    return

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n
    .getInstance()
    .getLocales()
    .every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    let locale = getLocale(request)
    let newPath = `/${locale}${pathname}`.replace(/\/$/, '')
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(newPath, request.url))
  }
}

/**
 * Matcher ignoring
 * - /api
 * - /_next/static
 * - /_next/image
 * - /favicon.ico
 */
export const i18NConfig = ['/((?!api|_next/static|_next/image|favicon.ico).*)']
