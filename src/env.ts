const API_URL = process.env.API_URL || 'http://localhost:3000'
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''

export const env = {
  API_URL,
  AUTH_KEYCLOAK_ID: process.env.AUTH_KEYCLOAK_ID,
  AUTH_KEYCLOAK_SECRET: process.env.AUTH_KEYCLOAK_SECRET,
  AUTH_KEYCLOAK_ISSUER: process.env.AUTH_KEYCLOAK_ISSUER,
  RESEND_API_KEY,
}
