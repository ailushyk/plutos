import { CurrencyRepository } from '@/db/repositories/currency-repository'

function all() {
  return CurrencyRepository.all()
}

export const CurrencyService = {
  all,
}
