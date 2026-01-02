'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TrendingUp, Star, Zap, BarChart3, User } from 'lucide-react'
import { cn } from '@/lib/cn'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    label: 'Trending',
    href: '/pulse',
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    label: 'Track',
    href: '/trackers',
    icon: <Star className="h-5 w-5" />
  },
  {
    label: 'Pulse',
    href: '/pulse',
    icon: <Zap className="h-6 w-6" />
  },
  {
    label: 'Perpetuals',
    href: '/perpetuals',
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    label: 'Account',
    href: '/account',
    icon: <User className="h-5 w-5" />
  }
]

/**
 * Mobile Bottom Navigation Bar
 * Matches Axiom Trade mobile design with 5 navigation items
 */
export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-border-default">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href
          const isPulse = item.label === 'Pulse'

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all',
                isPulse
                  ? 'bg-blue-600 hover:bg-blue-700 -mt-6'
                  : isActive
                  ? 'text-blue-500'
                  : 'text-text-secondary hover:text-white'
              )}
            >
              <div className={cn(
                'transition-colors',
                isPulse && 'text-white'
              )}>
                {item.icon}
              </div>
              <span className={cn(
                'text-[10px] font-medium',
                isPulse && 'text-white'
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
