/**
 * An array of routes that are public and do not require authentication
 * @type {string[]}
 */

export const AUTH_SIGN_IN_URL = '/auth/sign-in'
export let AUTH_VERIFICATION_EMAIL_URL = '/auth/verify-request'
export let AUTH_NEW_PASSWORD_URL = '/auth/new-password'
export const AUTH_DEFAULT_REDIRECT_URL = '/dashboard'
export const publicRoutes: string[] = ['/']

/**
 * An array of routes that are used for authentication.
 * That routes will be redirect logged users to the /dashboard
 * @type {string[]}
 */
export const authRoutes: string[] = [
  AUTH_SIGN_IN_URL,
  '/auth/sign-up',
  AUTH_VERIFICATION_EMAIL_URL,
  '/auth/reset-password',
  AUTH_NEW_PASSWORD_URL,
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
