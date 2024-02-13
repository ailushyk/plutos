import { DangerousIcon } from '@/components/icons/dangerous-icon'

export const InvalidToken = ({ message }: { message?: string }) => {
  return (
    <div className="flex items-center justify-center gap-2 bg-destructive">
      <DangerousIcon />
      <p>{message || 'Invalid token'}</p>
    </div>
  )
}
