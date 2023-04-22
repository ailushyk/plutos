import { LangSwitch } from '@/components/LangSwitch'
import { currentUser, UserButton } from '@clerk/nextjs/app-beta'
import { User } from '@clerk/nextjs/api'
import { UserInfo } from '@/components/UserInfo'
import { RefreshCacheIfUserLogout } from '@/app/[lang]/profile/RefreshCacheIfUserLogout'

async function ProfilePage({ params }: { params: { lang: string } }) {
  const user: User | null = await currentUser()

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <RefreshCacheIfUserLogout />

      <div className="flex justify-end">
        <UserButton />
      </div>

      <div className="flex flex-col gap-6">Your profile</div>

      <div>Current locale: {params.lang}</div>

      <LangSwitch />

      <UserInfo user={user} />
    </div>
  )
}
export default ProfilePage
