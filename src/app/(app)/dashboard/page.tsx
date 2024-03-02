import React from 'react'

import { MainMobileNav } from '@/components/app/main-mobile-nav'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export const metadata = {
  title: 'Dashboard',
}

async function DashboardPage() {
  return (
    <MainLayout>
      <TopBar>
        <TopBarTitle>Dashboard Page</TopBarTitle>
      </TopBar>
      <Main>
        <Container className="pt-8">
          <dl className="grid gap-4 text-sm md:grid-cols-[auto,1fr]">
            <dt>Account Balances</dt>
            <dd>
              Display the current balances of your bank accounts, credit cards,
              investment accounts, and any other financial accounts you may
              have.
            </dd>

            <dt>Budget Overview</dt>
            <dd>
              Show a summary of your budget for various categories such as
              groceries, utilities, entertainment, etc. Include both the planned
              budget and actual spending to track your progress.
            </dd>

            <dt>Expense Tracker</dt>
            <dd>
              Provide a breakdown of your recent expenses by category or by
              individual transactions. This can help you identify where your
              money is going and where you might need to cut back.
            </dd>

            <dt>Income Overview</dt>
            <dd>
              Display your sources of income, including salary, freelance
              earnings, investment dividends, etc. This can help you understand
              your cash flow and plan for future expenses.
            </dd>

            <dt>Financial Goals</dt>
            <dd>
              Show progress towards your financial goals, such as saving for a
              vacation, paying off debt, or building an emergency fund. Include
              both short-term and long-term goals.
            </dd>

            <dt>Net Worth</dt>
            <dd>
              Display your net worth over time, including assets like savings,
              investments, and property, minus liabilities such as loans and
              credit card debt.
            </dd>

            <dt>
              Upcoming Bills
              <br />
              and Payments
            </dt>
            <dd>
              Provide a list of upcoming bills and payments, including due dates
              and amounts. This can help you avoid missed payments and late
              fees.
            </dd>

            <dt>Financial Insights</dt>
            <dd>
              Offer personalized insights or recommendations based on your
              spending habits and financial goals. For example, suggest ways to
              save money or invest more effectively.
            </dd>

            <dt>Credit Score</dt>
            <dd>
              If possible, integrate your credit score into the dashboard so you
              can track your credit health over time.
            </dd>

            <dt>Customizable Widgets</dt>
            <dd>
              Allow users to customize their dashboard with widgets that are
              most relevant to their financial situation and goals.
            </dd>

            <dt>Security Features</dt>
            <dd>
              Ensure the app is secure by implementing authentication measures
              like biometric login or two-factor authentication to protect
              sensitive financial information.
            </dd>

            <dt>Transaction Categorization</dt>
            <dd>
              Automatically categorize transactions and provide the ability for
              users to manually categorize transactions to better understand
              their spending habits.
            </dd>

            <dt>Investment Performance</dt>
            <dd>
              If you have investment accounts linked to the app, display the
              performance of your investments over time and compare it to
              relevant benchmarks.
            </dd>

            <dt>Expense Trends</dt>
            <dd>
              Show graphical representations of your expense trends over time,
              allowing you to visualize where you&apos;re spending more or less.
            </dd>
          </dl>
        </Container>
      </Main>
      <MainMobileNav />
    </MainLayout>
  )
}

export default DashboardPage
