import { Form, FormError, FormSuccess, SubmitButton } from '@/components/form'
import { deleteWalletAction } from '@/modules/wallets/wallet-actions'

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
