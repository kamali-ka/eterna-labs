'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Star,
  Bell,
  Menu,
  X,
  Wallet,
  User,
  Home,
  Users
} from 'lucide-react'
import { cn } from '@/lib/cn'

interface NavItem {
  label: string
  href: string
  hasSubmenu?: boolean
}

interface Network {
  id: string
  name: string
  icon: string
  color: string
}

const navItems: NavItem[] = [
  { label: 'Discover', href: '/discover' },
  { label: 'Pulse', href: '/pulse' },
  { label: 'Trackers', href: '/trackers' },
  { label: 'Perpetuals', href: '/perpetuals' },
  { label: 'Yield', href: '/yield' },
  { label: 'Vision', href: '/vision', hasSubmenu: true },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Rewards', href: '/rewards' },
]

const networks: Network[] = [
  {
    id: 'solana',
    name: 'Solana',
    icon: 'SOL',
    color: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)' // Purple to green gradient
  },
  {
    id: 'bnb',
    name: 'BNB Chain',
    icon: 'BNB',
    color: '#F3BA2F'
  },
]

/**
 * Axiom Trade Navigation Bar
 * Pixel-perfect replica with responsive design and horizontal scroll carousel
 */
export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(networks[0])
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false)
  const [watchlistOpen, setWatchlistOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-bg-secondary border-b border-border-default backdrop-blur-sm bg-opacity-95">
      <div className="w-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left Section: Logo + Scrollable Navigation */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-text-primary hidden sm:block">
                Axiom
              </span>
            </Link>

            {/* Desktop Navigation with Horizontal Scroll Carousel */}
            <div className="hidden lg:flex items-center flex-1 min-w-0 relative group/nav">
              {/* Left Scroll Arrow - Shows on hover */}
              {showLeftArrow && (
                <button
                  onClick={() => scroll('left')}
                  className="absolute left-0 z-10 p-1.5 bg-bg-secondary border border-border-default rounded-lg hover:bg-bg-hover transition-all shadow-lg opacity-0 group-hover/nav:opacity-100"
                >
                  <ChevronLeft className="h-4 w-4 text-text-primary" />
                </button>
              )}

              {/* Scrollable Navigation Container */}
              <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex items-center gap-1 overflow-x-auto scrollbar-hide scroll-smooth px-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {navItems.map((item) => {
                  const isActive = pathname === item.href

                  return (
                    <div key={item.href} className="relative group shrink-0">
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap',
                          isActive
                            ? 'text-text-primary bg-bg-hover'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover/50'
                        )}
                      >
                        {item.label}
                        {item.hasSubmenu && (
                          <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>

                      {/* Submenu for Vision - shown on hover */}
                      {item.hasSubmenu && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-bg-secondary border border-border-default rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          <div className="p-2">
                            <Link
                              href="/vision/analytics"
                              className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth"
                            >
                              Analytics
                            </Link>
                            <Link
                              href="/vision/insights"
                              className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth"
                            >
                              Market Insights
                            </Link>
                            <Link
                              href="/vision/trends"
                              className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth"
                            >
                              Trending Data
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Right Scroll Arrow - Shows on hover */}
              {showRightArrow && (
                <button
                  onClick={() => scroll('right')}
                  className="absolute right-0 z-10 p-1.5 bg-bg-secondary border border-border-default rounded-lg hover:bg-bg-hover transition-all shadow-lg opacity-0 group-hover/nav:opacity-100"
                >
                  <ChevronRight className="h-4 w-4 text-text-primary" />
                </button>
              )}
            </div>
          </div>

          {/* Right Section: Search Icon, Network, Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Icon Only */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-bg-hover transition-smooth"
            >
              <Search className="h-5 w-5 text-text-secondary hover:text-text-primary transition-smooth" />
            </button>

            {/* Search Modal */}
            {searchOpen && (
              <div className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-20">
                <div className="bg-bg-secondary border border-border-default rounded-lg shadow-xl w-full max-w-2xl mx-4">
                  <div className="flex items-center px-4 py-3 border-b border-border-default">
                    <Search className="h-5 w-5 text-text-tertiary mr-3" />
                    <input
                      type="text"
                      placeholder="Search by token or CA..."
                      autoFocus
                      className="flex-1 bg-transparent text-text-primary placeholder:text-text-tertiary focus:outline-none"
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="p-1 hover:bg-bg-hover rounded transition-smooth ml-2"
                    >
                      <X className="h-5 w-5 text-text-secondary" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-text-tertiary text-center py-8">
                      Start typing to search for tokens...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Network Selector */}
            <div className="relative">
              <button
                onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
                className="flex items-center gap-2 p-2 hover:bg-bg-hover rounded-lg transition-smooth"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: selectedNetwork.color,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <span className="text-white drop-shadow-sm">{selectedNetwork.icon}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-text-secondary" />
              </button>

              {/* Network Dropdown */}
              {networkDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-bg-secondary border border-border-default rounded-lg shadow-lg">
                  <div className="p-2">
                    {networks.map((network) => (
                      <button
                        key={network.id}
                        onClick={() => {
                          setSelectedNetwork(network)
                          setNetworkDropdownOpen(false)
                        }}
                        className={cn(
                          'w-full flex items-center justify-center px-3 py-3 rounded-lg transition-smooth',
                          selectedNetwork.id === network.id
                            ? 'bg-bg-hover'
                            : 'hover:bg-bg-hover/50'
                        )}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            background: network.color,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <span className="text-white drop-shadow-sm">{network.icon}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Deposit Button */}
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black font-medium text-sm rounded-lg transition-smooth">
              Deposit
            </button>

            {/* Watchlist Icon */}
            <div className="relative">
              <button
                onClick={() => setWatchlistOpen(!watchlistOpen)}
                className="p-2 rounded-lg hover:bg-bg-hover transition-smooth relative"
              >
                <div className="w-9 h-9 rounded-full border border-border-default flex items-center justify-center bg-bg-tertiary hover:border-border-focus transition-smooth">
                  <Star className="h-4 w-4 text-text-secondary" />
                </div>
              </button>

              {/* Watchlist Popup */}
              {watchlistOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-bg-secondary border border-border-default rounded-lg shadow-lg">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-text-primary">Watchlist</h3>
                      <button
                        onClick={() => setWatchlistOpen(false)}
                        className="p-1 hover:bg-bg-hover rounded transition-smooth"
                      >
                        <X className="h-4 w-4 text-text-secondary" />
                      </button>
                    </div>
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-text-tertiary mx-auto mb-3" />
                      <p className="text-sm text-text-tertiary">No tokens in watchlist</p>
                      <p className="text-xs text-text-tertiary mt-1">
                        Add tokens to track them here
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Icon */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg hover:bg-bg-hover transition-smooth relative"
              >
                <Bell className="h-5 w-5 text-text-secondary" />
                {/* Notification Badge */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Popup */}
              {notificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-bg-secondary border border-border-default rounded-lg shadow-lg">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="p-1 hover:bg-bg-hover rounded transition-smooth"
                      >
                        <X className="h-4 w-4 text-text-secondary" />
                      </button>
                    </div>
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-text-tertiary mx-auto mb-3" />
                      <p className="text-sm text-text-tertiary">No new notifications</p>
                      <p className="text-xs text-text-tertiary mt-1">
                        You're all caught up
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wallet/Account Icon */}
            <button
              onClick={() => setWalletOpen(true)}
              className="p-2 rounded-lg hover:bg-bg-hover transition-smooth"
            >
              <Wallet className="h-5 w-5 text-text-secondary hover:text-text-primary transition-smooth" />
            </button>

            {/* Wallet Popup */}
            <div className="relative">
              {walletOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-bg-secondary border border-border-default rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-text-primary">Total Value</h3>
                      <button
                        onClick={() => setWalletOpen(false)}
                        className="p-1 hover:bg-bg-hover rounded transition-smooth"
                      >
                        <X className="h-4 w-4 text-text-secondary" />
                      </button>
                    </div>

                    {/* Balances */}
                    <div className="space-y-3 mb-4">
                      {/* Solana Balance */}
                      <div className="flex items-center justify-between py-2 border-b border-border-default">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{
                              background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                            }}
                          >
                            <span className="text-white text-[10px]">SOL</span>
                          </div>
                          <span className="text-sm text-text-primary font-medium">Solana</span>
                        </div>
                      </div>

                      {/* Perps */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm text-text-secondary">Perps</span>
                        <span className="text-sm font-semibold text-text-primary">$0</span>
                      </div>

                      {/* SOL */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm text-text-secondary">SOL</span>
                        <span className="text-sm font-semibold text-text-primary">0</span>
                      </div>

                      {/* USDC */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm text-text-secondary">USDC</span>
                        <span className="text-sm font-semibold text-text-primary">0</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black font-semibold text-sm rounded-lg transition-smooth">
                        Deposit
                      </button>
                      <button className="px-4 py-2 bg-bg-tertiary hover:bg-bg-hover border border-border-default text-text-primary font-semibold text-sm rounded-lg transition-smooth">
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Settings Icon */}
            <div className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="p-2 rounded-lg hover:bg-bg-hover transition-smooth relative"
              >
                <User className="h-5 w-5 text-text-secondary hover:text-text-primary transition-smooth" />
                {/* Green Active Indicator Dot */}
                <span className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border border-bg-secondary"></span>
              </button>

              {/* Account Popup */}
              {accountOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-bg-secondary border border-border-default rounded-lg shadow-lg">
                  <div className="p-2">
                    {/* Lobby */}
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-hover transition-smooth text-left">
                      <Home className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm text-text-primary font-medium">Lobby</span>
                    </button>

                    {/* Open Social Lobby */}
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-hover transition-smooth text-left">
                      <Users className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm text-text-primary font-medium">Open Social Lobby</span>
                    </button>

                    {/* Profile */}
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-hover transition-smooth text-left">
                      <User className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm text-text-primary font-medium">View Your Profile</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-bg-hover transition-smooth"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border-default py-4">
            {/* Mobile Navigation Items */}
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-smooth',
                      isActive
                        ? 'text-text-primary bg-bg-hover'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover/50'
                    )}
                  >
                    {item.label}
                    {item.hasSubmenu && (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Deposit Button */}
            <div className="mt-4 sm:hidden">
              <button className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-black font-medium text-sm rounded-lg transition-smooth">
                Deposit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdowns */}
      {(networkDropdownOpen || watchlistOpen || notificationsOpen || walletOpen || accountOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-[-1]"
          onClick={() => {
            setNetworkDropdownOpen(false)
            setWatchlistOpen(false)
            setNotificationsOpen(false)
            setWalletOpen(false)
            setAccountOpen(false)
          }}
        />
      )}
    </nav>
  )
}
