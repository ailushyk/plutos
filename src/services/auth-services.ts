import bcryptjs from 'bcryptjs'

import { UserRepository } from '@/db/repositories/user-repository'
import { SignInSchema } from '@/schemas'

async function authorizeByCredentials(credentials: unknown) {
  const validCredentials = SignInSchema.safeParse(credentials)

  if (validCredentials.success) {
    const { email, password } = validCredentials.data
    const user = await UserRepository.getByEmail(email)

    if (!user || !user.password) return null

    const passwordMatch = await bcryptjs.compare(password, user.password)
    return passwordMatch ? user : null
  }

  return null
}

export const AuthServices = {
  authorizeByCredentials,
}
