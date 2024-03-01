'use client'

import { useRouter } from 'next/navigation'
import { createWalletAction } from '@/actions/wallet.actions'

import {
  Form,
  FormError,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
  FormSection,
  FormSelect,
  FormSuccess,
  SubmitButton,
} from '@/components/form'

export const NewWalletForm = async ({
  types,
  currencies,
}: {
  types: any[]
  currencies: any[]
}) => {
  const router = useRouter()
  return (
    <Form
      action={createWalletAction}
      onSuccess={() => {
        router.back()
      }}
    >
      <FormSection>
        <input
          type="hidden"
          name="type"
          value="167b5b8f-4975-41d0-b7d2-0ad1f503f615"
        />
        <FormField name="name">
          <FormLabel>Name</FormLabel>
          <FormInput />
          <FormMessage />
        </FormField>
        <FormField name="currency">
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
        <FormField name="type">
          <FormLabel>Type</FormLabel>
          <FormSelect>
            {types.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </FormSelect>
          <FormMessage />
        </FormField>
      </FormSection>

      <FormSuccess />
      <FormError />
      <SubmitButton>Create</SubmitButton>
    </Form>
  )
}
