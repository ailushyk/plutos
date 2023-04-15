import React from 'react'

export function List({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col divide-y divide-zinc-800">{children}</div>
  )
}
