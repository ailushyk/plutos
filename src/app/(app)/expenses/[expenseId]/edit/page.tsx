import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { currency } from '@/data/currency'
import { expense } from '@/data/expense.data'
import { wallet } from '@/data/wallets'
import { ExpenseSchema, ExpenseSchemaForm } from '@/schemas/expenses.schema'

import { getUser } from '@/lib/auth/user.server'
import { Button } from '@/components/ui/button'
import { ExpenseForm } from '@/components/app/expenses/expense-form'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export async function generateMetadata(
  { params }: { params: { expenseId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const user = await getUser()
  const data = await expense.getById(params.expenseId, user.id)
  return { title: `Edit expense: ${data?.title}` }
}

export default async function EditExpense({
  params,
}: {
  params: { expenseId: string }
}) {
  const user = await getUser()
  const [data, wallets, currencies] = await Promise.all([
    expense.getById(params.expenseId, user.id),
    wallet.all(),
    currency.all(),
  ])
  if (!data) return notFound()

  const initValues = ExpenseSchemaForm.parse({
    ...data,
    amount: Number(data.amount),
    note: data.note || '',
    walletId: data.wallet.id,
    currencyId: data.currency.id,
    dueDate: data.dueDate.toString(),
  })

  return (
    <MainLayout>
      <TopBar backButton backButtonHref="/expenses">
        <TopBarTitle>Edit Expense</TopBarTitle>
      </TopBar>
      <Main>
        <Container className="pt-8">
          <ExpenseForm
            initValues={initValues}
            wallets={wallets}
            currencies={currencies}
          />
        </Container>
      </Main>
    </MainLayout>
  )
}
