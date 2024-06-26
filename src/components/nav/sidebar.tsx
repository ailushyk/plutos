import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import logoImage from '@/assets/logo.svg'
import { BottomPlaceholder } from '@/components/bottom-placeholder'
import { SpinnerIcon } from '@/components/icons/spinner-icon'
import {
  NavDivider,
  NavGroup,
  NavItem,
  NavItemIcon,
  NavLabel,
} from '@/components/sidebar-nav'
import { SpacesAccordion } from '@/components/spaces-accordion'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'

import { SidebarWalletsNav } from './sidebar-wallets-nav'

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

const FF_WALLETS = false

export const Sidebar = () => {
  return (
    <div className="text-sm">
      <div className="hidden w-60 md:block" />

      <div className="fixed inset-y-0 left-0 z-10 hidden w-60 bg-background md:block">
        <nav className="flex h-full flex-col border-r">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-1">
              <Link
                href="/dashboard"
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
              <NavItem href="/transactions">
                <NavItemIcon name="layers" />
                Transactions
              </NavItem>
              <NavItem href="/budget">
                <NavItemIcon name="cti" />
                Budget
              </NavItem>
              <NavItem href="/settings">
                <NavItemIcon name="settings" />
                Settings
              </NavItem>
              <NavDivider />

              <NavLabel>Wallets</NavLabel>
              <Suspense
                fallback={
                  <div className="absolute animate-spin px-2 duration-1000">
                    <SpinnerIcon />
                  </div>
                }
              >
                <SidebarWalletsNav />
              </Suspense>

              {FF_WALLETS && (
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
                                href={`/wallets/${account.slug}/incomes`}
                              >
                                <NavItemIcon
                                  name="tree"
                                  className="rotate-90"
                                />
                                Incomes
                              </NavItem>
                              <NavItem
                                href={`/wallets/${account.slug}/transactions`}
                              >
                                <NavItemIcon
                                  name="tree"
                                  className="rotate-90"
                                />
                                Transactions
                              </NavItem>
                              <NavItem
                                href={`/wallets/${account.slug}/expenses`}
                              >
                                <NavItemIcon
                                  name="tree"
                                  className="rotate-90"
                                />
                                Expenses
                              </NavItem>
                              <NavItem
                                href={`/wallets/${account.slug}/subscriptions`}
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
                                  href={`/wallets/${account.slug}/subscriptions/new`}
                                >
                                  new
                                </NavItem>
                                <NavItem
                                  href={`/wallets/${account.slug}/subscriptions/removed`}
                                >
                                  removed
                                </NavItem>
                              </NavGroup>

                              <NavItem
                                href={`/wallets/${account.slug}/planning-and-analysis`}
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
                                  href={`/wallets/${account.slug}/planning-and-analysis/budgeting-tools`}
                                >
                                  budgeting tools
                                </NavItem>
                                <NavItem
                                  href={`/wallets/${account.slug}/planning-and-analysis/expense-tracking`}
                                >
                                  expense tracking
                                </NavItem>
                                <NavItem
                                  href={`/wallets/${account.slug}/planning-and-analysis/investment-analysis`}
                                >
                                  investment analysis
                                </NavItem>
                                <NavItem
                                  href={`/wallets/${account.slug}/planning-and-analysis/financial-reporting`}
                                >
                                  financial reporting
                                </NavItem>
                              </NavGroup>
                              <NavItem href={`/wallets/${account.slug}/views`}>
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
              )}
            </NavGroup>

            <BottomPlaceholder />
          </ScrollArea>
        </nav>
      </div>
    </div>
  )
}
