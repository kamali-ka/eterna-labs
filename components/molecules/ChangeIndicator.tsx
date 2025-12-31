'use client'

import { memo } from 'react'
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatPercentage } from '@/lib/utils'

interface ChangeIndicatorProps {
  change: number
  showIcon?: boolean
}

/**
 * ChangeIndicator - Shows percentage change with color and icon
 * Green for positive, red for negative, gray for neutral
 */
export const ChangeIndicator = memo(function ChangeIndicator({
  change,
  showIcon = true,
}: ChangeIndicatorProps) {
  const isPositive = change > 0
  const isNegative = change < 0
  const isNeutral = change === 0

  const Icon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus

  return (
    <div
      className={cn(
        'flex items-center gap-1 font-mono text-sm font-medium',
        isPositive && 'text-green-500',
        isNegative && 'text-red-500',
        isNeutral && 'text-text-tertiary'
      )}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      <span>{formatPercentage(change)}</span>
    </div>
  )
})
