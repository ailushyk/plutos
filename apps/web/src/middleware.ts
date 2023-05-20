import type { NextRequest } from 'next/server'
import { authMiddleware } from '@clerk/nextjs'
import { i18NMiddleware } from '@/middlewares/i18n'

const middlewares = [i18NMiddleware]

function nextMiddleware(request: NextRequest) {
  for (let i = 0; i < middlewares.length; i++) {
    let response = middlewares[i](request)
    if (response) return response
  }
}

export const middleware = authMiddleware({
  beforeAuth: (request) => {
    return nextMiddleware(request)
  },
})

export const config = {
  matcher: ['/((?!api|_next).*)'],
}
