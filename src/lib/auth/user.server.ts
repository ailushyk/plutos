import { cache } from 'react'

import { auth } from '@/lib/auth/auth'

export const getUser = cache(async () => {
  const session = await auth()
  if (!(session?.user.id)) {
    throw new Error('User not authenticated')
  }

  return session.user
})
