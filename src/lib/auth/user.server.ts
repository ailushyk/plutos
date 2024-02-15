import { auth } from '@/lib/auth/auth'

export const getUser = async () => {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('User not authenticated')
  }

  return session.user
}
