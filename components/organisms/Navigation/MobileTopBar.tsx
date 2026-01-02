'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Bell, Search, User } from 'lucide-react'
import { cn } from '@/lib/cn'

interface MobileTopBarProps {
  onMenuClick?: () => void
}

/**
 * Mobile Top Bar
 * Compact header for mobile devices with hamburger menu, tabs, and user actions
 */
export function MobileTopBar({ onMenuClick }: MobileTopBarProps) {
  const [activeTab, setActiveTab] = useState<'new-pairs' | 'final-stretch'>('new-pairs')

  return (
    <div className="md:hidden sticky top-0 z-50 bg-[#0a0a0a] border-b border-border-default">
      {/* Top Row: Menu, Logo, Icons, User */}
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left: Hamburger Menu */}
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 hover:bg-bg-hover rounded-lg transition-smooth"
        >
          <Menu className="h-5 w-5 text-white" />
        </button>

        {/* Center: Logo (Pastie CA) */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2 L2 22 L22 22 Z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">Pastie CA</span>
        </div>

        {/* Right: Search, Notifications, User */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-bg-hover rounded-lg transition-smooth">
            <Search className="h-4 w-4 text-white" />
          </button>
          <button className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center">
            <span className="text-xs font-semibold text-white">SP</span>
          </button>
          <button className="p-2 -mr-2 hover:bg-bg-hover rounded-lg transition-smooth">
            <Menu className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Second Row: Tabs */}
      <div className="flex items-center gap-2 px-4 pb-2">
        <button
          onClick={() => setActiveTab('new-pairs')}
          className={cn(
            'px-4 py-1.5 text-xs font-medium rounded-full transition-smooth',
            activeTab === 'new-pairs'
              ? 'bg-bg-tertiary text-white'
              : 'text-text-secondary hover:text-white'
          )}
        >
          New Pairs
        </button>
        <button
          onClick={() => setActiveTab('final-stretch')}
          className={cn(
            'px-4 py-1.5 text-xs font-medium rounded-full transition-smooth',
            activeTab === 'final-stretch'
              ? 'bg-bg-tertiary text-white'
              : 'text-text-secondary hover:text-white'
          )}
        >
          Final Stretch
        </button>
        <button className="ml-auto p-1.5 hover:bg-bg-hover rounded-lg transition-smooth">
          <span className="text-xs text-text-secondary">M</span>
        </button>
        <button className="p-1.5 hover:bg-bg-hover rounded-lg transition-smooth">
          <span className="text-xs text-text-secondary">Pl</span>
        </button>
        <button className="p-1.5 hover:bg-bg-hover rounded-lg transition-smooth">
          <svg className="h-4 w-4 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </div>
  )
}
