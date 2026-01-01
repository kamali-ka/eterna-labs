'use client'

import { Folder, Wallet, Globe, TrendingUp } from 'lucide-react'
import { useState } from 'react'

/**
 * Bottom Status Bar - Axiom Style
 * Shows presets, shortcuts, balance, and connection status
 */
export function BottomStatusBar() {
  const [activePreset, setActivePreset] = useState(1)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-bg-secondary border-t border-border-default">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left: Presets and Shortcuts */}
        <div className="flex items-center gap-3">
          {/* PRESET 1 */}
          <button
            onClick={() => setActivePreset(1)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth ${
              activePreset === 1
                ? 'bg-blue-500 text-black'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            PRESET 1
          </button>

          {/* Folder with count */}
          <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth">
            <Folder className="h-3.5 w-3.5" />
            <span>1</span>
            <div className="flex items-center gap-0.5">
              <span>=</span>
              <span>0</span>
            </div>
          </button>

          {/* Wallet */}
          <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth">
            <Wallet className="h-3.5 w-3.5" />
            <span>Wallet</span>
          </button>

          {/* Twitter */}
          <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Twitter</span>
          </button>

          {/* Discover */}
          <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span>Discover</span>
          </button>

          {/* Pulse */}
          <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Pulse</span>
          </button>

          {/* PnL */}
          <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
            <span>PnL</span>
          </button>

          {/* Color Picker */}
          <div className="flex items-center gap-1 ml-2">
            <button className="w-5 h-5 rounded-full bg-red-500 border-2 border-border-default hover:scale-110 transition-transform" />
            <button className="w-5 h-5 rounded-full bg-green-500 border-2 border-border-default hover:scale-110 transition-transform" />
            <button className="w-5 h-5 rounded-full bg-blue-500 border-2 border-border-default hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Center: Balance */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-bg-tertiary border border-border-default rounded-lg">
          <div className="flex items-center gap-1">
            <span className="text-xs text-text-tertiary">=</span>
            <span className="text-sm font-semibold text-green-500">$124.26</span>
          </div>
        </div>

        {/* Right: Connection Status + Global */}
        <div className="flex items-center gap-3">
          {/* Connection Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-400">Connection is stable</span>
          </div>

          {/* GLOBAL Dropdown */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary border border-border-default rounded-lg hover:bg-bg-hover transition-smooth">
            <Globe className="h-3.5 w-3.5 text-text-secondary" />
            <span className="text-xs font-medium text-text-primary">GLOBAL</span>
            <svg className="h-3 w-3 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Icons */}
          <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
            <svg className="h-4 w-4 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          </button>

          <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
            <svg className="h-4 w-4 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
            <svg className="h-4 w-4 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6" />
              <path d="m4.22 4.22 4.24 4.24m5.08 5.08 4.24 4.24" />
              <path d="M1 12h6m6 0h6" />
              <path d="m4.22 19.78 4.24-4.24m5.08-5.08 4.24-4.24" />
            </svg>
          </button>

          <button className="p-1.5 hover:bg-bg-hover rounded transition-smooth">
            <svg className="h-4 w-4 text-text-secondary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>

          <button className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-smooth">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Docs</span>
          </button>
        </div>
      </div>
    </div>
  )
}
