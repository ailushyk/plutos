import { MainMobileNav } from '@/components/app/main-mobile-nav'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export const metadata = {
  title: 'Budget',
}
export default async function Page() {
  return (
    <MainLayout>
      <TopBar>
        <TopBarTitle>Budget</TopBarTitle>
      </TopBar>
      <Main>
        <Container>Budget page</Container>
      </Main>
      <MainMobileNav />
    </MainLayout>
  )
}
