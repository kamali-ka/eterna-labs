'use client'

import { useState } from 'react'
import { Twitter, Globe, MessageCircle, ThumbsUp, ThumbsDown, Star } from 'lucide-react'
import type { Token } from '@/types/token'
import { cn } from '@/lib/cn'

interface MobileTokenCardProps {
  token: Token
}

/**
 * Mobile Token Card
 * Compact card view for token display on mobile devices
 * Matches Axiom Trade mobile design
 */
export function MobileTokenCard({ token }: MobileTokenCardProps) {
  const [isStarred, setIsStarred] = useState(false)

  // Calculate percentages colors
  const getPercentageColor = (value: number) => {
    if (value > 0) return 'text-green-500'
    if (value < 0) return 'text-red-500'
    return 'text-text-tertiary'
  }

  // Format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toFixed(2)
  }

  return (
    <div className="bg-bg-secondary border-b border-border-default px-3 py-3">
      <div className="flex items-start gap-3">
        {/* Token Image */}
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-bg-tertiary">
          <img
            src={token.logoUrl || '/placeholder-token.png'}
            alt={token.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Row: Name + Social Icons + Price */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-white truncate">
                {token.name}
              </h3>
              <span className="text-xs text-text-tertiary">{token.symbol}</span>

              {/* Social Icons */}
              <div className="flex items-center gap-1.5 ml-auto">
                <button className="p-1 hover:bg-bg-hover rounded transition-smooth">
                  <Twitter className="h-3 w-3 text-blue-400" />
                </button>
                <button className="p-1 hover:bg-bg-hover rounded transition-smooth">
                  <Globe className="h-3 w-3 text-text-secondary" />
                </button>
                <button className="p-1 hover:bg-bg-hover rounded transition-smooth">
                  <MessageCircle className="h-3 w-3 text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Price + MC */}
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-semibold text-green-500">
                ${token.price.toFixed(4)}
              </div>
              <div className="text-[10px] text-text-tertiary">
                MC ${formatNumber(token.marketCap)}
              </div>
            </div>
          </div>

          {/* Middle Row: Vote Icons + Stats */}
          <div className="flex items-center gap-3 mb-2">
            {/* Vote Buttons */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-green-500 hover:bg-bg-hover px-1.5 py-0.5 rounded transition-smooth">
                <ThumbsUp className="h-3 w-3" />
                <span className="text-xs font-medium">0</span>
              </button>
              <button className="flex items-center gap-1 text-red-500 hover:bg-bg-hover px-1.5 py-0.5 rounded transition-smooth">
                <ThumbsDown className="h-3 w-3" />
                <span className="text-xs font-medium">0</span>
              </button>
              <button
                onClick={() => setIsStarred(!isStarred)}
                className="p-1 hover:bg-bg-hover rounded transition-smooth"
              >
                <Star
                  className={cn(
                    'h-3 w-3',
                    isStarred ? 'text-yellow-500 fill-yellow-500' : 'text-text-secondary'
                  )}
                />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-2.5 w-2.5',
                      i < 3 ? 'text-yellow-500 fill-yellow-500' : 'text-text-tertiary'
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] text-text-tertiary">9/10</span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-1 ml-auto">
              <MessageCircle className="h-3 w-3 text-text-secondary" />
              <span className="text-xs text-text-secondary">1</span>
            </div>
          </div>

          {/* Bottom Row: Percentage Stats + Pool Info */}
          <div className="flex items-center justify-between">
            {/* Percentage Stats */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-red-500 font-medium">75%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-red-500 font-medium">75%</span>
                <span className="text-[10px] text-text-tertiary">1h</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-red-500 font-medium">75%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-green-500 font-medium">0%</span>
                <span className="text-[10px] text-text-tertiary">24h</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-green-500 font-medium">0%</span>
                <span className="text-[10px] text-text-tertiary">3d</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-green-500 font-medium">0%</span>
              </div>
            </div>

            {/* Pool Info */}
            <div className="flex items-center gap-1 text-blue-500">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span className="text-xs font-medium">0 SOL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
