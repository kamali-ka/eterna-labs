'use client'

import { useState } from 'react'
import {
  Zap,
  LayoutGrid,
  ArrowUpDown,
  SlidersHorizontal
} from 'lucide-react'
import { FilterModal } from '../Filters/FilterModal'

interface AxiomTableHeaderNewProps {
  title: string
  sectionId: 'new' | 'final-stretch' | 'migrated'
}

/**
 * Axiom-style Table Header
 * Minimalist header with section title and icons for quick actions
 */
export function AxiomTableHeaderNew({ title, sectionId }: AxiomTableHeaderNewProps) {
  const [filterModalOpen, setFilterModalOpen] = useState(false)

  return (
    <>
      <div className="sticky top-0 z-10 bg-bg-secondary border-b border-border-default">
        <div className="flex items-center justify-between px-3 py-2.5">
          {/* Left: Section Title */}
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-1.5">
            {/* Lightning bolt with count */}
            <button className="flex items-center gap-1 px-1.5 py-1 hover:bg-bg-hover rounded transition-smooth">
              <Zap className="h-3.5 w-3.5 text-text-secondary" fill="currentColor" />
              <span className="text-xs text-text-secondary">0</span>
            </button>

            {/* Grid view toggle */}
            <button className="p-1 hover:bg-bg-hover rounded transition-smooth">
              <LayoutGrid className="h-3.5 w-3.5 text-text-secondary" />
            </button>

            {/* Preset filters: P1, P2, P3 */}
            <button className="px-1.5 py-0.5 text-xs font-medium text-blue-500 hover:bg-bg-hover rounded transition-smooth">
              P1
            </button>
            <button className="px-1.5 py-0.5 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded transition-smooth">
              P2
            </button>
            <button className="px-1.5 py-0.5 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded transition-smooth">
              P3
            </button>

            {/* Sort toggle */}
            <button className="p-1 hover:bg-bg-hover rounded transition-smooth">
              <ArrowUpDown className="h-3.5 w-3.5 text-text-secondary" />
            </button>

            {/* Filter icon */}
            <button
              onClick={() => setFilterModalOpen(true)}
              className="p-1 hover:bg-bg-hover rounded transition-smooth"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        activeSection={sectionId}
      />
    </>
  )
}
