'use client'

import { Settings, Star, BarChart3 } from 'lucide-react'

/**
 * Sub-Navbar Component
 * Displays below the main navbar with quick action icons
 */
export function SubNavbar() {
  return (
    <div className="sticky top-14 z-40 bg-[#0a0a0a] border-b border-border-default">
      <div className="w-full px-6 py-2">
        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-bg-hover rounded transition-smooth">
            <Settings className="h-3.5 w-3.5 text-text-secondary" />
          </button>
          <button className="p-1 hover:bg-bg-hover rounded transition-smooth">
            <Star className="h-3.5 w-3.5 text-text-secondary" />
          </button>
          <button className="p-1 hover:bg-bg-hover rounded transition-smooth">
            <BarChart3 className="h-3.5 w-3.5 text-text-secondary" />
          </button>
        </div>
      </div>
    </div>
  )
}
