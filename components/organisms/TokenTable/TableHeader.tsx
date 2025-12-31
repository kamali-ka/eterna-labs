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

interface TableHeaderProps {
  columns: Column[]
  sortConfig?: SortConfig
  onSort?: (field: string) => void
}

/**
 * TableHeader - Sortable column headers for token table
 */
export const TableHeader = memo(function TableHeader({
  columns,
  sortConfig,
  onSort,
}: TableHeaderProps) {
  const handleSort = (key: string, sortable?: boolean) => {
    if (sortable && onSort) {
      onSort(key)
    }
  }

  return (
    <div className="sticky top-0 z-10 bg-bg-secondary border-b border-border-default">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 px-4 py-3 text-xs font-medium text-text-secondary uppercase tracking-wide">
        {columns.map((column) => {
          const isSorted = sortConfig?.field === column.key
          const isAsc = sortConfig?.direction === 'asc'

          return (
            <button
              key={column.key}
              onClick={() => handleSort(column.key, column.sortable)}
              disabled={!column.sortable}
              className={cn(
                'flex items-center gap-1.5 transition-smooth',
                column.align === 'right' && 'justify-end',
                column.align === 'center' && 'justify-center',
                column.sortable && 'cursor-pointer hover:text-text-primary',
                !column.sortable && 'cursor-default'
              )}
            >
              <span>{column.label}</span>
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
