'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

export const RefreshCacheIfUserLogout = () => {
  const router = useRouter()
  const { isLoaded, userId, sessionId } = useAuth()

  useEffect(() => {
    if (!userId) {
      console.log('User is not logged in, redirecting to /sign-in')
      router.refresh()
    }
  }, [userId, router])

  return null
}
