export const cache = {
  wallet: {
    all() {
      return 'all-wallets'
    },
    byId(id: string) {
      return `wallet-${id}`
    },
  },
}
