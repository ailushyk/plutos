import Big from 'big.js'
export function formatMoney(amount: number) {
  let priceString = Big(amount).div(100).toFixed(2)
  return priceString.split('.')
}
