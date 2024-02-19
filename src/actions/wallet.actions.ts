'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { wallet } from '@/data/wallets'
import { NewWalletSchema, UpdateWalletSchema } from '@/schemas/wallet.schema'

import { getUser } from '@/lib/auth/user.server'
import { FormStateValue } from '@/components/form'

export async function createWalletAction(
  prevState: any,
  formData: FormData,
): Promise<FormStateValue> {
  const user = await getUser()
  const data = Object.fromEntries(formData.entries())
  const validatedFields = NewWalletSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Invalid input',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  await wallet.create(validatedFields.data, user.id!)
  redirect('/settings/wallets')
}

export async function deleteWalletAction(
  prevState: any,
  formData: FormData,
): Promise<FormStateValue> {
  const walletId = formData.get('id') as string
  const user = await getUser()
  const existingWallet = await wallet.getByIdAndUserId(walletId, user.id!)
  if (!existingWallet) {
    return {
      status: 'error',
      message: 'Wallet not found',
    }
  }

  await wallet.delete(walletId)
  revalidatePath('/settings/wallets')
  redirect('/settings/wallets')
}

export async function updateWalletAction(
  prevState: any,
  formData: FormData,
): Promise<FormStateValue> {
  const data = Object.fromEntries(formData.entries())
  const walletId = data.id as string
  const user = await getUser()

  const existingWallet = await wallet.getByIdAndUserId(walletId, user.id!)
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

  await wallet.update(walletId, validatedFields.data)
  revalidatePath('/settings/wallets')
  return {
    status: 'ok',
    message: 'Wallet updated',
  }
}
