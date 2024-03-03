import { z } from 'zod'

export const ExpenseSchema = z.object({
  id: z.string(),
  title: z.string(),
  note: z.string().optional(),
  wallet: z.object({
    id: z.string(),
    name: z.string(),
  }),
  currency: z.object({
    id: z.string(),
    name: z.string(),
    symbol: z.string(),
  }),
  amount: z.coerce.number().multipleOf(0.01).min(0.01, {
    message: 'Minimum amount is 0.01',
  }),
  dueDate: z.date(),
})

export const ExpenseSchemaForm = z.object({
  id: z.string().optional(),
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
  dueDate: z.string().transform((val) => {
    return val ? new Date(val) : new Date()
  }),
  // dueDate: z.date().optional().default(new Date()),
})
