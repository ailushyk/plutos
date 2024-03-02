// currency
import { Decimal } from '@prisma/client/runtime/binary'

import { userLocale } from '@/lib/user-locale/user-locale'

export const formatCurrency = (
  amount: Decimal | number | string,
  options?: {
    style?: 'decimal' | 'currency' | 'percent' | 'unit'
    currency?: string
    locale?: string
  },
) => {
  const locale = options?.locale || userLocale.get()
  const value = Number(amount.toString())
  const hasFraction = value % 1 !== 0
  const _options: Intl.NumberFormatOptions = {
    ...options,
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  }
  return new Intl.NumberFormat(locale, _options).format(value)
}

/** @deprecated */
export const formatCurrencyFromDecimal = (
  amount: Decimal,
  currency: string,
  locale?: string,
) => {
  if (!locale) {
    locale = userLocale.get()
  }
  const value = Number(amount.toString())
  const hasFraction = value % 1 !== 0
  const options: Intl.NumberFormatOptions = {
    // style: 'currency',
    // currency: currency,
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  }
  // TODO: get user locale
  return new Intl.NumberFormat(locale, options).format(value)
}
