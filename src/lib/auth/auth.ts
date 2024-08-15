import NextAuth from 'next-auth'
import Keycloak from 'next-auth/providers/keycloak'

import { refreshAccessToken } from '@/lib/auth/refresh-access-token'
import { env } from '@/env'

declare module 'next-auth' {
  interface Session {
    idToken: string
    accessToken: string
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Keycloak],
  callbacks: {
    async jwt({ token, account, trigger, profile }) {
      if (account) {
        token.idToken = account.id_token
        token.accessToken = account.access_token
        token.accessExpiresAt = Number(account.expires_at) * 1000
        token.refreshToken = account.refresh_token
        return token
      }

      if (Date.now() < (token.accessExpiresAt as number)) {
        return token
      }

      return refreshAccessToken(token)
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as string
      return session
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
})
