import React from 'react'
import Link from 'next/link'
import { User } from 'next-auth'

import { signOut } from '@/lib/auth/auth'
import { getUser } from '@/lib/auth/user.server'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/icon'

const getInitials = (user: User) => {
  if (user?.name) {
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
  }
  if (user?.email) {
    return user.email[0]
  }
  return ''
}

export async function UserMenu() {
  const user = await getUser()
  const initials = getInitials(user)

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.image || ''}
                alt={user.name || user.email || ''}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-[4rem] rounded-[2px]"
            align="center"
          >
            <DropdownMenuItem className="px-0 py-0">
              <Link
                href="/settings"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'w-full justify-start gap-1',
                )}
              >
                <Icon name="settings" />
                Preferences
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-0 py-0">
              <form
                action={async () => {
                  'use server'
                  await signOut({ redirect: true })
                }}
                className="w-full"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex w-full justify-start gap-1"
                >
                  <Icon name="logout" />
                  Logout
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/auth/signin"
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          Sign in
        </Link>
      )}
    </>
  )
}
