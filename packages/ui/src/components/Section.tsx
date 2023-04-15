import React from 'react'

export function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-zinc-900">
      <div className="flex flex-col gap-6 px-4 py-6">{children}</div>
    </div>
  )
}
