export const cacheTag = {
  wallet: {
    all() {
      return 'all-wallets'
    },
    byId(id: string) {
      return `wallet-${id}`
    },
  },
}
