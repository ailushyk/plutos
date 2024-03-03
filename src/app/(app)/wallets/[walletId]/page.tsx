import NotFound from 'next/dist/client/components/not-found-error'
import Link from 'next/link'
import { wallet } from '@/data/wallets'

import { getUser } from '@/lib/auth/user.server'
import { formatDate } from '@/lib/formatter/dates'
import { Button } from '@/components/ui/button'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export const generateMetadata = async ({
  params,
}: {
  params: {
    walletId: string
  }
}) => {
  const user = await getUser()
  const data = await wallet.get(params.walletId, user.id!)
  return {
    title: data ? `${data.name} Wallet` : 'Wallet not found',
  }
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
      <TopBar backButton backButtonHref="/wallets">
        <TopBarTitle>{data.name} Wallet</TopBarTitle>
        <Button variant="outline">
          <Link href={`/settings/wallets/${params.walletId}`}>edit</Link>
        </Button>
      </TopBar>

      <Main>
        <Container className="flex h-full max-w-lg flex-col">
          <div className="flex-1">
            <h2 className="mb-4 mt-8 text-center text-xl font-semibold">
              {data.name} wallet
            </h2>
            <div className="space-y-2">
              <p>
                Your balance is <strong>{data.balance}</strong>{' '}
                {data.currency.name}
              </p>
              <p>{data.type.name} type</p>
              <p>
                This wallet was created on{' '}
                <time>{formatDate(new Date(data.createdAt))}</time>.
              </p>
            </div>
          </div>
        </Container>
      </Main>
    </MainLayout>
  )
}
