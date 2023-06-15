import { SignIn } from '@clerk/nextjs'

export const runtime = 'nodejs'

export default function Page({ params }: { params: { lang: string } }) {
  return (
    <div className="grid place-content-center">
      <SignIn signUpUrl={`/${params.lang}/sign-up`} />
    </div>
  )
}
