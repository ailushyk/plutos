import React from 'react'
import Link from 'next/link'
import { Decimal } from '@prisma/client/runtime/binary'

import { getUser } from '@/lib/auth/user.server'
import { formatCurrency } from '@/lib/formatter/currency'
import { formatDate } from '@/lib/formatter/dates'
import { EmptyContent } from '@/components/app/empty-content'
import { ExpenseItem } from '@/components/app/expenses/expense-item'
import { Main, MainLayout } from '@/components/layout/main-layout'
import { List, ListGroup, ListGroupTitle, ListItem } from '@/components/list'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'
import { Button } from '@/components/ui/button'
import { expense } from '@/data/expense.data'

export const metadata = {
  title: 'Expenses',
}

export default async function ExpensesPage() {
  const user = await getUser()
  const expenses = await expense.lastMonth({
    userId: user.id,
  })
  let prevDate = ''
  const groupedExpensesByDay = expenses.reduce<
    {
      date: string
      items: {
        id: string
        title: string
        amount: Decimal
        dueDate: Date
        currency: {
          name: string
          symbol: string
        }
        wallet: {
          name: string
        }
      }[]
    }[]
  >((acc, item) => {
    const date = item.dueDate.toLocaleDateString()
    const newGroup = date !== prevDate
    if (newGroup) {
      prevDate = date
      acc.push({ date: date, items: [] })
    }
    acc[acc.length - 1].items?.push(item)
    return acc
  }, [])

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
            {groupedExpensesByDay.map((group) => {
              return (
                <React.Fragment key={group.date}>
                  <ListGroupTitle>
                    {formatDate(new Date(group.date))}
                  </ListGroupTitle>
                  <ListGroup>
                    {group.items?.map((item) => {
                      return (
                        <ListItem key={item.id} asChild>
                          <Link href={`/transactions/expenses/${item.id}`}>
                            <ExpenseItem expense={item} />
                          </Link>
                        </ListItem>
                      )
                    })}
                  </ListGroup>
                </React.Fragment>
              )
            })}
          </List>

          {expenses.length === 0 ? (
            <EmptyContent>
              You don&apos;t have any expenses yet.
              <br />
              Add a new expense to get started!
            </EmptyContent>
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
