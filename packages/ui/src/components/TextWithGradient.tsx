import React from 'react'

export function TextWithGradient({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mx-auto pt-8 text-center text-lg font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl xl:text-4xl">
      <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text px-2 text-transparent">
        {children}
      </span>
    </h1>
  )
}
