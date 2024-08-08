import React from 'react'
import Link from 'next/link'
import { getUser } from '@/lib/auth/user.server'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/icons/icon'
import { getInitials } from '@/lib/string-utils'
import { SignOut } from '@/components/auth/sign-out'

export async function UserMenu() {
  const user = await getUser()
  const initials = getInitials(user?.name || user?.email)

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={user.image}
            alt={user.name || user.email}
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
              'w-full justify-start gap-1'
            )}
          >
            <Icon name="settings" />
            Preferences
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="px-0 py-0">
          <SignOut><Icon name="logout" />Sign Out</SignOut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
