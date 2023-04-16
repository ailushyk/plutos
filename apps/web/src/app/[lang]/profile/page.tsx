import { LangSwitch } from '@/components/LangSwitch'

function ProfilePage({ params }: { params: { lang: string } }) {
  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col gap-6">Your profile</div>

      <div>Current locale: {params.lang}</div>
      <LangSwitch />
    </div>
  )
}
export default ProfilePage
