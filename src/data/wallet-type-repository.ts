import { db } from '@/db'
import { walletType } from '@/db/schema/transactions'

function all() {
  return db.select().from(walletType)
}

export const WalletTypeRepository = {
  all,
}
