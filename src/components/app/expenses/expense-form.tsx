'use client'

import { useRouter } from 'next/navigation'
import { addOrUpdateExpense } from '@/actions/expenses.actions'
import { ExpenseSchemaForm } from '@/schemas/expenses.schema'
import { Currency, Wallet } from '@prisma/client'
import { z } from 'zod'

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

export const ExpenseForm = ({
  initValues,
  wallets,
  currencies,
}: {
  initValues?: z.infer<typeof ExpenseSchemaForm>
  wallets: Wallet[]
  currencies: Currency[]
}) => {
  const router = useRouter()

  return (
    <Form
      action={addOrUpdateExpense}
      className="m-auto max-w-sm"
      onSuccess={() => {
        router.back()
      }}
    >
      <input type="hidden" name="id" value={initValues?.id} />
      <FormField name="title">
        <FormLabel>Title</FormLabel>
        <FormInput defaultValue={initValues?.title} />
        <FormMessage />
      </FormField>

      <FormField name="note">
        <FormLabel>
          Note <span className="text-gray-500"> (optional)</span>
        </FormLabel>
        <FormInput defaultValue={initValues?.note} />
        <FormMessage />
      </FormField>

      <FormField name="walletId">
        <FormLabel>Wallet</FormLabel>
        <FormSelect defaultValue={initValues?.walletId}>
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
        <FormInput
          type="date"
          defaultValue={initValues?.dueDate.toISOString().substring(0, 10)}
          className="block"
        />
        <FormMessage />
      </FormField>

      <div className="grid grid-flow-col gap-6">
        <FormField name="amount">
          <FormLabel>Amount</FormLabel>
          <FormInput
            type="number"
            step=".01"
            defaultValue={initValues?.amount}
          />
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
      <SubmitButton>{initValues?.id ? 'Update' : 'Add'}</SubmitButton>
    </Form>
  )
}
