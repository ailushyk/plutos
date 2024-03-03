import { cache } from 'react'
import { User } from 'next-auth'

import { auth } from '@/lib/auth/auth'

export const getUser = cache(async () => {
  const session = await auth()
  if (!(session?.user && session.user.id)) {
    throw new Error('User not authenticated')
  }

  return session.user as User & { id: string }
})
