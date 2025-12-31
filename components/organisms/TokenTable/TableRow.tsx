'use client'

import { memo } from 'react'
import { MoreVertical } from 'lucide-react'
import { TokenCell } from '@/components/molecules/TokenCell'
import { PriceCell } from '@/components/molecules/PriceCell'
import { ChangeIndicator } from '@/components/molecules/ChangeIndicator'
import { VolumeCell } from '@/components/molecules/VolumeCell'
import { ChainBadge } from '@/components/molecules/ChainBadge'
import { PopoverRoot, PopoverTrigger, PopoverContent } from '@/components/atoms/Popover'
import { cn } from '@/lib/cn'
import { formatRelativeTime } from '@/lib/utils'
import type { Token } from '@/types/token'

interface TableRowProps {
  token: Token
  style?: React.CSSProperties
}

/**
 * TableRow - Memoized row component for token table
 * Only re-renders when token data changes
 */
export const TableRow = memo(
  function TableRow({ token, style }: TableRowProps) {
    return (
      <div
        style={style}
        className={cn(
          'grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 px-4 py-3',
          'border-b border-border-default hover:bg-bg-hover transition-smooth',
          'items-center'
        )}
      >
        {/* Token Info */}
        <TokenCell token={token} />

        {/* Price */}
        <PriceCell
          price={token.currentPrice}
          direction={token.lastPriceDirection}
          lastUpdateTime={token.lastUpdateTime}
        />

        {/* 24h Change */}
        <ChangeIndicator change={token.priceChange24h} />

        {/* Volume */}
        <VolumeCell volume={token.volume24h} />

        {/* Chain */}
        <div className="flex justify-end">
          <ChainBadge chain={token.chain} />
        </div>

        {/* Actions Menu */}
        <div className="flex justify-end">
          <PopoverRoot>
            <PopoverTrigger asChild>
              <button
                className="p-1 rounded hover:bg-bg-tertiary transition-smooth text-text-secondary hover:text-text-primary"
                aria-label="More options"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm mb-3">Token Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">Market Cap:</span>
                    <span className="font-mono text-text-primary">
                      ${(token.marketCap / 1_000_000).toFixed(2)}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">Launchpad:</span>
                    <span className="text-text-primary capitalize">
                      {token.launchpad || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">Listed:</span>
                    <span className="text-text-primary">
                      {formatRelativeTime(token.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </PopoverRoot>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Custom comparison for better performance
    return (
      prevProps.token.id === nextProps.token.id &&
      prevProps.token.currentPrice === nextProps.token.currentPrice &&
      prevProps.token.priceChange24h === nextProps.token.priceChange24h &&
      prevProps.token.volume24h === nextProps.token.volume24h &&
      prevProps.token.lastUpdateTime === nextProps.token.lastUpdateTime
    )
  }
)
