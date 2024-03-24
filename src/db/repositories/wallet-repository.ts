import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '@/db'
import { currency, wallet, walletType } from '@/db/schema/transactions'
import { NewWalletSchema, UpdateWalletSchema } from '@/schemas/wallet.schema'

function allByUserId({ userId }: { userId: string }) {
  return db.select().from(wallet).where(eq(wallet.userId, userId))
}

function allByUserIdWithRelations({ userId }: { userId: string }) {
  return db
    .select({
      id: wallet.id,
      name: wallet.name,
      balance: wallet.balance,
      type: {
        name: walletType.name,
      },
      currency: {
        name: currency.name,
      },
    })
    .from(wallet)
    .where(eq(wallet.userId, userId))
    .leftJoin(walletType, eq(wallet.typeId, walletType.id))
    .leftJoin(currency, eq(wallet.currencyId, currency.id))
}

async function findByIdWithRelations(param: {
  walletId: string
  userId: string
}) {
  const data = await db
    .select({
      id: wallet.id,
      name: wallet.name,
      balance: wallet.balance,
      userId: wallet.userId,
      type: {
        id: walletType.id,
        name: walletType.name,
      },
      currency: {
        id: currency.id,
        name: currency.name,
      },
    })
    .from(wallet)
    .where(and(eq(wallet.id, param.walletId), eq(wallet.userId, param.userId)))
    .innerJoin(walletType, eq(wallet.typeId, walletType.id))
    .innerJoin(currency, eq(wallet.currencyId, currency.id))

  if (data.length === 0) {
    return null
  }
  return data[0]
}

function create(userId: string, data: any) {
  return db.insert(wallet).values({ id: 'abra', ...data, userId })
}

function update(walletId: string, data: z.infer<typeof UpdateWalletSchema>) {
  return db.update(wallet).set(data).where(eq(wallet.id, walletId))
}

function deleteById(walletId: string) {
  return db.delete(wallet).where(eq(wallet.id, walletId))
}

export const WalletRepository = {
  all: allByUserId,
  allByUserIdWithRelations,
  findByIdWithRelations,
  create,
  update,
  delete: deleteById,
}
