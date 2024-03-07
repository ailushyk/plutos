import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'

import { authConfig } from '@/lib/auth/auth.config'
import { db } from '@/db'
import { UserService } from '@/services/user-service'

declare module 'next-auth' {
  interface User {
    emailVerified: Date | null
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' }, // TODO: doesn't work with database sessions
  callbacks: {
    async signIn({ user, account, ...props }) {
      if (account?.provider === 'credentials') {
        if (!user?.emailVerified) {
          return false
        }
      }
      return true
    },
    async jwt({ token, user, ...rest }) {
      if (user) {
        /** TODO: add all user data what u need to the token when logged in */
      }
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
  events: {
    async linkAccount({ account, user, ...props }) {
      if (user && user.email) {
        await UserService.confirmEmail(user.email)
      }
    },
  },
})
