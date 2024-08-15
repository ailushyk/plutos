import { fetcher } from '@/lib/fetcher'
import { env } from '@/env'

export const CurrencyService = {
  async all() {
    const { data } = await fetcher(`${env.API_URL}/api/currencies`)
    return data
  },
}
