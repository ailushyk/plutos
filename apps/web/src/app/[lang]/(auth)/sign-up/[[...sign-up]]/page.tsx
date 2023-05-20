import { SignUp } from '@clerk/nextjs'

export default function Page({ params }: { params: { lang: string } }) {
  return (
    <div className="grid place-content-center">
      <SignUp signInUrl={`/${params.lang}/sign-in`} />
    </div>
  )
}
