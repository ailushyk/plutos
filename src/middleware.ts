import {
  apiAuthPrefix,
  AUTH_SIGN_IN_PATH,
  authRoutes,
  closedRoutes,
  DEFAULT_AUTH_REDIRECT,
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
    return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl))
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL(AUTH_SIGN_IN_PATH, nextUrl))
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
