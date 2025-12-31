'use client'

import { memo } from 'react'
import { Badge } from '@/components/atoms/Badge'
import type { ChainType } from '@/types/token'

interface ChainBadgeProps {
  chain: ChainType
}

/**
 * ChainBadge - Displays blockchain network badge with appropriate styling
 */
export const ChainBadge = memo(function ChainBadge({ chain }: ChainBadgeProps) {
  const chainStyles: Record<ChainType, 'success' | 'info' | 'purple' | 'warning'> = {
    SOL: 'purple',
    ETH: 'info',
    BASE: 'success',
    BTC: 'warning',
  }

  return (
    <Badge variant={chainStyles[chain]} size="sm">
      {chain}
    </Badge>
  )
})
