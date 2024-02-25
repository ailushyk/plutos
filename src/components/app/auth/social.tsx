'use client'

import { useSearchParams } from 'next/navigation'
import { signInWithProviderAction } from '@/actions/auth.actions'

import { Form, FormError, SubmitButton } from '@/components/form'
import { GithubIcon } from '@/components/icons/github-icon'
import { GoogleIcon } from '@/components/icons/google-icon'

export const Social = () => {
  const { error } = useAuthProviderError()

  return (
    <Form action={signInWithProviderAction} className="w-full">
      <div className="flex w-full flex-row items-center justify-center gap-2">
        <SubmitButton
          name="_action"
          value="google"
          variant="outline"
          size="lg"
          className="w-full"
        >
          <GoogleIcon className="h-4 w-4" />
        </SubmitButton>
        <SubmitButton
          name="_action"
          value="github"
          variant="outline"
          size="lg"
          className="w-full"
        >
          <GithubIcon className="h-4 w-4" />
        </SubmitButton>
      </div>

      <FormError message={error} />
    </Form>
  )
}

function useAuthProviderError() {
  const searchParams = useSearchParams()
  let error = searchParams.get('error')

  switch (error) {
    case 'OAuthAccountNotLinked':
      error = 'Another account already exists with the same e-mail address.'
      break
  }

  return { error }
}
