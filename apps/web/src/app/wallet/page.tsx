import React from 'react'
import { Widget } from 'ui'
import { formatMoney } from '../../utils/money'

function WalletPage() {
  let [integer, decimal] = formatMoney(45599)

  return (
    <main className="flex min-h-screen flex-col items-center gap-8">
      <h1 className="mx-auto pt-8 text-center text-lg font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl xl:text-4xl">
        <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text px-2 text-transparent">
          Wallet
        </span>
      </h1>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-6">
          <Widget
            label="Wallet"
            integer={integer}
            decimal={decimal}
            currency="PLN"
          />

          {/*{Array.from({ length: 5 }).map((_, i) => (*/}
          {/*  <Widget key={`index-${i}`} />*/}
          {/*))}*/}
        </div>
      </div>
    </main>
  )
}

export default WalletPage
