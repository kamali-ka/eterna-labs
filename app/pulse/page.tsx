'use client'

import { useEffect, useMemo } from 'react'
import { TokenTable } from '@/components/organisms/TokenTable'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectAllTokens, selectTokensLoading, setTokens } from '@/store/slices/tokensSlice'
import { selectSortConfig, setSortConfig } from '@/store/slices/filtersSlice'
import { usePriceUpdates } from '@/hooks/usePriceUpdates'
import { getMockTokens } from '@/lib/mockData'
import type { Token } from '@/types/token'

/**
 * Pulse Page - Main token discovery table
 * Features:
 * - Real-time price updates via WebSocket
 * - Sortable columns
 * - Virtual scrolling for performance
 * - Pixel-perfect dark theme design
 */
export default function PulsePage() {
  const dispatch = useAppDispatch()
  const tokens = useAppSelector(selectAllTokens)
  const loading = useAppSelector(selectTokensLoading)
  const sortConfig = useAppSelector(selectSortConfig)

  // Subscribe to real-time price updates
  usePriceUpdates()

  // Load initial data
  useEffect(() => {
    const mockTokens = getMockTokens()
    dispatch(setTokens(mockTokens))
  }, [dispatch])

  // Sort tokens based on current sort config
  const sortedTokens = useMemo(() => {
    if (!tokens.length) return []

    const sorted = [...tokens].sort((a, b) => {
      const aValue = a[sortConfig.field as keyof Token]
      const bValue = b[sortConfig.field as keyof Token]

      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      // Handle number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    return sorted
  }, [tokens, sortConfig])

  // Handle column sort
  const handleSort = (field: string) => {
    const newDirection =
      sortConfig.field === field && sortConfig.direction === 'desc' ? 'asc' : 'desc'

    dispatch(
      setSortConfig({
        field: field as keyof Token,
        direction: newDirection,
      })
    )
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Token Discovery
          </h1>
          <p className="text-text-secondary">
            Track new token launches with real-time price updates
          </p>
        </header>

        {/* Token Table */}
        <TokenTable
          tokens={sortedTokens}
          loading={loading}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>
    </main>
  )
}
