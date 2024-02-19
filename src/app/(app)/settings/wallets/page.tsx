import Link from 'next/link'
import { wallet } from '@/data/wallets'

import { getUser } from '@/lib/auth/user.server'
import { Button } from '@/components/ui/button'
import { BottomPlaceholder } from '@/components/bottom-placeholder'
import { Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'
import { WalletItem } from '@/components/wallet/wallet-list-item'

export default async function WalletsPage() {
  const user = await getUser()
  const data = await wallet.all(user.id!)
  return (
    <MainLayout>
      <TopBar backButton backButtonHref=".">
        <TopBarTitle>Wallets</TopBarTitle>
        <Button asChild variant="outline">
          <Link href="wallets/create">Add</Link>
        </Button>
      </TopBar>

      <Main>
        <h2 className="sticky top-0 z-10 flex h-11 items-center gap-3 border-b bg-accent px-6 py-2 text-sm font-semibold dark:bg-gray-900">
          Active wallets
        </h2>
        <div className="space-y-2">
          {data.map((wallet) => (
            <Link
              key={wallet.id}
              href={`wallets/${wallet.id}`}
              className="block bg-background px-6 py-2 transition hover:bg-accent"
            >
              <WalletItem wallet={wallet} />
            </Link>
          ))}
        </div>
        <BottomPlaceholder />
      </Main>
    </MainLayout>
  )
}
