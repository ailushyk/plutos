import { getUser } from '@/lib/auth/user.server'
import { WalletRepository } from '@/db/repositories/wallet-repository'

const all = async () => {
  console.log('in')
  const user = await getUser()
  return WalletRepository.all({
    userId: user.id,
  })
}

export const WalletService = {
  all,
}
