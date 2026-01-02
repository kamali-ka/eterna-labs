'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  ChevronDown,
  Star,
  Bell,
  Menu,
  X,
  Wallet,
  User,
  Home,
  Users,
  Coins
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { ExchangeModal } from '../Modals/ExchangeModal'

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
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false)

  return (
    <>
    <nav className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-border-default backdrop-blur-sm">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-14 gap-6">
          {/* Left Section: Logo + Navigation */}
          <div className="flex items-center gap-8 flex-1 min-w-0">
            {/* Logo - Triangle */}
            <Link href="/" className="flex items-center shrink-0">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2 L2 22 L22 22 Z" />
                </svg>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors whitespace-nowrap',
                      isActive
                        ? 'text-blue-500'
                        : 'text-white hover:text-blue-400'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right Section: Search Icon, Network, Actions */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 hover:bg-bg-hover rounded transition-smooth"
            >
              <Search className="h-5 w-5 text-white" />
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

            {/* Network Selector - SOL with blue lines icon */}
            <div className="relative">
              <button
                onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-bg-hover rounded-lg transition-smooth"
              >
                <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span className="text-sm font-medium text-white">SOL</span>
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
            <button
              onClick={() => setExchangeModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-smooth"
            >
              Deposit
            </button>

            {/* Watchlist Icon */}
            <div className="relative">
              <button
                onClick={() => setWatchlistOpen(!watchlistOpen)}
                className="p-1.5 hover:bg-bg-hover rounded transition-smooth"
              >
                <Star className="h-5 w-5 text-white" />
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
                className="p-1.5 hover:bg-bg-hover rounded transition-smooth"
              >
                <Bell className="h-5 w-5 text-white" />
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

            {/* Wallet Icon with "0" */}
            <button
              onClick={() => setWalletOpen(true)}
              className="flex items-center gap-1.5 px-2 py-1 hover:bg-bg-hover rounded transition-smooth"
            >
              <Wallet className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">=</span>
              <span className="text-sm font-semibold text-white">0</span>
            </button>

            {/* Wallet Popup */}
            <div className="relative">
              {walletOpen && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-[#1a1a1a] border border-border-default rounded-xl shadow-2xl z-50">
                  <div className="p-6">
                    {/* Total Value Section */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-text-secondary mb-2">Total Value</h3>
                      <div className="text-4xl font-bold text-white mb-4">$0</div>

                      {/* Solana and Perps Tabs */}
                      <div className="flex gap-3 mb-6">
                        <button className="flex items-center gap-2 px-4 py-2 bg-bg-tertiary border border-border-default rounded-lg hover:bg-bg-hover transition-smooth">
                          <Wallet className="h-4 w-4 text-white" />
                          <span className="text-sm font-medium text-white">Solana</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-bg-tertiary border border-border-default rounded-lg hover:bg-bg-hover transition-smooth">
                          <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                          </svg>
                          <span className="text-sm font-medium text-white">Perps</span>
                        </button>
                      </div>
                    </div>

                    {/* Balance Display */}
                    <div className="flex items-center justify-between mb-6 py-4 border-y border-border-default">
                      {/* Left: Blue Lines Icon with 0 */}
                      <div className="flex items-center gap-3">
                        <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                          <rect x="3" y="14" width="7" height="7" />
                        </svg>
                        <span className="text-2xl font-bold text-white">0</span>
                      </div>

                      {/* Center: Transfer Icon */}
                      <button className="p-2 hover:bg-bg-hover rounded-lg transition-smooth">
                        <svg className="h-5 w-5 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 16V4M7 4L3 8M7 4L11 8" />
                          <path d="M17 8V20M17 20L21 16M17 20L13 16" />
                        </svg>
                      </button>

                      {/* Right: Teal Coins Icon with 0 */}
                      <div className="flex items-center gap-3">
                        <Coins className="h-5 w-5 text-cyan-400" />
                        <span className="text-2xl font-bold text-white">0</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-smooth">
                        Deposit
                      </button>
                      <button className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#333333] border border-border-default text-white font-semibold text-sm rounded-lg transition-smooth">
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Coins with "0" and dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-1.5 px-2 py-1 hover:bg-bg-hover rounded transition-smooth"
              >
                <Coins className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white">0</span>
                <ChevronDown className="h-3.5 w-3.5 text-text-secondary" />
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

            {/* Pink Avatar */}
            <button className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-semibold text-sm hover:bg-pink-600 transition-smooth">
              SP
            </button>

            {/* User Icon */}
            <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
              <User className="h-5 w-5 text-white" />
            </button>

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
    {/* Exchange Modal - rendered outside nav to avoid z-index stacking issues */}
    <ExchangeModal
      isOpen={exchangeModalOpen}
      onClose={() => setExchangeModalOpen(false)}
    />
    </>
  )
}
