export type Wallet = {
  id: string
  name: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type WalletCreate = {
  name: string
}

export type WalletUpdate = {
  name: string
}

export type WalletDelete = {
  id: string
}

export type WalletService = {
  all: () => Promise<Wallet[]>
  create: (data: WalletCreate) => Promise<Wallet>
  update: (walletId: string, data: WalletUpdate) => Promise<Wallet>
  deleteById: (walletId: string) => Promise<void>
}
