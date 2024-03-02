import React from 'react'

import { BudgetMenuIcon } from '@/components/icons/budget-menu-icon'
import { HomeMenuIcon } from '@/components/icons/home-menu-icon'
import { SettingsMenuIcon } from '@/components/icons/settings-menu-icon'
import { TransactionsMenuIcon } from '@/components/icons/transactions-menu-icon'
import { WalletsMenuIcon } from '@/components/icons/wallets-menu-icon'
import { MobileMenu, MobileMenuItem } from '@/components/nav/mobile-nav'

export const MainMobileNav = () => {
  return (
    <MobileMenu>
      <MobileMenuItem href="/dashboard">
        <HomeMenuIcon />
      </MobileMenuItem>
      <MobileMenuItem href="/budget">
        <BudgetMenuIcon />
      </MobileMenuItem>
      <MobileMenuItem href="/transactions">
        <TransactionsMenuIcon />
      </MobileMenuItem>
      <MobileMenuItem href="/wallets">
        <WalletsMenuIcon />
      </MobileMenuItem>
      <MobileMenuItem href="/settings">
        <SettingsMenuIcon />
      </MobileMenuItem>
    </MobileMenu>
  )
}
