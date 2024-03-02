import { Metadata, ResolvingMetadata } from 'next'
import NotFound from 'next/dist/client/components/not-found-error'
import Link from 'next/link'
import { expense } from '@/data/expense.data'

import { getUser } from '@/lib/auth/user.server'
import { formatCurrency } from '@/lib/formatter/currency'
import { formatDate } from '@/lib/formatter/dates'
import { Button } from '@/components/ui/button'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export async function generateMetadata(
  { params }: { params: { expenseId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const user = await getUser()
  const data = await expense.getById(params.expenseId, user.id)
  return { title: data?.title }
}

export default async function ExpenseViewPage({
  params,
}: {
  params: { expenseId: string }
}) {
  const user = await getUser()
  const data = await expense.getById(params.expenseId, user.id)
  if (!data) return NotFound()

  return (
    <MainLayout>
      <TopBar backButton backButtonHref="/transactions/expenses">
        <TopBarTitle>Expense</TopBarTitle>
        <Button asChild variant="outline">
          <Link href={`/transactions/expenses/${params.expenseId}/edit`}>
            Edit
          </Link>
        </Button>
      </TopBar>
      <Main>
        <Container className="space-y-4 pt-8">
          <header className="mb-2 leading-none">
            <h2 className="">{data.title}</h2>
            <time className="text-xs text-muted-foreground">
              {formatDate(new Date(data.dueDate))}
            </time>
          </header>
          <div className="flex flex-col items-baseline gap-1">
            <div>
              {formatCurrency(data.amount, {})} {data.currency.symbol}
            </div>
            <div className="text-sm text-muted-foreground">
              from {data.wallet.name} wallet
            </div>
          </div>
          {data.note ? (
            <div>
              <h3 className="text-sm text-muted-foreground">Note:</h3>
              <p>{data.note}</p>
            </div>
          ) : null}
        </Container>
      </Main>
    </MainLayout>
  )
}
