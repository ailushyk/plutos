/**
 * An array of routes that are public and do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/']

export const AUTH_SIGN_IN_PATH = '/auth/sign-in'

/**
 * An array of routes that are used for authentication.
 * That routes will be redirect logged users to the /dashboard
 * @type {string[]}
 */
export const authRoutes: string[] = [
  AUTH_SIGN_IN_PATH,
  '/auth/sign-up',
  '/auth/error',
]

/**
 * The prefix for the API authentication routes.
 * Routes that start with this prefix are used for authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth'
export const closedRoutes: string[] = [
  // `${apiAuthPrefix}/signin`
]

/**
 * The default redirect route after a successful login
 */
export const DEFAULT_AUTH_REDIRECT = '/dashboard'
