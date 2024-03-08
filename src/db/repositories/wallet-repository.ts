import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { wallet } from '@/db/schema/transactions'

function allByUserId({ userId }: { userId: string }) {
  return db.select().from(wallet).where(eq(wallet.userId, userId))
}

export const WalletRepository = {
  all: allByUserId,
}
