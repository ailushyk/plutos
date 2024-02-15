import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BottomPlaceholder } from '@/components/bottom-placeholder'
import {
  NavDivider,
  NavGroup,
  NavItem,
  NavItemIcon,
  NavLabel,
} from '@/components/nav'
import { SpacesAccordion } from '@/components/spaces-accordion'
import { UserMenu } from '@/components/user-menu'
import logoImage from '@/assets/logo.svg'

const data = {
  accounts: [
    {
      id: 'd5c40162-129d-4e8e-b990-e42eaf82223b',
      title: 'Personal',
      slug: 'personal',
    },
    {
      id: 'd5c40162-129d-4e8e-b990-e42eaf82223c',
      title: 'Subscriptions',
      slug: 'subscriptions',
    },
    {
      id: 'd5c40162-129d-4e8e-b990-e42eaf82223d',
      title: 'Business',
      slug: 'business',
    },
  ],
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full bg-red-900">
      <div className="text-sm">
        <div className="w-60" />

        <div className="fixed inset-y-0 left-0 z-10 w-60 bg-background">
          <nav className="flex h-full flex-col border-r">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-1">
                <Link
                  href="/"
                  className="flex items-center text-xl font-semibold text-muted-foreground"
                  aria-label="Plutos logo, navigate to home"
                >
                  <Image
                    src={logoImage}
                    width={32}
                    height={32}
                    alt="Comcert Logo"
                    className="h-8 w-8"
                  />
                  lutos
                </Link>
              </div>
              <UserMenu />
            </div>

            <ScrollArea>
              <NavGroup className="px-3">
                <NavItem href="/inbox">
                  <NavItemIcon name="inbox" />
                  Inbox
                </NavItem>
                <NavItem href="/focus">
                  <NavItemIcon name="focus" />
                  Focus
                </NavItem>
                <NavDivider />

                <NavLabel>Favorite</NavLabel>
                <NavItem href="/accounts/personal-account">
                  <NavItemIcon name="layers" />
                  Main Expenses
                </NavItem>
                <NavItem href="/accounts/personal-account">
                  <NavItemIcon name="cti" />
                  Cash Flow
                </NavItem>
                <NavItem href="/lib">
                  <NavItemIcon name="lib" />
                  Lib
                </NavItem>
                <NavDivider />

                <SpacesAccordion>
                  <NavGroup>
                    <NavLabel>Accounts</NavLabel>
                    {data.accounts.map((account: any) => (
                      <AccordionItem
                        key={account.id}
                        value={account.id}
                        asChild
                      >
                        <NavGroup>
                          <AccordionTrigger className="group flex cursor-default items-center gap-2 rounded-md px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:no-underline">
                            <div className="flex items-center gap-1">
                              <NavItemIcon name="space" />
                              {account.title}
                            </div>
                          </AccordionTrigger>

                          <AccordionContent>
                            <NavGroup nested="md">
                              <NavItem
                                href={`/accounts/${account.slug}/incomes`}
                              >
                                <NavItemIcon
                                  name="tree"
                                  className="rotate-90"
                                />
                                Incomes
                              </NavItem>
                              <NavItem
                                href={`/accounts/${account.slug}/transactions`}
                              >
                                <NavItemIcon
                                  name="tree"
                                  className="rotate-90"
                                />
                                Transactions
                              </NavItem>
                              <NavItem
                                href={`/accounts/${account.slug}/expenses`}
                              >
                                <NavItemIcon
                                  name="tree"
                                  className="rotate-90"
                                />
                                Expenses
                              </NavItem>
                              <NavItem
                                href={`/accounts/${account.slug}/subscriptions`}
                              >
                                <NavItemIcon
                                  name="tree"
                                  className="rotate-90"
                                />
                                Subscriptions
                              </NavItem>
                              <NavGroup variant="border" nested="md">
                                <NavItem
                                  href={`/account/${account.slug}/subscriptions/active`}
                                >
                                  actives
                                </NavItem>
                                <NavItem
                                  href={`/accounts/${account.slug}/subscriptions/new`}
                                >
                                  new
                                </NavItem>
                                <NavItem
                                  href={`/accounts/${account.slug}/subscriptions/removed`}
                                >
                                  removed
                                </NavItem>
                              </NavGroup>

                              <NavItem
                                href={`/accounts/${account.slug}/planning-and-analysis`}
                              >
                                <NavItemIcon name="cti" />
                                Planning & Analysis
                              </NavItem>
                              <NavGroup
                                variant="border"
                                nested="md"
                                className="visible"
                              >
                                <NavItem
                                  href={`/accounts/${account.slug}/planning-and-analysis/budgeting-tools`}
                                >
                                  budgeting tools
                                </NavItem>
                                <NavItem
                                  href={`/accounts/${account.slug}/planning-and-analysis/expense-tracking`}
                                >
                                  expense tracking
                                </NavItem>
                                <NavItem
                                  href={`/accounts/${account.slug}/planning-and-analysis/investment-analysis`}
                                >
                                  investment analysis
                                </NavItem>
                                <NavItem
                                  href={`/accounts/${account.slug}/planning-and-analysis/financial-reporting`}
                                >
                                  financial reporting
                                </NavItem>
                              </NavGroup>
                              <NavItem href={`/accounts/${account.slug}/views`}>
                                <NavItemIcon name="app-view" />
                                Views
                              </NavItem>
                            </NavGroup>
                          </AccordionContent>
                        </NavGroup>
                      </AccordionItem>
                    ))}
                  </NavGroup>
                </SpacesAccordion>
              </NavGroup>

              <BottomPlaceholder />
            </ScrollArea>
          </nav>
        </div>
      </div>
      <main className="flex-1 bg-sky-900">{children}</main>
    </div>
  )
}
