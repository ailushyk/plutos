import React from 'react'

import { MainMobileNav } from '@/components/app/main-mobile-nav'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { SettingsList, SettingsListItem } from '@/components/nav/settings-list'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'
import { UserMenu } from '@/components/user-menu'

export const metadata = {
  title: 'Settings',
}

const links = [
  {
    title: 'Wallets',
    description: 'Manage your wallets and their settings.',
    href: '/settings/wallets',
  },
  // {
  //   title: 'Profile',
  //   description: 'Manage your profile and account settings.',
  //   href: '/settings/profile',
  // },
  // {
  //   title: 'Security',
  //   description: 'Manage your security settings.',
  //   href: '/settings/security',
  // },
  // {
  //   title: 'Billing',
  //   description: 'Manage your billing settings.',
  //   href: '/settings/billing',
  // },
  // {
  //   title: 'Notifications',
  //   description: 'Manage your notification settings.',
  //   href: '/settings/notifications',
  // },
]

export default async function SettingsPage() {
  return (
    <MainLayout>
      <TopBar>
        <TopBarTitle>Settings</TopBarTitle>
        <UserMenu />
      </TopBar>
      <Main>
        <Container className="pt-8">
          <SettingsList>
            {links.map((item) => (
              <SettingsListItem
                key={item.title}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            ))}
          </SettingsList>
        </Container>
      </Main>
      <MainMobileNav />
    </MainLayout>
  )
}
