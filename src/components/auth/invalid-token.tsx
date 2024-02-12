import { DangerousIcon } from '@/components/icons/dangerous-icon'

export const InvalidToken = () => {
  return (
    <div className="flex items-center justify-center gap-2 bg-destructive">
      <DangerousIcon />
      <p>Invalid token</p>
    </div>
  )
}
