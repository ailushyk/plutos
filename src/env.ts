const API_URL = process.env.API_URL || 'http://localhost:3000'
const AUTH_KEYCLOAK_ISSUER = process.env.AUTH_KEYCLOAK_ISSUER
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''

export const env = {
  API_URL,
  AUTH_KEYCLOAK_ISSUER,
  RESEND_API_KEY,
}
