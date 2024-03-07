import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { AuthServices } from '@/services/auth-services'

export const authConfig = {
  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
    Google,
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      async authorize(credentials) {
        return AuthServices.authorizeByCredentials(credentials)
      },
    }),
  ],
}
