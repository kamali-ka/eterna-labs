'use client'

import { memo } from 'react'
import {
  Leaf,
  Link2,
  Search,
  Users,
  ArrowUp,
  ArrowDown,
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
      className="flex items-start gap-2 px-2 py-1.5 border-b border-border-default/30 hover:bg-bg-hover/20 transition-smooth group"
    >
      {/* Column 1: Token Image with Badge */}
      <div className="relative shrink-0">
        <div className="w-[88px] h-[88px] rounded-md overflow-hidden border-2 border-border-default bg-bg-tertiary">
          {token.logo ? (
            <img
              src={token.logo}
              alt={token.symbol}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-bold text-text-secondary">
              {token.symbol.charAt(0)}
            </div>
          )}
        </div>
        {/* Badge indicator (checkmark/crown) */}
        {token.hasBadge && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-bg-secondary flex items-center justify-center">
            <Crown className="h-2.5 w-2.5 text-white" />
          </div>
        )}
      </div>

      {/* Column 2: Main Content */}
      <div className="flex-1 min-w-0 py-0.5">
        {/* Row 1: Token Name, Price, MC */}
        <div className="flex items-center gap-1.5 mb-1">
          {/* Token Name & Symbol */}
          <span className="text-sm font-bold text-text-primary">{token.symbol}</span>
          <span className="text-xs text-text-tertiary truncate max-w-[100px]">
            {token.name}
          </span>
          {token.verified && (
            <Shield className="h-2.5 w-2.5 text-blue-500 shrink-0" />
          )}

          {/* Price (V) */}
          <span className="text-[10px] text-text-tertiary ml-1">V</span>
          <span className="text-xs font-semibold text-text-primary">
            ${token.currentPrice < 1000
              ? token.currentPrice.toFixed(0)
              : `${(token.currentPrice / 1000).toFixed(1)}K`}
          </span>

          {/* Market Cap (MC) */}
          <span className="text-[10px] text-text-tertiary ml-1">MC</span>
          <span className="text-xs font-semibold text-blue-500">
            ${token.marketCap < 1000
              ? token.marketCap.toFixed(0)
              : token.marketCap < 1000000
              ? `${(token.marketCap / 1000).toFixed(2)}K`
              : `${(token.marketCap / 1000000).toFixed(1)}M`}
          </span>

          {/* Trending indicator */}
          <div className="ml-auto">
            {token.trendDirection === 'up' ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : token.trendDirection === 'down' ? (
              <TrendingDown className="h-3 w-3 text-red-500" />
            ) : null}
          </div>
        </div>

        {/* Row 2: Age + Icon Row */}
        <div className="flex items-center gap-1.5 mb-1">
          {/* Age */}
          <span className="text-[11px] font-medium text-green-400">{token.ageDisplay}</span>

          {/* Organic Growth (Leaf) */}
          {token.organicGrowth && (
            <Leaf className="h-3 w-3 text-green-500" />
          )}

          {/* Link */}
          {token.hasLink && (
            <Link2 className="h-3 w-3 text-text-secondary hover:text-text-primary cursor-pointer" />
          )}

          {/* Search */}
          {token.searchable && (
            <Search className="h-3 w-3 text-text-secondary hover:text-text-primary cursor-pointer" />
          )}

          {/* Holder count with user icon */}
          <Users className="h-3 w-3 text-text-secondary" />
          <span className="text-[10px] text-text-secondary">{token.holderCount}</span>

          {/* Trend arrow with fire icon */}
          {token.trendDirection === 'up' && (
            <ArrowUp className="h-3 w-3 text-green-500" />
          )}
          {token.trendDirection === 'down' && (
            <ArrowDown className="h-3 w-3 text-red-500" />
          )}
          <span className="text-[10px] text-text-secondary">{token.fireCount}</span>

          {/* Equals value */}
          <span className="text-[10px] text-text-tertiary">F</span>
          <span className="text-[10px] text-text-secondary">=</span>
          <span className="text-[10px] text-text-secondary">{token.equalsValue.toFixed(2)}</span>

          {/* TX count with indicator bar */}
          <span className="text-[10px] text-text-tertiary">TX</span>
          <span className="text-[10px] font-medium text-text-secondary">{token.txCount}</span>
          <div className={cn(
            "w-6 h-0.5 rounded-full",
            token.txIndicator === 'up' ? "bg-green-500" :
            token.txIndicator === 'down' ? "bg-red-500" :
            "bg-gray-500"
          )} />
        </div>

        {/* Row 3: Platform/Creator + Percentages */}
        <div className="flex items-center gap-2 text-[10px]">
          {/* Platform/Creator */}
          <span className="text-text-tertiary">{token.creatorAddress}</span>

          {/* Percentage indicators with icons */}
          {/* Percentage 1 */}
          <Users className="h-2.5 w-2.5 text-green-500" />
          <span className={cn(
            "font-medium",
            token.percentage1.color === 'green' ? "text-green-500" :
            token.percentage1.color === 'red' ? "text-red-500" :
            "text-text-tertiary"
          )}>
            {token.percentage1.value}%
          </span>

          {/* Percentage 2 */}
          <Shield className="h-2.5 w-2.5 text-blue-400" />
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

          {/* Percentage 3 */}
          <TrendingUp className="h-2.5 w-2.5 text-green-500" />
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

          {/* Percentage 4 */}
          <div className="flex items-center gap-0.5">
            <svg className="h-2.5 w-2.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className={cn(
              "font-medium",
              token.percentage4.color === 'green' ? "text-green-500" :
              token.percentage4.color === 'red' ? "text-red-500" :
              "text-text-tertiary"
            )}>
              {token.percentage4.value}%
            </span>
          </div>

          {/* SOL indicator */}
          <span className="text-blue-400">0 SOL</span>
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
