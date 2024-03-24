'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { FormStateValue } from '@/components/form'
import { UpdateWalletSchema } from '@/schemas/wallet.schema'
import { WalletService } from '@/services/wallet-service'

export async function createWalletAction(
  prevState: any,
  formData: FormData,
): Promise<FormStateValue> {
  const data = Object.fromEntries(formData.entries())
  const result = await WalletService.create(data)
  revalidatePath('/')
  return result
}

export async function deleteWalletAction(
  prevState: any,
  formData: FormData,
): Promise<FormStateValue> {
  const walletId = formData.get('id') as string
  await WalletService.delete(walletId)
  revalidatePath('/settings/wallets')
  redirect('/settings/wallets')
}

export async function updateWalletAction(
  prevState: z.infer<typeof UpdateWalletSchema>,
  formData: FormData,
): Promise<FormStateValue> {
  const data = Object.fromEntries(formData.entries())
  const walletId = data.id as string
  const result = await WalletService.update(walletId, data)
  revalidatePath('/settings/wallets')
  return result
}
