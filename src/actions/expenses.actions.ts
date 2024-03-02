'use server'

import { revalidatePath } from 'next/cache'
import { expense } from '@/data/expense.data'
import { ExpenseSchemaForm } from '@/schemas/expenses.schema'

import { getUser } from '@/lib/auth/user.server'
import { FormStateValue } from '@/components/form'

export async function addOrUpdateExpense(
  prevState: any,
  formData: FormData,
): Promise<FormStateValue> {
  const user = await getUser()
  const data = Object.fromEntries(formData.entries())
  const validatedData = ExpenseSchemaForm.safeParse(data)

  if (!validatedData.success) {
    return {
      status: 'error',
      message: 'Invalid input data',
      errors: validatedData.error.flatten().fieldErrors,
    }
  }

  await expense.createOrUpdate(validatedData.data, user.id)
  revalidatePath('/expenses')
  return {
    status: 'ok',
    message: 'Expense added successfully',
  }
}
