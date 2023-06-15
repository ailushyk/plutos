import { Button, GradientText } from 'ui'
import Link from 'next/link'
import { Locale } from '@/i18n'

export default function OnboardingPage({
  params,
}: {
  params: { lang: Locale }
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="mx-auto w-auto px-4 pb-16 lg:px-8">
        <div className="-ml-2 text-xl">Welcome to</div>
        <div className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          <GradientText>Plutos App</GradientText>
        </div>
        <div className="mx-auto mt-8 max-w-xl sm:flex sm:justify-center md:mt-16">
          <Link href={`/${params.lang}/dashboard`}>
            <Button>Start</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
