import React from 'react'

export function Widget({
  label,
  integer,
  decimal,
  currency,
}: {
  label: string
  integer: number | string
  decimal: number | string
  currency: string
}) {
  return (
    <div className="rounded-2xl border border-transparent bg-zinc-900 bg-gradient-to-r from-brandgreen to-brandblue bg-origin-border">
      <div className="flex flex-col gap-1 rounded-2xl bg-zinc-900/70 px-4 py-6">
        <div className="text-sm uppercase text-white/60">{label}</div>
        <div className="flex justify-between gap-4">
          <div className="text-xl font-semibold">
            {integer}
            <sup>{decimal}</sup>
          </div>
          <div className="text-xl font-semibold">{currency}</div>
        </div>
      </div>
    </div>
  )
}
