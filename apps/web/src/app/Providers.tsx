import { ClerkProvider } from '@clerk/nextjs/app-beta'

function Providers({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>
}

export default Providers
