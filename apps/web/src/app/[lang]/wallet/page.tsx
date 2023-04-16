import React from 'react'
import { List, Section, Widget } from 'ui'
import { HomeIcon, TagIcon, UserIcon } from '@heroicons/react/24/solid'
import {
  HomeIcon as HomeIconOutline,
  UserIcon as UserIconOutline,
} from '@heroicons/react/24/outline'
import { formatMoney } from '@/utils/money'
import { Locale } from '@/i18n-config'
import Link from 'next/link'

function WalletPage({ params }: { params: { lang: Locale } }) {
  let [integer, decimal] = formatMoney(45599)

  return (
    <main className="flex min-h-screen flex-col items-center gap-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-5 gap-4">
          <div>
            <Link
              href={`/${params.lang}`}
              className="group relative flex h-11 w-11 items-center justify-center"
            >
              <HomeIconOutline className="absolute h-6 w-6 text-white opacity-40 transition group-hover:opacity-0" />
              <HomeIcon className="absolute h-5 w-5 opacity-0 transition group-hover:opacity-100" />
            </Link>
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <h1 className="text-lg font-extrabold text-white/80 sm:text-2xl lg:text-3xl xl:text-4xl">
              Wallet
            </h1>
          </div>
          <div className="flex justify-end">
            <Link
              href={`/${params.lang}/profile`}
              className="group relative flex h-11 w-11 items-center justify-center"
            >
              <UserIconOutline className="absolute h-6 w-6 text-white opacity-40 transition group-hover:opacity-0" />
              <UserIcon className="absolute h-5 w-5 opacity-0 transition group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-6">
          <Widget
            label="Current balance"
            integer={integer}
            decimal={decimal}
            currency="PLN"
          />

          <Section>
            <div className="text-white/60">Transactions</div>
            <List>
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={`index-${i}`} className="">
                  <div className="flex justify-between gap-4 py-3">
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-zinc-800 p-1">
                        <TagIcon className="h-5 w-5 text-amber-300" />
                      </div>
                      <div>
                        <div>Food</div>
                        <div className="text-xs text-white/60">Today 12:41</div>
                      </div>
                    </div>
                    <div>
                      {integer}
                      <sup>{decimal}</sup> PLN
                    </div>
                  </div>
                </div>
              ))}
            </List>
          </Section>
        </div>
      </div>
    </main>
  )
}

export default WalletPage
