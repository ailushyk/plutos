import { InvalidToken } from '@/components/app/auth/invalid-token'
import { SignWrapper } from '@/components/app/auth/sign-wrapper'
import { VerifyRequestContent } from '@/components/app/auth/verify-request-content'

export default function VerifyRequest({
  searchParams,
}: {
  searchParams: {
    token: string
  }
}) {
  return (
    <SignWrapper
      headerLabel="Confirming your email address"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      {searchParams.token ? (
        <VerifyRequestContent token={searchParams.token} />
      ) : (
        <InvalidToken />
      )}
    </SignWrapper>
  )
}
