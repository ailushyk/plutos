'use client'

import { useCallback, useEffect } from 'react'
import { verifyEmailAction } from '@/actions/auth.actions'
import { useFormState } from 'react-dom'

import { EmailVerified } from '@/components/auth/email-verified'
import { InvalidToken } from '@/components/auth/invalid-token'
import { SpinnerIcon } from '@/components/icons/spinner-icon'

export function VerifyRequestContent({ token }: { token: string }) {
  const [state, formAction] = useFormState(verifyEmailAction, undefined)
  const verifyRequest = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    formAction({ token })
  }, [formAction, token])

  useEffect(() => {
    verifyRequest().then()
  }, [token, verifyRequest])

  return (
    <div className="text-center">
      <div>
        {state?.status === 'ok' ? (
          <EmailVerified />
        ) : state?.status === 'error' ? (
          <InvalidToken />
        ) : (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <SpinnerIcon className="animate-spin" />
            verification...
          </div>
        )}
      </div>
    </div>
  )
}
