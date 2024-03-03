import { EmptyContent } from '@/components/app/empty-content'
import { MainMobileNav } from '@/components/app/main-mobile-nav'
import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export const metadata = {
  title: 'Focus',
}
export default async function Page() {
  return (
    <MainLayout>
      <TopBar>
        <TopBarTitle>Focus</TopBarTitle>
      </TopBar>
      <Main>
        <Container>
          <EmptyContent>Coming soon</EmptyContent>
        </Container>
      </Main>
      <MainMobileNav />
    </MainLayout>
  )
}
