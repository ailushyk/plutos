import { db } from '@/db'
import { currency } from '@/db/schema/transactions'

function all() {
  return db.select().from(currency)
}

export const CurrencyRepository = {
  all,
}
