'use client'

import { useState } from 'react'
import { X, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/cn'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  activeSection: 'new' | 'final-stretch' | 'migrated'
}

/**
 * Axiom-style Filter Modal
 * Comprehensive filtering with Protocols, Audit, Metrics, and Socials tabs
 */
export function FilterModal({ isOpen, onClose, activeSection }: FilterModalProps) {
  const [activeTab, setActiveTab] = useState<'protocols' | 'audit' | 'metrics' | 'socials'>('protocols')
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>(['pump'])

  if (!isOpen) return null

  const protocols = [
    { id: 'pump', name: 'Pump', icon: '🚀', color: 'text-green-500' },
    { id: 'bags', name: 'Bags', icon: '💰', color: 'text-green-500' },
    { id: 'daos-fun', name: 'Daos.fun', icon: '🌊', color: 'text-blue-500' },
    { id: 'mayhem', name: 'Mayhem', icon: '🔴', color: 'text-red-500' },
    { id: 'moonshot', name: 'Moonshot', icon: '🌙', color: 'text-purple-500' },
    { id: 'candle', name: 'Candle', icon: '🕯️', color: 'text-orange-500' },
    { id: 'bonk', name: 'Bonk', icon: '🔥', color: 'text-orange-500' },
    { id: 'heaven', name: 'Heaven', icon: '⚪', color: 'text-gray-400' },
    { id: 'sugar', name: 'Sugar', icon: '🍭', color: 'text-pink-500' },
  ]

  const quoteTokens = [
    { id: 'sol', name: 'SOL', icon: '≡', color: 'text-purple-500' },
    { id: 'usdc', name: 'USDC', icon: '◉', color: 'text-blue-500' },
    { id: 'usdt', name: 'USDT', icon: '◉', color: 'text-yellow-500' },
  ]

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-bg-secondary border border-border-default rounded-lg shadow-2xl w-full max-w-2xl pointer-events-auto max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-default">
            <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-bg-hover rounded transition-smooth"
            >
              <X className="h-5 w-5 text-text-secondary" />
            </button>
          </div>

          {/* Section Tabs */}
          <div className="flex items-center gap-4 px-6 py-3 border-b border-border-default bg-bg-tertiary">
            <button
              onClick={() => {}}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded transition-smooth",
                activeSection === 'new'
                  ? "bg-bg-secondary text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              New Pairs
            </button>
            <button
              onClick={() => {}}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded transition-smooth border-b-2",
                activeSection === 'final-stretch'
                  ? "border-blue-500 text-text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              Final Stretch
            </button>
            <button
              onClick={() => {}}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded transition-smooth",
                activeSection === 'migrated'
                  ? "bg-bg-secondary text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              Migrated
            </button>

            {/* Reset icon */}
            <button className="ml-auto p-1.5 hover:bg-bg-hover rounded transition-smooth">
              <RotateCcw className="h-4 w-4 text-text-secondary" />
            </button>
          </div>

          {/* Search Keywords */}
          <div className="px-6 py-4 border-b border-border-default">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Search Keywords
                </label>
                <input
                  type="text"
                  placeholder="keyword1, keyword2..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Exclude Keywords
                </label>
                <input
                  type="text"
                  placeholder="keyword1, keyword2..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="flex items-center gap-2 px-6 py-3 bg-bg-tertiary/50">
            <button
              onClick={() => setActiveTab('protocols')}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-lg transition-smooth",
                activeTab === 'protocols'
                  ? "bg-bg-secondary text-text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
              )}
            >
              Protocols
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-lg transition-smooth",
                activeTab === 'audit'
                  ? "bg-bg-secondary text-text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
              )}
            >
              Audit
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-lg transition-smooth",
                activeTab === 'metrics'
                  ? "bg-bg-secondary text-text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
              )}
            >
              $ Metrics
            </button>
            <button
              onClick={() => setActiveTab('socials')}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-lg transition-smooth",
                activeTab === 'socials'
                  ? "bg-bg-secondary text-text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
              )}
            >
              Socials
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {activeTab === 'protocols' && (
              <div className="space-y-6">
                {/* Protocols */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-text-primary">Protocols</h3>
                    <button className="text-xs text-text-secondary hover:text-text-primary">
                      Unselect All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {protocols.map((protocol) => (
                      <button
                        key={protocol.id}
                        onClick={() => {
                          setSelectedProtocols(prev =>
                            prev.includes(protocol.id)
                              ? prev.filter(p => p !== protocol.id)
                              : [...prev, protocol.id]
                          )
                        }}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-smooth",
                          selectedProtocols.includes(protocol.id)
                            ? "bg-bg-hover border-border-focus"
                            : "border-border-default hover:border-border-focus"
                        )}
                      >
                        <span className={protocol.color}>{protocol.icon}</span>
                        <span className={cn(
                          selectedProtocols.includes(protocol.id) ? "text-text-primary" : "text-text-secondary"
                        )}>
                          {protocol.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quote Tokens */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-text-primary">Quote Tokens</h3>
                    <button className="text-xs text-text-secondary hover:text-text-primary">
                      Unselect All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quoteTokens.map((token) => (
                      <button
                        key={token.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-default hover:border-border-focus text-sm font-medium transition-smooth"
                      >
                        <span className={token.color}>{token.icon}</span>
                        <span className="text-text-secondary">{token.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="space-y-6">
                {/* Checkboxes */}
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border-default" />
                    <span className="text-sm text-text-primary">Dex Paid</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border-default" />
                    <span className="text-sm text-text-primary">CA ends in 'pump'</span>
                  </label>
                </div>

                {/* Recent Visitors */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Recent Visitors
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Age</label>
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>m</option>
                      <option>h</option>
                      <option>d</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Top 10 Holders % */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Top 10 Holders %
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Dev Holding % */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Dev Holding %
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Snipers % */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Snipers %
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Insiders % */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Insiders %
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Bundle % */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Bundle %
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Holders */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Holders
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Pro Traders */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Pro Traders
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 bg-bg-tertiary border border-border-default rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="text-center py-12 text-text-tertiary">
                <p className="text-sm">Metrics filters coming soon...</p>
              </div>
            )}

            {activeTab === 'socials' && (
              <div className="text-center py-12 text-text-tertiary">
                <p className="text-sm">Socials filters coming soon...</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border-default bg-bg-tertiary/50">
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth">
                Import
              </button>
              <button className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth">
                Export
              </button>
              <button className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth">
                Share
              </button>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm rounded-lg transition-smooth"
            >
              Apply All
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
