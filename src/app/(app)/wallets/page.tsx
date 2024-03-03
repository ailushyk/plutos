import Link from 'next/link'
import { wallet } from '@/data/wallets'

import { getUser } from '@/lib/auth/user.server'
import { Button } from '@/components/ui/button'
import { EmptyList } from '@/components/app/empty-list'
import { MainMobileNav } from '@/components/app/main-mobile-nav'
import { WalletItem } from '@/components/app/wallet/wallet-list-item'
import { BottomPlaceholder } from '@/components/bottom-placeholder'
import { Main, MainLayout } from '@/components/layout/main-layout'
import { List, ListGroup, ListItem } from '@/components/list'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export const metadata = {
  title: 'Wallets',
}

export default async function WalletsPage() {
  const user = await getUser()
  const wallets = await wallet.allByUser(user.id!)
  return (
    <MainLayout>
      <TopBar>
        <TopBarTitle>Wallets</TopBarTitle>
        <Button asChild variant="outline">
          <Link href="/settings/wallets/add">Add</Link>
        </Button>
      </TopBar>

      <Main>
        <List>
          <ListGroup>Active wallets</ListGroup>
          {wallets.map((wallet) => (
            <Link key={wallet.id} href={`wallets/${wallet.id}`}>
              <ListItem>
                <WalletItem wallet={wallet} />
              </ListItem>
            </Link>
          ))}
        </List>

        {wallets.length === 0 && (
          <EmptyList>
            <p>You don&apos;t have any wallets yet.</p>
            <Button asChild variant="default">
              <Link href="/wallets/add">Create Wallet</Link>
            </Button>
          </EmptyList>
        )}
        <BottomPlaceholder />
      </Main>
      <MainMobileNav />
    </MainLayout>
  )
}
