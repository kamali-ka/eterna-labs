'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Token } from '../../../types/token'

type Props = {
  token: Token
}

function Price({ value }: { value: number }) {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null)
  const prev = useRef<number | null>(null)

  useEffect(() => {
    if (prev.current == null) {
      prev.current = value
      return
    }
    if (value > prev.current) setFlash('up')
    else if (value < prev.current) setFlash('down')

    const t = setTimeout(() => setFlash(null), 400)
    prev.current = value
    return () => clearTimeout(t)
  }, [value])

  return (
    <div className={`text-sm font-mono transition-colors ${flash === 'up' ? 'text-green-500' : flash === 'down' ? 'text-red-500' : 'text-text-primary'}`}>
      {'$' + value.toFixed(2)}
    </div>
  )
}

export default React.memo(function TableRow({ token }: Props) {
  const changeCls = token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'

  return (
    <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center px-4 py-3 hover:bg-bg-hover transition-smooth rounded-md border-b border-border-default">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-bg-tertiary rounded flex items-center justify-center text-xs font-semibold text-text-primary">
          {token.symbol.slice(0, 2)}
        </div>
        <div>
          <div className="text-sm font-medium text-text-primary">{token.symbol}</div>
          <div className="text-xs text-text-secondary">{token.name}</div>
        </div>
      </div>

      <Price value={token.currentPrice} />

      <div className={`text-sm font-mono ${changeCls}`}>
        {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
      </div>

      <div className="text-sm font-mono text-text-primary">
        ${(token.volume24h / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })}k
      </div>
    </div>
  )
})
