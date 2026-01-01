'use client'

import { useEffect, useMemo, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import { AxiomTableHeader } from '@/components/organisms/TokenTable/AxiomTableHeader'
import { AxiomTableRow } from '@/components/organisms/TokenTable/AxiomTableRow'
import { Skeleton } from '@/components/atoms/Skeleton'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectAllTokens, selectTokensLoading, setTokens } from '@/store/slices/tokensSlice'
import { selectSortConfig, setSortConfig } from '@/store/slices/filtersSlice'
import { usePriceUpdates } from '@/hooks/usePriceUpdates'
import { getMockTokens } from '@/lib/mockData'
import { Filter, ChevronDown } from 'lucide-react'
import type { Token, TokenStatus } from '@/types/token'

interface TokenSection {
  status: TokenStatus
  title: string
  description: string
}

interface DisplayFilters {
  ageMin: number
  ageMax: number
  top10HoldersMax: number
  devHoldingMax: number
  snipersMax: number
  insidersMax: number
  liquidityMin: number
  volumeMin: number
  marketCapMin: number
}

/**
 * Token Section Component
 * Displays a filtered list of tokens by status with independent virtual scrolling
 */
function TokenSectionTable({
  tokens,
  sortConfig,
  onSort,
  loading,
  sectionId
}: {
  tokens: Token[]
  sortConfig: { field: keyof Token; direction: 'asc' | 'desc' }
  onSort: (field: string) => void
  loading: boolean
  sectionId: string
}) {
  const parentRef = useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  return (
    <div className="bg-bg-secondary rounded-lg border border-border-default overflow-hidden flex flex-col h-full">
      <AxiomTableHeader sortConfig={sortConfig} onSort={onSort} />

      {loading ? (
        <div className="p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-12 flex-1" />
            </div>
          ))}
        </div>
      ) : tokens.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-text-tertiary">
          <p className="text-sm">No tokens found in this category</p>
        </div>
      ) : (
        <div
          ref={parentRef}
          className="overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-border-default scrollbar-track-bg-tertiary"
          style={{ height: 'calc(100vh - 350px)', minHeight: '400px' }}
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
                <AxiomTableRow
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
      )}

      <div className="px-4 py-3 border-t border-border-default bg-bg-tertiary">
        <p className="text-xs text-text-tertiary">
          {tokens.length} token{tokens.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}

/**
 * Axiom Pulse Page - Pixel-perfect replica
 * All three sections (New Pairs, Final Stretch, Migrated) displayed simultaneously
 * Each section loads asynchronously with independent scrollbars
 */
