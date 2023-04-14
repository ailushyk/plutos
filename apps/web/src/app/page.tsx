import { Card } from 'ui'
import { CARD_CONTENT } from '../constants'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pb-8 pt-16 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text px-2 text-transparent">
            Plutos Tools
          </span>
        </h1>

        <div className="mt-12 grid grid-cols-1 place-content-evenly gap-4 sm:grid-cols-2">
          {CARD_CONTENT.map((card) => (
            <Link key={card.title} href={card.href}>
              <Card {...card} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
