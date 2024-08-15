import {
  Form,
  FormActionType,
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

export const NewWalletForm = ({
  action,
  types,
  currencies,
}: {
  action: FormActionType
  types: any[]
  currencies: any[] // TODO: Define type
}) => {
  return (
    <Form action={action}>
      <FormSection>
        <FormField name="name">
          <FormLabel>Name</FormLabel>
          <FormInput />
          <FormMessage />
        </FormField>
        <FormField name="currency">
          <FormLabel>Currency</FormLabel>
          <FormSelect>
            {currencies.map((item) => (
              <option key={item.id} value={item.code}>
                {item.name}
              </option>
            ))}
          </FormSelect>
          <FormMessage />
        </FormField>
        <FormField name="typeId">
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
