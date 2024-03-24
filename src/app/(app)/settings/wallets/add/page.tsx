import { NewWalletForm } from '@/components/app/wallet/new-wallet-form'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'
import { CurrencyService } from '@/services/currency-service'
import { WalletService } from '@/services/wallet-service'

export const metadata = {
  title: 'Create New Wallet',
}

export default async function CreateNewWalletPate() {
  const currencyOptions = await CurrencyService.all()
  const typeOptions = await WalletService.types()

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
