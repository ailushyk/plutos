import React from 'react'

import { MainMobileNav } from '@/components/app/main-mobile-nav'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { NavList, NavListItem } from '@/components/nav/nav-list'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'
import { UserMenu } from '@/components/user-menu'

export const metadata = {
  title: 'Settings',
}

export default async function SettingsPage() {
  return (
    <MainLayout>
      <TopBar>
        <TopBarTitle>Settings</TopBarTitle>
        <UserMenu />
      </TopBar>
      <Main>
        <Container className="pt-8">
          <NavList>
            <NavListItem
              title="Wallets"
              description="Manage your wallets and their settings."
              href="/settings/wallets"
            />
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
          </NavList>
        </Container>
      </Main>
      <MainMobileNav />
    </MainLayout>
  )
}
