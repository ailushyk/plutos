import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LoginButton } from '@/components/auth/login-button'

const font = Poppins({ subsets: ['latin'], weight: ['600'] })

export default function Home() {
  return (
    <main
      className={cn(
        'flex h-full flex-col items-center justify-center gap-4 p-24 dark:bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))]',
        'from-yellow-600 via-red-800 to-slate-950',
        // 'from-sky-600 to-slate-950',
      )}
    >
      <h1
        className={cn('text-6xl font-semibold drop-shadow-md', font.className)}
      >
        Plutos
      </h1>
      <p className="text-center text-lg drop-shadow-md">
        A new way to manage your finances
      </p>

      <LoginButton asChild>
        <Button size="lg">Sigh In</Button>
      </LoginButton>
    </main>
  )
}
