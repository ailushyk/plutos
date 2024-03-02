import { Container, Main, MainLayout } from '@/components/layout/main-layout'
import { TopBar, TopBarTitle } from '@/components/top-bar/top-bar'

export default async function Page() {
  return (
    <MainLayout>
      <TopBar backButton backButtonHref="/transactions">
        <TopBarTitle>Income</TopBarTitle>
      </TopBar>
      <Main>
        <Container>Income page</Container>
      </Main>
    </MainLayout>
  )
}
