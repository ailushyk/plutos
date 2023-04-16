import Link from 'next/link'
import { Locale } from '@/i18n-config'
import { getTranslation } from '@/utils/getTranslation'
import { CARD_CONTENT } from '@/constants'
import { Card } from 'ui'

export default async function Home({ params }: { params: { lang: Locale } }) {
  const t = await getTranslation(params.lang)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pb-8 pt-16 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text px-2 text-transparent">
            {t.title}
          </span>
        </h1>

        <div className="mt-12 grid grid-cols-1 place-content-evenly gap-4 sm:grid-cols-2">
          {CARD_CONTENT.map((card) => (
            <Link key={card.title} href={`/${params.lang}/${card.href}`}>
              <Card {...card} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
