'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { FormStateValue } from '@/components/form'
import { UserWalletService } from '@/modules/wallets/user-wallet-service'
import {
  FormWalletSchema,
  UpdateWalletSchema,
} from '@/modules/wallets/wallet-schema'

export async function createWalletAction(
  prevState: any,
  formData: FormData,
): Promise<FormStateValue> {
  const validatedFields = FormWalletSchema.safeParse({
    name: formData.get('name'),
    typeId: formData.get('typeId'),
    currency: formData.get('currency'),
  })
  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Invalid input',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  try {
    const result = await UserWalletService.create(validatedFields.data)
    return {
      status: 'ok',
      message: `Wallet ${result.name} created`,
    }
  } catch (error) {
    console.error(error)
    return {
      status: 'error',
      message: 'Something went wrong',
    }
  } finally {
    revalidatePath('/')
  }
}

export async function deleteWalletAction(
  prevState: any,
  formData: FormData,
): Promise<FormStateValue> {
  const walletId = formData.get('id') as string
  await UserWalletService.delete(walletId)
  revalidatePath('/settings/wallets')
  redirect('/settings/wallets')
}

export async function updateWalletAction(
  prevState: z.infer<typeof UpdateWalletSchema>,
  formData: FormData,
): Promise<FormStateValue> {
  const data = Object.fromEntries(formData.entries())
  const walletId = data.id as string
  const result = await UserWalletService.update(walletId, data)
  revalidatePath('/settings/wallets')
  return result
}
