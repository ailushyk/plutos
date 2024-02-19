'use server'

import { revalidatePath } from 'next/cache'
import { expense } from '@/data/expense.data'
import { NewExpenseSchema } from '@/schemas/expenses.schema'

import { FormStateValue } from '@/components/form'

export async function addNewExpense(
  prevState: any,
  formData: FormData,
): Promise<FormStateValue> {
  const data = Object.fromEntries(formData.entries())
  const validatedData = NewExpenseSchema.safeParse(data)

  if (!validatedData.success) {
    return {
      status: 'error',
      message: 'Invalid data',
      errors: validatedData.error.flatten().fieldErrors,
    }
  }

  // expense
  console.log('Add new expense', validatedData.data)
  await expense.addExpense(validatedData.data)
  revalidatePath('/expenses')
  return {
    status: 'ok',
    message: 'Expense added successfully',
  }
}
