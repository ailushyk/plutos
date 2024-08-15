import { z } from 'zod'

export const FormWalletSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  typeId: z.string().min(1, {
    message: 'Type is required',
  }),
  currency: z.string().min(1, {
    message: 'Currency is required',
  }),
})

/**
 * @deprecated
 */
export const UpdateWalletSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  typeId: z.string().min(1, {
    message: 'Type is required',
  }),
  currencyId: z.string().min(1, {
    message: 'Currency is required',
  }),
})
