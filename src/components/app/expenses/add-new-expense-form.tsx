'use client'

import { useRouter } from 'next/navigation'
import { addNewExpense } from '@/actions/expenses.actions'
import { Currency, Wallet } from '@prisma/client'

import {
  Form,
  FormError,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
  FormSelect,
  FormSuccess,
  SubmitButton,
} from '@/components/form'

const defaultValues = {
  title: '',
  note: '',
  walletId: '',
  currencyId: '',
  amount: '',
  dueDate: new Date().toISOString(),
}

export const AddNewExpenseForm = ({
  wallets,
  currencies,
}: {
  wallets: Wallet[]
  currencies: Currency[]
}) => {
  const router = useRouter()
  return (
    <Form
      action={addNewExpense}
      className="m-auto max-w-sm"
      onSuccess={() => {
        router.push('/expenses')
      }}
    >
      <FormField name="title">
        <FormLabel>Title</FormLabel>
        <FormInput defaultValue={defaultValues.title} />
        <FormMessage />
      </FormField>

      <FormField name="note">
        <FormLabel>
          Note <span className="text-gray-500"> (optional)</span>
        </FormLabel>
        <FormInput defaultValue={defaultValues.note} />
        <FormMessage />
      </FormField>

      <FormField name="walletId">
        <FormLabel>Wallet</FormLabel>
        <FormSelect>
          {wallets.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </FormSelect>
        <FormMessage />
      </FormField>

      <FormField name="dueDate">
        <FormLabel>Due Date</FormLabel>
        <FormInput defaultValue={defaultValues.dueDate} />
        <FormMessage />
      </FormField>

      <div className="grid grid-flow-col gap-6">
        <FormField name="amount">
          <FormLabel>Amount</FormLabel>
          <FormInput defaultValue={defaultValues.amount} />
          <FormMessage />
        </FormField>

        <FormField name="currencyId">
          <FormLabel>Currency</FormLabel>
          <FormSelect>
            {currencies.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </FormSelect>
          <FormMessage />
        </FormField>
      </div>

      <FormSuccess />
      <FormError />
      <SubmitButton>add</SubmitButton>
    </Form>
  )
}
