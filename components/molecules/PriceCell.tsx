'use client'

import { memo, useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { formatCurrency } from '@/lib/utils'

interface PriceCellProps {
  price: number
  direction?: 'up' | 'down' | 'neutral'
  lastUpdateTime?: number
}

/**
 * PriceCell - Displays price with animated flash on change
 * Shows green flash for price increases, red for decreases
 */
export const PriceCell = memo(function PriceCell({
  price,
  direction = 'neutral',
  lastUpdateTime,
}: PriceCellProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (direction !== 'neutral' && lastUpdateTime) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 600)
      return () => clearTimeout(timer)
    }
  }, [direction, lastUpdateTime])

  return (
    <div
      className={cn(
        'font-mono text-text-primary font-medium transition-smooth rounded px-2 py-1',
        isAnimating && direction === 'up' && 'animate-price-up',
        isAnimating && direction === 'down' && 'animate-price-down'
      )}
    >
      {formatCurrency(price, { decimals: 2 })}
    </div>
  )
})
