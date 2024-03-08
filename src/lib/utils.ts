import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isServer = typeof window !== undefined

export const getAvatarFallbackTitle = (title: string) => {
  return title
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
}

export function sleep(number: number) {
  return new Promise((resolve) => setTimeout(resolve, number))
}