export default function AxiomPulsePage() {
  const dispatch = useAppDispatch()
  const tokens = useAppSelector(selectAllTokens)
  const loading = useAppSelector(selectTokensLoading)
  const sortConfig = useAppSelector(selectSortConfig)

  // Display filters state
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<DisplayFilters>({
    ageMin: 0,
    ageMax: 1440,
    top10HoldersMax: 100,
    devHoldingMax: 100,
    snipersMax: 100,
    insidersMax: 100,
    liquidityMin: 0,
    volumeMin: 0,
    marketCapMin: 0,
  })

  // Subscribe to real-time price updates
  usePriceUpdates()

  // Load initial data
  useEffect(() => {
    const mockTokens = getMockTokens()
    dispatch(setTokens(mockTokens))
  }, [dispatch])

  // Define sections
  const sections: TokenSection[] = [
    {
      status: 'new',
      title: 'New Pairs',
      description: 'Recently created tokens you can catch at launch'
    },
    {
      status: 'final-stretch',
      title: 'Final Stretch',
      description: 'Tokens close to completing their bonding curve and ready to migrate to Raydium'
    },
    {
      status: 'migrated',
      title: 'Migrated to Raydium',
      description: 'Tokens that have just migrated and may experience heightened liquidity'
    },
  ]

  // Apply display filters to tokens
  const applyFilters = (token: Token): boolean => {
    return (
      token.ageMinutes >= filters.ageMin &&
      token.ageMinutes <= filters.ageMax &&
      token.top10HoldersPercent <= filters.top10HoldersMax &&
      token.devHoldingPercent <= filters.devHoldingMax &&
      token.snipersPercent <= filters.snipersMax &&
      token.insidersPercent <= filters.insidersMax &&
      token.liquidity >= filters.liquidityMin &&
      token.volume24h >= filters.volumeMin &&
      token.marketCap >= filters.marketCapMin
    )
  }

  // Filter and sort tokens for each section independently
  const getSectionTokens = (status: TokenStatus) => {
    const filtered = tokens
      .filter((token) => token.status === status)
      .filter(applyFilters)

    if (!filtered.length) return []

    return [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.field as keyof Token]
      const bValue = b[sortConfig.field as keyof Token]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      ageMin: 0,
      ageMax: 1440,
      top10HoldersMax: 100,
      devHoldingMax: 100,
      snipersMax: 100,
      insidersMax: 100,
      liquidityMin: 0,
      volumeMin: 0,
      marketCapMin: 0,
    })
  }

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
    <main className="min-h-screen bg-bg-primary pt-4 overflow-x-hidden">
      <div className="w-full max-w-full px-2 sm:px-4 py-6">
        {/* Header */}
        <header className="mb-6 mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Pulse
              </h1>
              <p className="text-text-secondary text-sm">
                Monitor pump.fun tokens across their lifecycle - all sections update in real-time
              </p>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border-default rounded-lg hover:bg-bg-hover transition-smooth text-text-primary"
            >
              <Filter className="h-4 w-4" />
              Display Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </header>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 mx-auto bg-bg-secondary border border-border-default rounded-lg p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Age Range */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Age (minutes)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={filters.ageMin}
                    onChange={(e) => setFilters({ ...filters, ageMin: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 bg-bg-tertiary border border-border-default rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min"
                  />
                  <span className="text-text-tertiary">-</span>
                  <input
                    type="number"
                    value={filters.ageMax}
                    onChange={(e) => setFilters({ ...filters, ageMax: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 bg-bg-tertiary border border-border-default rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Top 10 Holders Max */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Top 10 Holders % (max)
                </label>
                <input
                  type="number"
                  value={filters.top10HoldersMax}
                  onChange={(e) => setFilters({ ...filters, top10HoldersMax: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max %"
                />
              </div>

              {/* Dev Holding Max */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Dev Holding % (max)
                </label>
                <input
                  type="number"
                  value={filters.devHoldingMax}
                  onChange={(e) => setFilters({ ...filters, devHoldingMax: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max %"
                />
              </div>

              {/* Snipers Max */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Snipers % (max)
                </label>
                <input
                  type="number"
                  value={filters.snipersMax}
                  onChange={(e) => setFilters({ ...filters, snipersMax: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max %"
                />
              </div>

              {/* Insiders Max */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Insiders % (max)
                </label>
                <input
                  type="number"
                  value={filters.insidersMax}
                  onChange={(e) => setFilters({ ...filters, insidersMax: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max %"
                />
              </div>

              {/* Liquidity Min */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Liquidity (min $)
                </label>
                <input
                  type="number"
                  value={filters.liquidityMin}
                  onChange={(e) => setFilters({ ...filters, liquidityMin: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min liquidity"
                />
              </div>

              {/* Volume Min */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Volume (min $)
                </label>
                <input
                  type="number"
                  value={filters.volumeMin}
                  onChange={(e) => setFilters({ ...filters, volumeMin: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min volume"
                />
              </div>

              {/* Market Cap Min */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Market Cap (min $)
                </label>
                <input
                  type="number"
                  value={filters.marketCapMin}
                  onChange={(e) => setFilters({ ...filters, marketCapMin: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min market cap"
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border-default">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-smooth"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-smooth"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* All Three Sections in Same Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 w-full" style={{ height: 'calc(100vh - 280px)' }}>
          {sections.map((section) => {
            const sectionTokens = getSectionTokens(section.status)

            return (
              <section key={section.status} className="min-w-0 flex flex-col">
                {/* Section Header */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-text-primary mb-1 truncate">
                    {section.title}
                  </h2>
                  <p className="text-xs text-text-tertiary line-clamp-2">
                    {section.description}
                  </p>
                </div>

                {/* Section Table with Independent Scrollbar */}
                <TokenSectionTable
                  tokens={sectionTokens}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  loading={loading}
                  sectionId={section.status}
                />
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}
