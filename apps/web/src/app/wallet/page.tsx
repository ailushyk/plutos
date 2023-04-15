import React from 'react'
import { List, Section, Widget } from 'ui'
import { formatMoney } from '../../utils/money'
import { TagIcon } from '@heroicons/react/24/solid'

function WalletPage() {
  let [integer, decimal] = formatMoney(45599)

  return (
    <main className="flex min-h-screen flex-col items-center gap-8">
      <h1 className="mx-auto pt-8 text-center text-lg font-extrabold tracking-tight text-white/80 sm:text-2xl lg:text-3xl xl:text-4xl">
        Wallet
      </h1>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-6">
          <Widget
            label="Wallet"
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
