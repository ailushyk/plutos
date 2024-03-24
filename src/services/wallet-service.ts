import { getUser } from '@/lib/auth/user.server'
import { WalletRepository } from '@/db/repositories/wallet-repository'
import { FormStateValue } from '@/components/form'
import { WalletTypeRepository } from '@/data/wallet-type-repository'
import { NewWalletSchema, UpdateWalletSchema } from '@/schemas/wallet.schema'

const all = async () => {
  const user = await getUser()
  return WalletRepository.allByUserIdWithRelations({
    userId: user.id,
  })
}

const get = async (walletId: string, userId: string) => {
  return WalletRepository.findByIdWithRelations({
    walletId,
    userId,
  })
}

function types() {
  return WalletTypeRepository.all()
}

async function create(data: any): Promise<FormStateValue> {
  const user = await getUser()
  const validatedFields = NewWalletSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Invalid input',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  await WalletRepository.create(user.id, validatedFields.data)
  return {
    status: 'ok',
  }
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

export const WalletService = {
  all,
  get,
  types,
  create,
  update,
  delete: deleteById,
}
