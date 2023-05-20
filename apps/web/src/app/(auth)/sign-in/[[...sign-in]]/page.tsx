import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="grid place-content-center">
      <SignIn signUpUrl="/sign-up" />
    </div>
  )
}
