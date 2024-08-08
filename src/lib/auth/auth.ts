import NextAuth from 'next-auth'

import { authConfig } from '@/lib/auth/auth.config'
import { env } from '@/env'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token, user }) {
      session.idToken = token.idToken as string
      return session
    }
  },
  events: {
    // async linkAccount({ account, user, ...props }) {
    //   if (user && user.email) {
    //     await UserService.confirmEmail(user.email)
    //   }
    // },
    async signOut(message) {
      if ('token' in message) {
        const token = { message }
        const idToken = (token.message.token?.idToken as string) || ''
        const logOutUrl = new URL(
          `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`
        )
        logOutUrl.searchParams.set('id_token_hint', idToken)
        await fetch(logOutUrl)
      }
    }
  }
})
