import { z } from 'zod'

import { getUser } from '@/lib/auth/user.server'
import { fetcher } from '@/lib/fetcher'
import { WalletRepository } from '@/db/repositories/wallet-repository'
import { FormStateValue } from '@/components/form'
import { env } from '@/env'
import { Wallet } from '@/modules/wallets/types'
import {
  FormWalletSchema,
  UpdateWalletSchema,
} from '@/modules/wallets/wallet-schema'

const types = async () => {
  const { data } = await fetcher<Wallet[]>(`${env.API_URL}/api/wallet-types`)
  return data
}

const all = async () => {
  const { data } = await fetcher<Wallet[]>(`${env.API_URL}/api/wallets`)
  return data
}

const get = async (walletId: string, userId: string) => {
  return WalletRepository.findByIdWithRelations({
    walletId,
    userId,
  })
}

async function update(walletId: string, data: any): Promise<FormStateValue> {
  const user = await getUser()
  const existingWallet = await WalletRepository.findByIdWithRelations({
    walletId,
    userId: user.id,
  })
  if (!existingWallet) {
    return {
      status: 'error',
      message: 'Wallet not found',
    }
  }

  if (existingWallet.userId !== user.id) {
    return {
      status: 'error',
      message: 'Unauthorized',
    }
  }

  const validatedFields = UpdateWalletSchema.safeParse(data)
  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Invalid input',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  await WalletRepository.update(walletId, validatedFields.data)

  return {
    status: 'ok',
    message: 'Wallet updated',
  }
}

async function deleteById(walletId: string): Promise<FormStateValue> {
  const user = await getUser()
  const existingWallet = await WalletRepository.findByIdWithRelations({
    walletId,
    userId: user.id,
  })
  if (!existingWallet) {
    return {
      status: 'error',
      message: 'Wallet not found',
    }
  }

  await WalletRepository.delete(walletId)
  return {
    status: 'ok',
    message: 'Wallet deleted',
  }
}

export const UserWalletService = {
  all,
  get,
  types,
  create: async (
    values: z.infer<typeof FormWalletSchema>,
  ): Promise<{ id: string; name: string }> => {
    const { data } = await fetcher(`${env.API_URL}/api/wallets`, {
      method: 'POST',
      body: JSON.stringify(values),
    })
    return data
  },
  update,
  delete: deleteById,
}
