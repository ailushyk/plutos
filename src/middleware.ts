import {
  apiAuthPrefix,
  AUTH_DEFAULT_REDIRECT_URL,
  AUTH_SIGN_IN_URL,
  authRoutes,
  closedRoutes,
  publicRoutes,
} from '@/routes'
import NextAuth from 'next-auth'

import { authConfig } from '@/lib/auth/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname)
  const isClosedRoutes = closedRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoutes) {
    return
  }

  if (isClosedRoutes) {
    return Response.redirect(new URL(AUTH_DEFAULT_REDIRECT_URL, nextUrl))
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(AUTH_DEFAULT_REDIRECT_URL, nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL(AUTH_SIGN_IN_URL, nextUrl))
  }

  return
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}
