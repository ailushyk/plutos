import React from 'react'

import { MainLayout } from '@/components/layout/main-layout'
import { NavList, NavListItem } from '@/components/nav/nav-list'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export const metadata = {
  title: 'Settings',
}

export default async function SettingsPage() {
  return (
    <MainLayout>
      <TopBar backButton backButtonHref="/dashboard">
        <TopBarTitle>Settings</TopBarTitle>
      </TopBar>
      <NavList>
        <NavListItem
          title="Profile"
          description="Manage your profile and account settings."
          href="/settings/profile"
        />
        <NavListItem
          title="Security"
          description="Manage your security settings."
          href="/settings/security"
        />
        <NavListItem
          title="Billing"
          description="Manage your billing settings."
          href="/settings/billing"
        />
        <NavListItem
          title="Notifications"
          description="Manage your notification settings."
          href="/settings/notifications"
        />
        <NavListItem
          title="Wallets"
          description="Manage your wallets and their settings."
          href="/settings/wallets"
        />
      </NavList>
    </MainLayout>
  )
}
