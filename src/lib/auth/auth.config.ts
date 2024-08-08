import { NextAuthConfig } from 'next-auth'
import { env } from '@/env'
import Keycloak from 'next-auth/providers/keycloak'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image: string
    }
  }
}

export const authConfig: NextAuthConfig = {
  providers: [Keycloak],
  callbacks: {
    async jwt({ token, account, ...args }) {
      if (account) {
        token.idToken = account.id_token
      }
      return token
    },
  },
  events: {
    async signOut(message) {
      if ('token' in message) {
        const token = { message }
        const idToken = (token.message.token?.idToken as string) || ''
        const logOutUrl = new URL(
          `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
        )
        logOutUrl.searchParams.set('id_token_hint', idToken)
        await fetch(logOutUrl)
      }
    },
  },
}
