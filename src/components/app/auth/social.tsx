'use client'

import { useState, useTransition } from 'react'
import { signInWithProviderAction } from '@/actions/auth.actions'

import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/icons/github-icon'
import { GoogleIcon } from '@/components/icons/google-icon'
import { TextWithPendingSpinner } from '@/components/text-with-pending-spinner'

export const Social = () => {
  const [state, setState] = useState('')
  const [isPending, startTransition] = useTransition()
  const onClick = async (provider: 'google' | 'github') => {
    setState(provider)
    startTransition(() => {
      signInWithProviderAction(provider)
    })
  }

  return (
    <div className="flex w-full flex-row items-center justify-center gap-2">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => onClick('google')}
        disabled={isPending}
      >
        <TextWithPendingSpinner isPending={state === 'google' && isPending}>
          <GoogleIcon className="h-4 w-4" />
        </TextWithPendingSpinner>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => onClick('github')}
        disabled={isPending}
      >
        <TextWithPendingSpinner isPending={state === 'github' && isPending}>
          <GithubIcon className="h-4 w-4" />
        </TextWithPendingSpinner>
      </Button>
    </div>
  )
}
