import { auth } from '@/lib/auth/auth'

const getAuthenticatedSession = async () => {
  const session = await auth()
  if (!session?.user) {
    throw new Error('User not authenticated')
  }
  return session
}

export const getUser = async () => {
  const { user } = await getAuthenticatedSession()
  return user
}

export const getAccessToken = async () => {
  const { accessToken } = await getAuthenticatedSession()
  return accessToken
}
