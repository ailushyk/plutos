import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

import { authConfig } from '@/lib/auth/auth.config'
import { db } from '@/lib/db'

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
    // verifyRequest: '/auth/verify-request',
    // signOut: '/auth/signout',
    // newUser: '/auth/new-user',
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account, ...props }) {
      if (account?.provider === 'credentials') {
        if (!user?.emailVerified) {
          return false
        }
      }
      return true
    },
    //   async jwt({ token, user, ...rest }) {
    //     if (user) {
    //       /** TODO: add all user data what u need to the token when logged in */
    //     }
    //     return token
    //   },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
  events: {
    async linkAccount({ account, user, ...props }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      })
    },
  },
})
