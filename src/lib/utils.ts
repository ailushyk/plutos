import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAvatarFallbackTitle = (title: string) => {
  return title
    .split(' ')
    .map((n) => n[0])
    .join('')
}
