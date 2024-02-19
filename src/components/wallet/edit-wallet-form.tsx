import { updateWalletAction } from '@/actions/wallet.actions'
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

export const EditWalletForm = async ({
  defaultValues,
}: {
  defaultValues: {
    id: string
    name: string
    currency: {
      id: string
      name: string
    }
    type: {
      id: string
      name: string
    }
  }
}) => {
  const currencyOptions = await currency.all()
  const typeOptions = await wallet.types()
  return (
    <Form action={updateWalletAction}>
      <input type="hidden" name="id" value={defaultValues.id} />
      <FormSection>
        <FormField name="name">
          <FormLabel>Name</FormLabel>
          <FormInput defaultValue={defaultValues.name} />
          <FormMessage />
        </FormField>
        <FormField name="currency">
          <FormLabel>Currency</FormLabel>
          <FormSelect defaultValue={defaultValues.currency.id}>
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
          <FormSelect defaultValue={defaultValues.type.id}>
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
      <SubmitButton>Save</SubmitButton>
    </Form>
  )
}
