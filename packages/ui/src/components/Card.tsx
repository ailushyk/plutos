import * as React from 'react'

export const Card = ({
  title,
  cta,
  href,
}: {
  title: string
  cta: string
  href: string
}) => {
  return (
    <div className="group mt-4 overflow-hidden rounded-lg border border-transparent bg-gradient-to-r from-brandred to-brandblue bg-origin-border text-[#6b7280]">
      <div className="h-full bg-zinc-900 p-4">
        <p className="inline-block text-xl text-white">{title}</p>
        <div className="mt-4 text-xs after:content-['_↗'] group-hover:underline">
          {cta}
        </div>
      </div>
    </div>
  )
}
