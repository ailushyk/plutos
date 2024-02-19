import { db } from '@/lib/db'

class Currency {
  all() {
    return db.currency.findMany()
  }
}

export const currency = new Currency()
