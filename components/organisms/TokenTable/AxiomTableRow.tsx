'use client'

import { memo } from 'react'
import { Zap } from 'lucide-react'
import { TokenCell } from '@/components/molecules/TokenCell'
import { PriceCell } from '@/components/molecules/PriceCell'
import { cn } from '@/lib/cn'
import { formatCurrency, formatCompactNumber } from '@/lib/utils'
import { Tooltip } from '@/components/atoms/Tooltip'
import type { Token } from '@/types/token'

interface AxiomTableRowProps {
  token: Token
  style?: React.CSSProperties
}

/**
 * Axiom-style table row with all metrics
 * Includes Quick Buy button with lightning icon
 */
export const AxiomTableRow = memo(
  function AxiomTableRow({ token, style }: AxiomTableRowProps) {
    const getRiskColor = (percent: number, threshold: number) => {
      if (percent > threshold) return 'text-red-500'
      if (percent > threshold * 0.7) return 'text-yellow-500'
      return 'text-green-500'
    }

    return (
      <div
        style={style}
        className={cn(
          'grid grid-cols-[2fr_0.8fr_1fr_1fr_1fr_1fr_1fr_0.7fr_0.7fr_0.7fr_0.5fr] gap-2 px-4 py-3',
          'border-b border-border-default hover:bg-bg-hover transition-smooth',
          'items-center'
        )}
      >
        {/* Token Info */}
        <TokenCell token={token} />

        {/* Age in minutes */}
        <div className="text-sm font-mono text-text-primary">
          {token.ageMinutes}m
        </div>

        {/* Price */}
        <PriceCell
          price={token.currentPrice}
          direction={token.lastPriceDirection}
          lastUpdateTime={token.lastUpdateTime}
        />

        {/* Market Cap */}
        <div className="text-sm font-mono text-text-primary text-right">
          {formatCompactNumber(token.marketCap)}
        </div>

        {/* Liquidity */}
        <div className="text-sm font-mono text-text-primary text-right">
          {formatCompactNumber(token.liquidity)}
        </div>

        {/* Volume */}
        <div className="text-sm font-mono text-text-primary text-right">
          {formatCompactNumber(token.volume24h)}
        </div>

        {/* Top 10 Holders % */}
        <Tooltip content={`Top 10 holders control ${token.top10HoldersPercent}% of supply`}>
          <div className={cn(
            'text-sm font-mono font-semibold text-right cursor-default',
            getRiskColor(token.top10HoldersPercent, 60)
          )}>
            {token.top10HoldersPercent.toFixed(1)}%
          </div>
        </Tooltip>

        {/* Dev Holding % */}
        <Tooltip content={`Developer holds ${token.devHoldingPercent}% of supply`}>
          <div className={cn(
            'text-sm font-mono font-semibold text-right cursor-default',
            getRiskColor(token.devHoldingPercent, 10)
          )}>
            {token.devHoldingPercent.toFixed(1)}%
          </div>
        </Tooltip>

        {/* Snipers % */}
        <Tooltip content={`Snipers/bots hold ${token.snipersPercent}% of supply`}>
          <div className={cn(
            'text-sm font-mono font-semibold text-right cursor-default',
            getRiskColor(token.snipersPercent, 10)
          )}>
            {token.snipersPercent.toFixed(1)}%
          </div>
        </Tooltip>

        {/* Insiders % */}
        <Tooltip content={`Insiders/team hold ${token.insidersPercent}% of supply`}>
          <div className={cn(
            'text-sm font-mono font-semibold text-right cursor-default',
            getRiskColor(token.insidersPercent, 15)
          )}>
            {token.insidersPercent.toFixed(1)}%
          </div>
        </Tooltip>

        {/* Quick Buy Button */}
        <div className="flex justify-end">
          <Tooltip content="Quick Buy">
            <button
              className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-smooth"
              onClick={() => console.log('Quick buy:', token.symbol)}
              aria-label={`Quick buy ${token.symbol}`}
            >
              <Zap className="h-4 w-4" fill="currentColor" />
            </button>
          </Tooltip>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.token.id === nextProps.token.id &&
      prevProps.token.currentPrice === nextProps.token.currentPrice &&
      prevProps.token.lastUpdateTime === nextProps.token.lastUpdateTime
    )
  }
)
