import { getAuth } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Set the paths that don't require the user to be signed in
const publicPaths = ['/[a-z]{2}', '/[a-z]{2}/sign-in*', '/[a-z]{2}/sign-up*']

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)'))),
  )
}

export const authMiddleware = (request: NextRequest) => {
  if (!isPublic(request.nextUrl.pathname)) {
    // if the user is not signed in redirect them to the sign in page.
    const { userId } = getAuth(request)

    if (!userId) {
      // redirect the users to /pages/sign-in/[[...index]].ts

      const signInUrl = new URL('/sign-in', request.url)
      signInUrl.searchParams.set('redirect_url', request.url)
      return NextResponse.redirect(signInUrl)
    }
  }
}

/**
 * Stop Middleware running on static files and public folder
 * Match all request paths except for the ones starting with:
 * - _next
 * - static (static files)
 * - favicon.ico (favicon file)
 * - public folder
 * Example:
 * - /static/css/styles.css
 * - /static/images/logo.png
 * - /scripts/main.js
 * - /blog/my-post.html
 * - /_next/data/abc.json
 * - /_next/static/css/styles.css
 * - /favicon.ico
 */
export const clerkConfig = ['/((?!static|.*\\..*|_next|favicon.ico).*)', '/']
