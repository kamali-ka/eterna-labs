"use client"

import React from 'react'
import type { Token } from '../../../types/token'

export default function TableRow({ token }: { token: Token }) {
  const changeCls = token.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'

  return (
    <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center px-4 py-3 hover:bg-white/60 rounded-md">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-slate-200 rounded flex items-center justify-center text-xs font-semibold">{token.symbol.split('-')[0]}</div>
        <div>
          <div className="text-sm font-medium">{token.symbol}</div>
          <div className="text-xs text-slate-500">{token.name}</div>
        </div>
      </div>

      <div className="text-sm">${token.price.toFixed(2)}</div>

      <div className={`text-sm ${changeCls}`}>{token.change24h.toFixed(2)}%</div>

      <div className="text-sm text-slate-600">${(token.liquidity / 1000).toLocaleString()}k</div>
    </div>
  )
}
