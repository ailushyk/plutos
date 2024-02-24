import { NewWalletForm } from '@/components/app/wallet/new-wallet-form'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export const metadata = {
  title: 'Create New Wallet',
}

export default function CreateNewWalletPate() {
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
        <p>You can also create a wallet for each of your assets.</p>
        <NewWalletForm />
      </main>
    </div>
  )
}
