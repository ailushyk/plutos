import Link from 'next/link'
import { currency } from '@/data/currency'
import { wallet } from '@/data/wallets'

import { Button } from '@/components/ui/button'
import { AddNewExpenseForm } from '@/components/app/expenses/add-new-expense-form'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export default async function AddNewExpense() {
  const [wallets, currencies] = await Promise.all([
    wallet.all(),
    currency.all(),
  ])
  return (
    <MainLayout>
      <TopBar backButton backButtonHref="/expenses">
        <TopBarTitle>New Expense</TopBarTitle>
      </TopBar>
      <Main>
        <Container className="pt-8">
          {wallets.length > 0 ? (
            <AddNewExpenseForm wallets={wallets} currencies={currencies} />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p>You need to create a wallet first</p>
              <Button asChild>
                <Link href="/settings/wallets/add">Add Wallet</Link>
              </Button>
            </div>
          )}
        </Container>
      </Main>
    </MainLayout>
  )
}
