'use client'

import { useRef, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'
import { Skeleton } from '@/components/atoms/Skeleton'
import type { Token, SortConfig } from '@/types/token'

interface TokenTableProps {
  tokens: Token[]
  loading?: boolean
  sortConfig?: SortConfig
  onSort?: (field: string) => void
}

const columns = [
  { key: 'symbol', label: 'Token', sortable: true, align: 'left' as const },
  { key: 'currentPrice', label: 'Price', sortable: true, align: 'left' as const },
  { key: 'priceChange24h', label: '24h Change', sortable: true, align: 'left' as const },
  { key: 'volume24h', label: 'Volume', sortable: true, align: 'left' as const },
  { key: 'chain', label: 'Chain', sortable: true, align: 'right' as const },
  { key: 'actions', label: '', sortable: false, align: 'right' as const },
]

/**
 * TokenTable - High-performance virtualized table component
 * Features:
 * - Virtual scrolling for 1000s of rows
 * - Sortable columns
 * - Real-time price updates
 * - Memoized rows for optimal performance
 */
export function TokenTable({
  tokens,
  loading = false,
  sortConfig,
  onSort,
}: TokenTableProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  // Virtualization for performance
  const rowVirtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // Estimated row height in pixels
    overscan: 10, // Render extra rows above/below viewport
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-bg-secondary rounded-lg border border-border-default overflow-hidden">
        <TableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} />
        <div className="p-4 space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-12 flex-1" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Empty state
  if (tokens.length === 0) {
    return (
      <div className="bg-bg-secondary rounded-lg border border-border-default overflow-hidden">
        <TableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} />
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <p className="text-lg font-medium">No tokens found</p>
          <p className="text-sm mt-2">Try adjusting your filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bg-secondary rounded-lg border border-border-default overflow-hidden">
      <TableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} />

      {/* Virtualized Scroll Container */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {virtualItems.map((virtualRow) => {
            const token = tokens[virtualRow.index]
            return (
              <TableRow
                key={token.id}
                token={token}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Table Footer - Shows row count */}
      <div className="px-4 py-3 border-t border-border-default bg-bg-tertiary">
        <p className="text-xs text-text-tertiary">
          Showing {tokens.length} token{tokens.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
