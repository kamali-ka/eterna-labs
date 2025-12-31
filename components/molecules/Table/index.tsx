"use client"

import React from 'react'
import type { Token } from '../../../types/token'
import TableHeader from './Header'
import TableRow from './Row'

export default function Table({ data }: { data: Token[] }) {
  const cols = [
    { key: 'token', label: 'Token' },
    { key: 'price', label: 'Price' },
    { key: 'change', label: '24h' },
    { key: 'liq', label: 'Liquidity' }
  ]

  return (
    <section className="space-y-2">
      <TableHeader cols={cols} />

      <div className="space-y-2">
        {data.map((t) => (
          <TableRow key={t.id} token={t} />
        ))}
      </div>
    </section>
  )
}
