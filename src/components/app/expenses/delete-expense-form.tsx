import { deleteExpense } from '@/actions/expenses.actions'

import { Form, FormError, FormSuccess, SubmitButton } from '@/components/form'

export const DeleteExpenseForm = ({ expenseId }: { expenseId: string }) => {
  return (
    <Form action={deleteExpense} className="m-auto max-w-sm">
      <input type="hidden" name="id" value={expenseId} />
      <FormSuccess />
      <FormError />
      <SubmitButton variant="destructive">Delete</SubmitButton>
    </Form>
  )
}
