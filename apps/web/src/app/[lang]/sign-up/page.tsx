import { SignUp } from '@clerk/nextjs/app-beta'

export default function Page() {
  return (
    <div className="grid place-content-center">
      <SignUp signInUrl="/sign-in" />
    </div>
  )
}
