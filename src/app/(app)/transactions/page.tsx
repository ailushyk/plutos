import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { MainMobileNav } from '@/components/app/main-mobile-nav'
import { ExpensesIcon } from '@/components/icons/expenses-icon'
import { IncomeIcon } from '@/components/icons/income-icon'
import { TransactionsMenuIcon } from '@/components/icons/transactions-menu-icon'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { MobileMenu, MobileMenuItem } from '@/components/nav/mobile-nav'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export default async function Page() {
  return (
    <MainLayout>
      <TopBar>
        <TopBarTitle>Transactions</TopBarTitle>
      </TopBar>

      <Main>
        <Container className="grid grid-cols-2 gap-4 pt-8">
          <Link
            href="/transactions/expenses"
            className="flex h-12 items-center justify-center gap-1 rounded-md border"
          >
            <ExpensesIcon /> Expenses
          </Link>
          <Link
            href="/transactions/income"
            className="flex h-12 items-center justify-center gap-1 rounded-md border"
          >
            <IncomeIcon />
            Income
          </Link>
        </Container>
      </Main>

      <MainMobileNav />
    </MainLayout>
  )
}
