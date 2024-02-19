import { z } from 'zod'

export const NewExpenseSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  note: z.string().optional(),
  walletId: z.string().min(1, {
    message: 'Wallet is required',
  }),
  currencyId: z.string().min(1, {
    message: 'Currency is required',
  }),
  amount: z.coerce.number().multipleOf(0.01).min(0.01, {
    message: 'Minimum amount is 0.01',
  }),
  dueDate: z.date().default(() => new Date()),
})
