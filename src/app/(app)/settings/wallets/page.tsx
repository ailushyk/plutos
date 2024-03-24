import Link from 'next/link'

import { EmptyContent } from '@/components/app/empty-content'
import { WalletItem } from '@/components/app/wallet/wallet-list-item'
import { BottomPlaceholder } from '@/components/bottom-placeholder'
import { Main, MainLayout } from '@/components/layout/main-layout'
import { List, ListGroupTitle, ListItem } from '@/components/list'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'
import { Button } from '@/components/ui/button'
import { WalletService } from '@/services/wallet-service'

export const metadata = {
  title: 'Wallets Settings',
}

export default async function WalletsPage() {
  const wallets = await WalletService.all()

  return (
    <MainLayout>
      <TopBar backButton backButtonHref=".">
        <TopBarTitle>Settings Wallets</TopBarTitle>
        <Button asChild variant="outline">
          <Link href="/settings/wallets/add">Add</Link>
        </Button>
      </TopBar>

      <Main>
        <List>
          <ListGroupTitle>Active wallets</ListGroupTitle>
          {wallets.map((wallet) => (
            <Link key={wallet.id} href={`wallets/${wallet.id}`}>
              <ListItem>
                <WalletItem wallet={wallet} />
              </ListItem>
            </Link>
          ))}
        </List>

        {wallets.length === 0 && (
          <EmptyContent>
            <p>You don&apo;t have any wallets yet.</p>
            <Button asChild variant="default">
              <Link href="/wallets/add">Create Wallet</Link>
            </Button>
          </EmptyContent>
        )}
        <BottomPlaceholder />
      </Main>
    </MainLayout>
  )
}
