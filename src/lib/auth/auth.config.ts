import { getUserByEmail } from '@/data/user'
import { SignInSchema } from '@/schemas'
import bcryptjs from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

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
        const validCredentials = SignInSchema.safeParse(credentials)

        if (validCredentials.success) {
          const { email, password } = validCredentials.data
          const user = await getUserByEmail(email)

          if (!user || !user.password) return null

          const passwordMatch = await bcryptjs.compare(password, user.password)
          return passwordMatch ? user : null
        }

        return null
      },
    }),
  ],
}
