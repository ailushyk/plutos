import type { NextRequest } from 'next/server'
import { withClerkMiddleware } from '@clerk/nextjs/server'
import { i18NMiddleware } from '@/middlewares/i18n'
import { authMiddleware } from '@/middlewares/clerk'

const middlewares = [i18NMiddleware, authMiddleware]

function nextMiddleware(request: NextRequest) {
  for (let i = 0; i < middlewares.length; i++) {
    let response = middlewares[i](request)
    if (response) return response
  }
}

export const middleware = withClerkMiddleware(nextMiddleware)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // '/((?!static|.*\\..*|_next|favicon.ico).*)',
    // '/',
  ],
}
