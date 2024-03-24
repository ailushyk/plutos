import { getAvatarFallbackTitle } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function WalletItem({
  wallet,
}: {
  wallet: {
    id: string
    name: string
    type: {
      name: string
    } | null
    balance: number
    currency: {
      name: string
    } | null
  }
}) {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src="" alt="Wallet image" />
        <AvatarFallback>{getAvatarFallbackTitle(wallet.name)}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{wallet.name}</p>
        <p className="text-sm text-muted-foreground">{wallet.type?.name}</p>
      </div>
      <div className="ml-auto flex flex-col items-end font-medium">
        <div>{wallet.balance}</div>
        <div className="text-sm text-muted-foreground">
          {wallet.currency?.name}
        </div>
      </div>
    </div>
  )
}
