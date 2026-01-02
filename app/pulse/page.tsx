'use client'

import { useEffect, useMemo, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import { AxiomTableHeaderNew } from '@/components/organisms/TokenTable/AxiomTableHeaderNew'
import { AxiomTableRowNew } from '@/components/organisms/TokenTable/AxiomTableRowNew'
import { MobileTokenCard } from '@/components/organisms/TokenTable/MobileTokenCard'
import { Skeleton } from '@/components/atoms/Skeleton'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectAllTokens, selectTokensLoading, setTokens } from '@/store/slices/tokensSlice'
import { selectSortConfig, setSortConfig } from '@/store/slices/filtersSlice'
import { usePriceUpdates } from '@/hooks/usePriceUpdates'
import { getMockTokens } from '@/lib/mockData'
import {
  Filter,
  ChevronDown,
  HelpCircle,
  List,
  Bookmark,
  Calendar,
  Volume2,
  Settings,
  Folder
} from 'lucide-react'
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
  loading,
  sectionId
}: {
  tokens: Token[]
  loading: boolean
  sectionId: string
}) {
  const parentRef = useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Increased height for new row design
    overscan: 5,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  // Get title based on sectionId
  const getTitle = (id: string) => {
    if (id === 'new') return 'New Pairs'
    if (id === 'final-stretch') return 'Final Stretch'
    return 'Migrated'
  }

  return (
    <div className="bg-bg-secondary rounded-lg border border-border-default overflow-hidden flex flex-col flex-1 min-h-0">
      {/* Desktop: Show table header */}
      <div className="hidden md:block">
        <AxiomTableHeaderNew title={getTitle(sectionId)} />
      </div>

      {/* Mobile: Show section title */}
      <div className="md:hidden px-4 py-3 border-b border-border-default">
        <h2 className="text-sm font-semibold text-white">{getTitle(sectionId)}</h2>
      </div>

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
        >
          {/* Desktop: Virtual scrolling table */}
          <div className="hidden md:block">
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                position: 'relative',
              }}
            >
              {virtualItems.map((virtualRow) => {
                const token = tokens[virtualRow.index]
                return (
                  <AxiomTableRowNew
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

          {/* Mobile: Card list */}
          <div className="md:hidden">
            {tokens.map((token) => (
              <MobileTokenCard key={token.id} token={token} />
            ))}
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
    <main className="min-h-screen md:h-screen bg-bg-primary md:overflow-hidden flex flex-col md:pb-12">
      <div className="w-full max-w-full px-2 sm:px-4 py-4 flex-1 flex flex-col md:overflow-hidden">
        {/* Page Header - Axiom Style (Desktop only) */}
        <header className="mb-4 flex-shrink-0 hidden md:block">
          <div className="flex items-center justify-between">
            {/* Left: Title + Icon Buttons */}
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">Pulse</h1>

              {/* Icon Buttons */}
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
                  <List className="h-4 w-4 text-blue-500" />
                </button>
                <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
                  <svg className="h-4 w-4 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Action Icons + Display Dropdown */}
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
                <HelpCircle className="h-4 w-4 text-text-secondary" />
              </button>

              {/* Display Dropdown */}
              <button className="flex items-center gap-2 px-3 py-1.5 bg-bg-secondary border border-border-default rounded-lg hover:bg-bg-hover transition-smooth">
                <List className="h-4 w-4 text-text-secondary" />
                <span className="text-sm text-text-primary">Display</span>
                <ChevronDown className="h-3.5 w-3.5 text-text-secondary" />
              </button>

              <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
                <Bookmark className="h-4 w-4 text-text-secondary" />
              </button>

              <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
                <Calendar className="h-4 w-4 text-text-secondary" />
              </button>

              <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
                <Volume2 className="h-4 w-4 text-text-secondary" />
              </button>

              <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
                <Settings className="h-4 w-4 text-text-secondary" />
              </button>

              {/* Folder with dropdown */}
              <button className="flex items-center gap-1.5 px-2 py-1.5 bg-bg-secondary border border-border-default rounded-lg hover:bg-bg-hover transition-smooth">
                <Folder className="h-4 w-4 text-text-secondary" />
                <span className="text-xs text-text-primary">1</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-text-tertiary">=</span>
                  <span className="text-xs text-text-primary">0</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-text-secondary" />
              </button>
            </div>
          </div>
        </header>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-4 mx-auto bg-bg-secondary border border-border-default rounded-lg p-4 sm:p-6 flex-shrink-0">
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

        {/* All Three Sections in Same Row - Desktop: 3 columns, Mobile: Stacked */}
        <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 w-full flex-1 md:min-h-0">
          {sections.map((section) => {
            const sectionTokens = getSectionTokens(section.status)

            return (
              <section key={section.status} className="min-w-0 flex flex-col md:min-h-0">
                {/* Section Table with Independent Scrollbar */}
                <TokenSectionTable
                  tokens={sectionTokens}
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
