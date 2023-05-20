import React from 'react'
import Link from 'next/link'
import {
  HomeIcon as HomeIconOutline,
  UserIcon as UserIconOutline,
} from '@heroicons/react/24/outline'
import { HomeIcon, UserIcon } from '@heroicons/react/24/solid'
import { Locale } from '@/i18n'

export function PageHeader(props: {
  lang: Locale
  title?: string
  children?: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <Link
            href={`/${props.lang}`}
            className="group relative flex h-11 w-11 items-center justify-center"
          >
            <HomeIconOutline className="absolute h-6 w-6 text-white opacity-40 transition group-hover:opacity-0" />
            <HomeIcon className="absolute h-5 w-5 opacity-0 transition group-hover:opacity-100" />
          </Link>
        </div>
        <div className="col-span-3 flex items-center justify-center">
          <h1 className="text-lg font-extrabold text-white/80 sm:text-2xl lg:text-3xl xl:text-4xl">
            {props.children || props.title}
          </h1>
        </div>
        <div className="flex justify-end">
          <Link
            href={`/${props.lang}/profile`}
            className="group relative flex h-11 w-11 items-center justify-center"
          >
            <UserIconOutline className="absolute h-6 w-6 text-white opacity-40 transition group-hover:opacity-0" />
            <UserIcon className="absolute h-5 w-5 opacity-0 transition group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </div>
  )
}
