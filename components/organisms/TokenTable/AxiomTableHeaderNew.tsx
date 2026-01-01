'use client'

import {
  Zap,
  LayoutGrid,
  Filter,
  ArrowUpDown
} from 'lucide-react'

/**
 * Axiom-style Table Header
 * Minimalist header with icons for quick actions
 */
export function AxiomTableHeaderNew() {
  return (
    <div className="sticky top-0 z-10 bg-bg-secondary border-b border-border-default">
      <div className="flex items-center justify-between px-3 py-2">
        {/* Left: Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Lightning bolt with count */}
          <button className="flex items-center gap-1.5 px-2 py-1 hover:bg-bg-hover rounded transition-smooth">
            <Zap className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-xs text-text-secondary">0</span>
          </button>

          {/* Grid view toggle */}
          <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
            <LayoutGrid className="h-3.5 w-3.5 text-text-secondary" />
          </button>

          {/* Preset filters: P1, P2, P3 */}
          <div className="flex items-center gap-1 ml-2">
            <button className="px-2 py-1 text-xs font-medium text-blue-500 hover:bg-bg-hover rounded transition-smooth">
              P1
            </button>
            <button className="px-2 py-1 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded transition-smooth">
              P2
            </button>
            <button className="px-2 py-1 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded transition-smooth">
              P3
            </button>
          </div>

          {/* Sort toggle */}
          <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
            <ArrowUpDown className="h-3.5 w-3.5 text-text-secondary" />
          </button>
        </div>

        {/* Right: Optional actions */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
            <Filter className="h-3.5 w-3.5 text-text-secondary" />
          </button>
        </div>
      </div>
    </div>
  )
}
