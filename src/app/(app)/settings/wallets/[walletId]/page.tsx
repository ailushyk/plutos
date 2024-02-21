import NotFound from 'next/dist/client/components/not-found-error'
import { wallet } from '@/data/wallets'

import { getUser } from '@/lib/auth/user.server'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'
import { DeleteWalletForm } from '@/components/wallet/delete-wallet-form'
import { EditWalletForm } from '@/components/wallet/edit-wallet-form'

export const metadata = {
  title: 'Wallet Settings',
}

export default async function WalletPage({
  params,
}: {
  params: {
    walletId: string
  }
}) {
  const user = await getUser()
  const data = await wallet.get(params.walletId, user.id!)
  if (!data) {
    return NotFound()
  }

  return (
    <MainLayout>
      <TopBar backButton backButtonHref=".">
        <TopBarTitle>{data.name} Wallet</TopBarTitle>
      </TopBar>

      <Main>
        <Container className="flex h-full max-w-lg flex-col border">
          <div className="flex-1">
            <h2 className="mb-4 mt-8 text-center text-xl font-semibold">
              Update Wallet
            </h2>
            <EditWalletForm defaultValues={data} />
          </div>

          <div className="mt-12 space-y-4">
            <h2 className="mb-4 mt-8 text-center text-xl font-semibold">
              Delete Wallet
            </h2>
            <p>
              Deleting a wallet will also delete all transactions associated
              with it.
            </p>
            <DeleteWalletForm walletId={data.id} />
          </div>
        </Container>
      </Main>
    </MainLayout>
  )
}
