import { GithubIcon } from '@/icons/github-icon'
import { GoogleIcon } from '@/icons/google-icon'

import { Button } from '@/components/ui/button'

export const Social = () => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-2">
      <Button variant="outline" size="lg" className="w-full">
        <GoogleIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="lg" className="w-full">
        <GithubIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
