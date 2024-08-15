import { NewWalletForm } from '@/components/app/wallet/new-wallet-form'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'
import { CurrencyService } from '@/modules/currency/currency-service'
import { UserWalletService } from '@/modules/wallets/user-wallet-service'
import { createWalletAction } from '@/modules/wallets/wallet-actions'

export const metadata = {
  title: 'Add New Wallet',
}

export default async function CreateNewWalletPage() {
  const currencyOptions = await CurrencyService.all()
  const typeOptions = await UserWalletService.types()

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
        <NewWalletForm
          action={createWalletAction}
          types={typeOptions}
          currencies={currencyOptions}
        />
      </main>
    </div>
  )
}
