import { Button, Card } from 'ui'
import Link from 'next/link'
import { ONBOARDING_CARD_CONTENT } from '@/constants'

export default function OnboardingPage({
  params,
}: {
  params: { lang: Locale }
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pb-8 pt-16 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text px-2 text-transparent">
            Plutos App
          </span>
        </h1>
        <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8">
          <Link href={`/${params.lang}`}>
            <Button>Start</Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 place-content-evenly gap-4 sm:grid-cols-3">
          {ONBOARDING_CARD_CONTENT.map((card) => (
            <Link key={card.title} href={card.href}>
              <Card {...card} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
