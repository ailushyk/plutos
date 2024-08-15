import React, { Suspense } from 'react'

import { NavDivider, NavItem, NavItemIcon } from '@/components/sidebar-nav'
import { UserWalletService } from '@/modules/wallets/user-wallet-service'

export const SidebarWallets = async () => {
  const wallets = await UserWalletService.all()

  if (wallets.length === 0) {
    return (
      <NavItem href="/settings/wallets/add">
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
