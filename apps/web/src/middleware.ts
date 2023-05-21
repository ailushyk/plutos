import { authMiddleware } from '@clerk/nextjs'
import { i18NMiddleware } from '@/middlewares/i18n'
import type { NextRequest } from 'next/server'

const middlewares = [i18NMiddleware]

function middlewareChief(request: NextRequest) {
  for (let i = 0; i < middlewares.length; i++) {
    let response = middlewares[i](request)
    if (response) return response
  }
}

export const middleware = authMiddleware({
  beforeAuth: (request) => {
    return middlewareChief(request)
  },
  publicRoutes: ['/', '/:lang/sign-in', '/:lang/sign-up'],
})

export const config = {
  // matcher: ['/((?!api|_next).*)'],
  matcher: ['/((?!.*\\..*|_next|favicon.ico).*)', '/', '/(api|trpc)(.*)'],
}
