import React from 'react'

export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text px-2 text-transparent">
      {children}
    </span>
  )
}
