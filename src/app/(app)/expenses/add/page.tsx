import { currency } from '@/data/currency'
import { wallet } from '@/data/wallets'

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
          <AddNewExpenseForm wallets={wallets} currencies={currencies} />
        </Container>
      </Main>
    </MainLayout>
  )
}
