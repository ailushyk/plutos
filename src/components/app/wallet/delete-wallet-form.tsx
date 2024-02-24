import { deleteWalletAction } from '@/actions/wallet.actions'

import { Form, FormError, FormSuccess, SubmitButton } from '@/components/form'

export function DeleteWalletForm({ walletId }: { walletId: string }) {
  return (
    <Form action={deleteWalletAction} className="flex flex-col">
      <input type="hidden" name="id" value={walletId} />

      <FormSuccess />
      <FormError />
      <SubmitButton variant="destructive" size="lg">
        Delete Wallet
      </SubmitButton>
    </Form>
  )
}
