import { auth } from '@/lib/auth/auth'

export const getUser = async () => {
  const session = await auth()
  if (!session?.user) {
    throw new Error('User not authenticated')
  }
  return session.user
}

const getAuthenticatedSession = async () => {
  const session = await auth()
  if (!session?.user) {
    throw new Error('User not authenticated')
  }
  return session
}

export const getIdToken = async () => {
  const { idToken } = await getAuthenticatedSession()
  return idToken
}

export const getAccessToken = async () => {
  const { accessToken } = await getAuthenticatedSession()
  return accessToken
}
