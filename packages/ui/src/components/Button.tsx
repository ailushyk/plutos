import * as React from 'react'

export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-black no-underline hover:bg-gray-300 md:px-10 md:py-3 md:text-lg md:leading-6">
      {children}
    </div>
  )
}
