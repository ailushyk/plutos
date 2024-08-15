import { env } from '@/env'

export async function refreshAccessToken(token: any) {
  console.info('Refreshing access token')
  const url = new URL(
    `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
  )
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: env.AUTH_KEYCLOAK_ID as string,
      client_secret: env.AUTH_KEYCLOAK_SECRET as string,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken as string,
    }),
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  return {
    ...token,
    accessToken: data.access_token,
    accessExpiresAt: Date.now() + data.expires_in * 1000,
    refreshToken: data.refresh_token,
  }
}
