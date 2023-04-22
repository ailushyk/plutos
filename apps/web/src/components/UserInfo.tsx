import { User } from '@clerk/nextjs/api'

export const UserInfo = ({ user }: { user: User | null }) => {
  if (!user) return null

  return <div>Hello, {user.firstName} welcome to Clerk</div>
}
