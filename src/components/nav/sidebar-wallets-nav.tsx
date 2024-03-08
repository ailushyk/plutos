import React, { Suspense } from 'react'

import { NavDivider, NavItem, NavItemIcon } from '@/components/sidebar-nav'
import { WalletService } from '@/services/wallet-service'

export const SidebarWalletsNav = async () => {
  const wallets = await WalletService.all()

  if (wallets.length === 0) {
    return (
      <NavItem href="/wallets/new">
        <NavItemIcon name="plus" />
        Create a wallet
      </NavItem>
    )
  }

  return (
    <Suspense fallback={<div>loading 2</div>}>
      {wallets.map((wallet) => (
        <NavItem key={wallet.id} href={`/wallets/${wallet.id}`}>
          <NavItemIcon name="space" />
          {wallet.name}
        </NavItem>
      ))}
      <NavDivider />
    </Suspense>
  )
}
