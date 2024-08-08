import { NextAuthConfig } from 'next-auth'
import Keycloak from 'next-auth/providers/keycloak'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image: string
    }
    idToken: string
  }
}

export const authConfig: NextAuthConfig = {
  providers: [Keycloak]
}
