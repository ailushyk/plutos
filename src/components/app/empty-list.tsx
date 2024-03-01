import React from 'react'

export const EmptyList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <p className="text-gray-400">{children}</p>
    </div>
  )
}
