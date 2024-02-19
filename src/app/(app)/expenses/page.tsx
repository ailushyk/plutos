import React from 'react'
import Link from 'next/link'
import { expense } from '@/data/expense.data'

import { Button } from '@/components/ui/button'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export const metadata = {
  title: 'Expenses',
}

export default async function ExpensesPage() {
  const expenses = await expense.all()
  return (
    <MainLayout>
      <TopBar>
        <TopBarTitle>Expenses</TopBarTitle>
      </TopBar>

      <div className="flex flex-col items-center overflow-hidden">
        <Main
          className="w-full flex-1"
          wrapperClassName="fade-out-bottom w-full"
        >
          <Container>
            <h2>Expenses</h2>
            <div>
              {expenses.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>{item.title}</div>
                  <div>{String(item.amount)}</div>
                  <div>{new Date(item.dueDate).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </Container>
        </Main>
        <div className="absolute bottom-4">
          <Button asChild className="">
            <Link href="/expenses/add">New Expense</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
