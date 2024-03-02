import React from 'react'
import Link from 'next/link'
import { expense } from '@/data/expense.data'

import { getUser } from '@/lib/auth/user.server'
import { formatCurrency } from '@/lib/formatter/currency'
import { Button } from '@/components/ui/button'
import { EmptyList } from '@/components/app/empty-list'
import { ExpenseItem } from '@/components/app/expenses/expense-item'
import { Main, MainLayout } from '@/components/layout/main-layout'
import { List, ListGroup, ListItem } from '@/components/list'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export const metadata = {
  title: 'Expenses',
}

export default async function ExpensesPage() {
  const user = await getUser()
  const expenses = await expense.lastMonth({
    userId: user.id,
  })
  const total = expenses.reduce((acc, item) => acc - Number(item.amount), 0)

  return (
    <MainLayout>
      <TopBar backButton backButtonHref="/transactions">
        <TopBarTitle>Expenses</TopBarTitle>
      </TopBar>

      <div className="flex flex-col items-center overflow-hidden">
        <Main
          className="w-full flex-1"
          wrapperClassName="fade-out-bottom w-full"
        >
          <List>
            <ListGroup className="flex justify-between">
              <div>All Wallets</div>
              <div>{formatCurrency(total)} PLN</div>
            </ListGroup>
            {expenses.map((item) => (
              <Link key={item.id} href={`/transactions/expenses/${item.id}`}>
                <ListItem>
                  <ExpenseItem expense={item} />
                </ListItem>
              </Link>
            ))}
          </List>

          {expenses.length === 0 ? (
            <EmptyList>
              You don&apos;t have any expenses yet.
              <br />
              Add a new expense to get started!
            </EmptyList>
          ) : null}
        </Main>
        <div className="absolute bottom-4">
          <Button asChild className="">
            <Link href="expenses/add">New Expense</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
