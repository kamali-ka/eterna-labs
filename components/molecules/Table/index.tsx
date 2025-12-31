"use client"

import React, { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
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

  const parentRef = useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 6
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  return (
    <section className="space-y-2">
      <TableHeader cols={cols} />

      <div ref={parentRef} className="overflow-auto" style={{ maxHeight: '60vh' }}>
        <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
          {virtualItems.map((virtualRow) => {
            const item = data[virtualRow.index]
            return (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                <TableRow token={item} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
