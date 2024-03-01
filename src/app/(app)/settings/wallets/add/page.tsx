import { currency } from '@/data/currency'
import { wallet } from '@/data/wallets'

import { NewWalletForm } from '@/components/app/wallet/new-wallet-form'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export const metadata = {
  title: 'Create New Wallet',
}

export default async function CreateNewWalletPate() {
  const currencyOptions = await currency.all()
  const typeOptions = await wallet.types()

  return (
    <div>
      <TopBar backButton>
        <TopBarTitle>New Wallet</TopBarTitle>
      </TopBar>

      <main className="space-y-4 p-6">
        <p>
          You can create wallets for different purposes. For example, you can
          create a wallet for your personal assets and another wallet for your
          business assets.
        </p>
        <NewWalletForm types={typeOptions} currencies={currencyOptions} />
      </main>
    </div>
  )
}
