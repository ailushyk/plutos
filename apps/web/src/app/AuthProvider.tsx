import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export function AuthProvider({
  params,
  children,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <ClerkProvider
      signInUrl={`/${params.lang}/sign-in`}
      signUpUrl={`/${params.lang}/sign-up`}
      appearance={{
        baseTheme: dark,
      }}
    >
      {children}
    </ClerkProvider>
  )
}
