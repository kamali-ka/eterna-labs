'use client'

import { memo } from 'react'
import {
  Leaf,
  Link2,
  Search,
  Users,
  ArrowUp,
  ArrowDown,
  Flame,
  Equal,
  TrendingUp,
  TrendingDown,
  Shield,
  Crown
} from 'lucide-react'
import { Token } from '@/types/token'
import { cn } from '@/lib/cn'

interface AxiomTableRowNewProps {
  token: Token
  style?: React.CSSProperties
}

/**
 * Axiom-style Table Row
 * Pixel-perfect replica matching the screenshot
 */
export const AxiomTableRowNew = memo<AxiomTableRowNewProps>(({ token, style }) => {
  return (
    <div
      style={style}
      className="flex items-start gap-3 px-3 py-2 border-b border-border-default/50 hover:bg-bg-hover/30 transition-smooth group"
    >
      {/* Column 1: Token Image with Badge */}
      <div className="relative shrink-0">
        <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-yellow-500/50 bg-bg-tertiary">
          {token.logo ? (
            <img
              src={token.logo}
              alt={token.symbol}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-text-secondary">
              {token.symbol.charAt(0)}
            </div>
          )}
        </div>
        {/* Badge indicator (checkmark/crown) */}
        {token.hasBadge && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-bg-secondary flex items-center justify-center">
            <Crown className="h-3 w-3 text-white" />
          </div>
        )}
      </div>

      {/* Column 2: Main Content */}
      <div className="flex-1 min-w-0">
        {/* Row 1: Token Name, Age, Icons, Price, MC */}
        <div className="flex items-center gap-2 mb-1.5">
          {/* Token Name & Symbol */}
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-text-primary">{token.symbol}</span>
            <span className="text-sm text-text-tertiary truncate max-w-[120px]">
              {token.name}
            </span>
            {token.verified && (
              <Shield className="h-3 w-3 text-blue-500 shrink-0" />
            )}
          </div>

          {/* Vertical divider */}
          <div className="w-px h-4 bg-border-default" />

          {/* Price (V) */}
          <span className="text-xs text-text-tertiary">V</span>
          <span className="text-sm font-semibold text-text-primary">
            ${token.currentPrice < 1000
              ? token.currentPrice.toFixed(0)
              : `${(token.currentPrice / 1000).toFixed(1)}K`}
          </span>

          {/* Market Cap (MC) */}
          <span className="text-xs text-text-tertiary ml-2">MC</span>
          <span className="text-sm font-semibold text-blue-500">
            ${token.marketCap < 1000
              ? token.marketCap.toFixed(0)
              : token.marketCap < 1000000
              ? `${(token.marketCap / 1000).toFixed(1)}K`
              : `${(token.marketCap / 1000000).toFixed(1)}M`}
          </span>

          {/* Trending indicator */}
          <div className="ml-auto">
            {token.trendDirection === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : token.trendDirection === 'down' ? (
              <TrendingDown className="h-4 w-4 text-red-500" />
            ) : null}
          </div>
        </div>

        {/* Row 2: Age + Icon Row */}
        <div className="flex items-center gap-2 mb-1.5">
          {/* Age */}
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-bg-tertiary rounded">
            <span className="text-xs font-medium text-green-400">{token.ageDisplay}</span>
          </div>

          {/* Organic Growth (Leaf) */}
          {token.organicGrowth && (
            <Leaf className="h-3.5 w-3.5 text-green-500" />
          )}

          {/* Link */}
          {token.hasLink && (
            <Link2 className="h-3.5 w-3.5 text-text-secondary hover:text-text-primary cursor-pointer" />
          )}

          {/* Search */}
          {token.searchable && (
            <Search className="h-3.5 w-3.5 text-text-secondary hover:text-text-primary cursor-pointer" />
          )}

          {/* Holder count with user icon */}
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-text-secondary" />
            <span className="text-xs text-text-secondary">{token.holderCount}</span>
          </div>

          {/* Trend arrow */}
          {token.trendDirection === 'up' && (
            <ArrowUp className="h-3.5 w-3.5 text-green-500" />
          )}
          {token.trendDirection === 'down' && (
            <ArrowDown className="h-3.5 w-3.5 text-red-500" />
          )}

          {/* Fire count */}
          <div className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            <span className="text-xs text-text-secondary">{token.fireCount}</span>
          </div>

          {/* Equals value */}
          <div className="flex items-center gap-1">
            <Equal className="h-3.5 w-3.5 text-text-secondary" />
            <span className="text-xs text-text-secondary">{token.equalsValue.toFixed(2)}</span>
          </div>

          {/* TX count with indicator bar */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-text-tertiary">TX</span>
            <span className="text-xs font-medium text-text-secondary">{token.txCount}</span>
            <div className={cn(
              "w-8 h-1 rounded-full",
              token.txIndicator === 'up' ? "bg-green-500" :
              token.txIndicator === 'down' ? "bg-red-500" :
              "bg-gray-500"
            )} />
          </div>
        </div>

        {/* Row 3: Platform/Creator + Percentages */}
        <div className="flex items-center gap-3 text-xs">
          {/* Platform/Creator */}
          <div className="text-text-tertiary">
            {token.creatorAddress}
          </div>

          {/* Percentage indicators with icons */}
          <div className="flex items-center gap-2">
            {/* Percentage 1 */}
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-green-500" />
              <span className={cn(
                "font-medium",
                token.percentage1.color === 'green' ? "text-green-500" :
                token.percentage1.color === 'red' ? "text-red-500" :
                "text-text-tertiary"
              )}>
                {token.percentage1.value}%
              </span>
            </div>

            {/* Percentage 2 */}
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-blue-500" />
              <span className={cn(
                "font-medium",
                token.percentage2.color === 'green' ? "text-green-500" :
                token.percentage2.color === 'red' ? "text-red-500" :
                "text-text-tertiary"
              )}>
                {token.percentage2.value}%
              </span>
              {token.percentage2.period && (
                <span className="text-text-tertiary">{token.percentage2.period}</span>
              )}
            </div>

            {/* Percentage 3 */}
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className={cn(
                "font-medium",
                token.percentage3.color === 'green' ? "text-green-500" :
                token.percentage3.color === 'red' ? "text-red-500" :
                "text-text-tertiary"
              )}>
                {token.percentage3.value}%
              </span>
              {token.percentage3.period && (
                <span className="text-text-tertiary">{token.percentage3.period}</span>
              )}
            </div>

            {/* Percentage 4 */}
            <div className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-orange-500" />
              <span className={cn(
                "font-medium",
                token.percentage4.color === 'green' ? "text-green-500" :
                token.percentage4.color === 'red' ? "text-red-500" :
                "text-text-tertiary"
              )}>
                {token.percentage4.value}%
              </span>
            </div>

            {/* Additional metrics with icons */}
            <div className="flex items-center gap-1 text-blue-400">
              <span className="text-xs">0</span>
              <span className="text-xs">SOL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for memo optimization
  return (
    prevProps.token.id === nextProps.token.id &&
    prevProps.token.currentPrice === nextProps.token.currentPrice &&
    prevProps.token.lastUpdateTime === nextProps.token.lastUpdateTime
  )
})

AxiomTableRowNew.displayName = 'AxiomTableRowNew'
