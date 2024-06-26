import { AUTH_SIGN_IN_URL } from '@/routes'

import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { AuthHeader } from '@/components/app/auth/auth-header'
import { BackButton } from '@/components/app/auth/back-button'

export const metadata = {
  title: 'Auth Error',
}

export default function AuthErrorPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <AuthHeader>Oops! Something went wrong</AuthHeader>
      </CardHeader>
      <CardFooter className="flex flex-col gap-y-2">
        <BackButton href="/">Back to home</BackButton>
        <BackButton href={AUTH_SIGN_IN_URL}>Sign In</BackButton>
      </CardFooter>
    </Card>
  )
}
