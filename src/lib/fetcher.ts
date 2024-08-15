import { getAccessToken } from '@/lib/auth/user.server'

const AUTHORIZATION_HEADER = 'Authorization'
const BEARER_PREFIX = 'Bearer'
const ERROR_MESSAGE = 'An error occurred while fetching the data.'

const createHeaders = async (initHeaders?: HeadersInit): Promise<Headers> => {
  const token = await getAccessToken()
  const headers = new Headers(initHeaders)
  headers.append('Content-Type', 'application/json')
  if (token) {
    headers.append(AUTHORIZATION_HEADER, `${BEARER_PREFIX} ${token}`)
  }
  return headers
}

const handleResponse = async <T>(response: Response): Promise<{ data: T }> => {
  if (!response.ok) {
    throw new Error(ERROR_MESSAGE)
  }
  return response.json()
}

export const fetcher = async <T = any>(
  url: string,
  init?: RequestInit,
): Promise<{ data: T }> => {
  const headers = await createHeaders(init?.headers)
  const response = await fetch(url, {
    ...init,
    headers,
  })
  return handleResponse<T>(response)
}
