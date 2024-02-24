import { CardWrapper } from '@/components/app/auth/card-wrapper'
import { InvalidToken } from '@/components/app/auth/invalid-token'
import { VerifyRequestContent } from '@/components/app/auth/verify-request-content'

export default function VerifyRequest({
  searchParams,
}: {
  searchParams: {
    token: string
  }
}) {
  return (
    <CardWrapper
      headerLabel="Confirming your email address"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      {searchParams.token ? (
        <VerifyRequestContent token={searchParams.token} />
      ) : (
        <InvalidToken />
      )}
    </CardWrapper>
  )
}
