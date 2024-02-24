import { headers } from 'next/headers'
import Negotiator from 'negotiator'

import { isServer } from '@/lib/utils'

export const defaultLocale = 'en'

function UserLocale() {
  return {
    get() {
      if (isServer) {
        const acceptLanguage = headers().get('accept-language') || defaultLocale
        let languages = new Negotiator({
          headers: { 'accept-language': acceptLanguage },
        }).languages()
        return languages.shift()
      }
      console.error('user locale does not work on the client side yet.')
      return defaultLocale
    },
  }
}

export const userLocale = UserLocale()
