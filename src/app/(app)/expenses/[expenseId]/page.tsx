import NotFound from 'next/dist/client/components/not-found-error'
import { expense } from '@/data/expense.data'

import { getUser } from '@/lib/auth/user.server'
import { formatCurrencyFromDecimal } from '@/lib/formatter/currency'
import { formatDate } from '@/lib/formatter/dates'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export default async function ExpenseViewPage({
  params,
}: {
  params: { expenseId: string }
}) {
  const user = await getUser()
  const data = await expense.getById({
    id: params.expenseId,
    userId: user.id,
  })
  if (!data) return NotFound()

  return (
    <MainLayout>
      <TopBar backButton backButtonHref="/expenses">
        <TopBarTitle>Expense</TopBarTitle>
      </TopBar>
      <Main>
        <Container className="space-y-4 pt-8">
          <header className="mb-2 leading-none">
            <h2 className="">{data.title}</h2>
            <time className="text-xs text-muted-foreground">
              {formatDate(new Date(data.dueDate))}
            </time>
          </header>
          <div className="flex items-baseline gap-1">
            <div>
              {formatCurrencyFromDecimal(data.amount, data.currency.name)}
            </div>
            <div>{data.currency.symbol}</div>
            <div className="text-sm text-muted-foreground">
              {data.wallet.name} wallet
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{data.note}</p>
        </Container>
      </Main>
    </MainLayout>
  )
}
