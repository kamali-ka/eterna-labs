'use client'

import { memo } from 'react'
import { Badge } from '@/components/atoms/Badge'
import { Tooltip } from '@/components/atoms/Tooltip'
import { truncateAddress } from '@/lib/utils'
import type { Token } from '@/types/token'

interface TokenCellProps {
  token: Token
}

/**
 * TokenCell - Displays token info with logo, symbol, and name
 * Memoized to prevent unnecessary re-renders
 */
export const TokenCell = memo(function TokenCell({ token }: TokenCellProps) {
  const statusVariant = {
    new: 'success' as const,
    'final-stretch': 'warning' as const,
    migrated: 'info' as const,
    graduated: 'purple' as const,
  }

  return (
    <div className="flex items-center gap-3">
      {/* Token Logo */}
      <div className="flex-shrink-0">
        {token.logo ? (
          <img
            src={token.logo}
            alt={token.symbol}
            className="h-10 w-10 rounded-full bg-bg-tertiary"
            loading="lazy"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary text-sm font-medium">
            {token.symbol.slice(0, 2)}
          </div>
        )}
      </div>

      {/* Token Info */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-text-primary truncate">
            {token.symbol}
          </span>
          <Badge variant={statusVariant[token.status]} size="sm">
            {token.status}
          </Badge>
        </div>
        <Tooltip content={`Contract: ${token.contractAddress}`}>
          <span className="text-xs text-text-secondary truncate">
            {token.name} · {truncateAddress(token.contractAddress, 4, 4)}
          </span>
        </Tooltip>
      </div>
    </div>
  )
})
