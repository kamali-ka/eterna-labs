'use client'

import { memo } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { SortConfig } from '@/types/token'

interface Column {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
}

interface AxiomTableHeaderProps {
  sortConfig?: SortConfig
  onSort?: (field: string) => void
}

/**
 * Axiom-style table header with all required columns
 * Matches the exact column structure from axiom.trade/pulse
 */
export const AxiomTableHeader = memo(function AxiomTableHeader({
  sortConfig,
  onSort,
}: AxiomTableHeaderProps) {
  const columns: Column[] = [
    { key: 'symbol', label: 'Token', sortable: true, align: 'left' },
    { key: 'ageMinutes', label: 'Age (mins)', sortable: true, align: 'left' },
    { key: 'currentPrice', label: 'Price', sortable: true, align: 'left' },
    { key: 'marketCap', label: 'Market Cap', sortable: true, align: 'right' },
    { key: 'liquidity', label: 'Liquidity', sortable: true, align: 'right' },
    { key: 'volume24h', label: 'Volume', sortable: true, align: 'right' },
    { key: 'top10HoldersPercent', label: 'Top 10 Holders %', sortable: true, align: 'right' },
    { key: 'devHoldingPercent', label: 'Dev %', sortable: true, align: 'right' },
    { key: 'snipersPercent', label: 'Snipers %', sortable: true, align: 'right' },
    { key: 'insidersPercent', label: 'Insiders %', sortable: true, align: 'right' },
    { key: 'actions', label: '', sortable: false, align: 'right' },
  ]

  const handleSort = (key: string, sortable?: boolean) => {
    if (sortable && onSort) {
      onSort(key)
    }
  }

  return (
    <div className="sticky top-0 z-10 bg-bg-secondary border-b border-border-default">
      <div className="grid grid-cols-[2fr_0.8fr_1fr_1fr_1fr_1fr_1fr_0.7fr_0.7fr_0.7fr_0.5fr] gap-2 px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wide">
        {columns.map((column) => {
          const isSorted = sortConfig?.field === column.key
          const isAsc = sortConfig?.direction === 'asc'

          return (
            <button
              key={column.key}
              onClick={() => handleSort(column.key, column.sortable)}
              disabled={!column.sortable}
              className={cn(
                'flex items-center gap-1 transition-smooth',
                column.align === 'right' && 'justify-end',
                column.align === 'center' && 'justify-center',
                column.sortable && 'cursor-pointer hover:text-text-primary',
                !column.sortable && 'cursor-default'
              )}
            >
              <span className="whitespace-nowrap">{column.label}</span>
              {column.sortable && (
                <span className="flex flex-col">
                  {isSorted && isAsc ? (
                    <ArrowUp className="h-3 w-3 text-text-primary" />
                  ) : isSorted ? (
                    <ArrowDown className="h-3 w-3 text-text-primary" />
                  ) : (
                    <div className="h-3 w-3" />
                  )}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
})
