import { updateWalletAction } from '@/actions/wallet.actions'
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
import { CurrencyService } from '@/services/currency-service'
import { WalletService } from '@/services/wallet-service'

export const EditWalletForm = async ({
  defaultValues,
}: {
  defaultValues: {
    id: string
    name: string
    balance: number
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
  const currencyOptions = await CurrencyService.all()
  const typeOptions = await WalletService.types()
  return (
    <Form action={updateWalletAction}>
      <input type="hidden" name="id" value={defaultValues.id} />
      <FormSection>
        <FormField name="name">
          <FormLabel>Name</FormLabel>
          <FormInput defaultValue={defaultValues.name} />
          <FormMessage />
        </FormField>
        <FormField name="currencyId">
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
        <FormField name="typeId">
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
