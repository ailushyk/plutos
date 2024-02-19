import { createWalletAction } from '@/actions/wallet.actions'
import { currency } from '@/data/currency'
import { wallet } from '@/data/wallets'

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

export const NewWalletForm = async () => {
  const currencyOptions = await currency.all()
  const typeOptions = await wallet.types()
  return (
    <Form action={createWalletAction}>
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
            {currencyOptions.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.name}
              </option>
            ))}
          </FormSelect>
          <FormMessage />
        </FormField>
        <FormField name="type">
          <FormLabel>Type</FormLabel>
          <FormSelect>
            {typeOptions.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.name}
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
