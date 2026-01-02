'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface ExchangeModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Exchange Modal - Deposit/Convert/Buy
 * Matches Axiom Trade design
 */
export function ExchangeModal({ isOpen, onClose }: ExchangeModalProps) {
  const [activeTab, setActiveTab] = useState<'convert' | 'deposit' | 'buy'>('deposit')

  // Apply blur to page content when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop - covers entire viewport */}
      <div className="fixed inset-0 bg-black/60 z-[100]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[101] w-full max-w-[340px] px-4">
        <div className="bg-[#1a1a1a] border border-border-default rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-default">
            <h2 className="text-sm font-semibold text-white">Exchange</h2>
            <button onClick={onClose} className="p-1 hover:bg-bg-hover rounded transition-smooth">
              <X className="h-3.5 w-3.5 text-text-secondary" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1.5 px-4 pt-2.5">
            <button
              onClick={() => setActiveTab('convert')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-smooth ${
                activeTab === 'convert'
                  ? 'bg-bg-tertiary text-white'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              Convert
            </button>
            <button
              onClick={() => setActiveTab('deposit')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-smooth ${
                activeTab === 'deposit'
                  ? 'bg-bg-tertiary text-white'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => setActiveTab('buy')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-smooth ${
                activeTab === 'buy'
                  ? 'bg-bg-tertiary text-white'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              Buy
            </button>
          </div>

          {/* Content */}
          <div className="px-4 py-4">
            {activeTab === 'deposit' && (
              <div className="space-y-3">
                {/* Network Selection */}
                <div className="flex items-center justify-between p-2.5 bg-bg-tertiary rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <span className="text-xs font-medium text-white">Solana</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-text-tertiary">Balance:</span>
                    <span className="text-xs font-semibold text-white ml-1.5">0 SOL</span>
                  </div>
                </div>

                {/* Warning */}
                <p className="text-[10px] text-text-tertiary leading-relaxed">
                  Only deposit Solana through the Solana network for this address.
                </p>

                {/* QR Code and Address */}
                <div className="flex gap-3 items-start">
                  {/* QR Code */}
                  <div className="w-24 h-24 bg-white rounded-lg p-1.5 flex items-center justify-center flex-shrink-0">
                    <div className="w-full h-full bg-white rounded flex items-center justify-center relative">
                      {/* Detailed QR Code Pattern */}
                      <svg className="w-full h-full" viewBox="0 0 29 29" fill="none">
                        {/* Top Left Corner Square */}
                        <rect x="0" y="0" width="7" height="7" fill="black" />
                        <rect x="1" y="1" width="5" height="5" fill="white" />
                        <rect x="2" y="2" width="3" height="3" fill="black" />

                        {/* Top Right Corner Square */}
                        <rect x="22" y="0" width="7" height="7" fill="black" />
                        <rect x="23" y="1" width="5" height="5" fill="white" />
                        <rect x="24" y="2" width="3" height="3" fill="black" />

                        {/* Bottom Left Corner Square */}
                        <rect x="0" y="22" width="7" height="7" fill="black" />
                        <rect x="1" y="23" width="5" height="5" fill="white" />
                        <rect x="2" y="24" width="3" height="3" fill="black" />

                        {/* Timing Pattern - Horizontal */}
                        <rect x="8" y="6" width="1" height="1" fill="black" />
                        <rect x="10" y="6" width="1" height="1" fill="black" />
                        <rect x="12" y="6" width="1" height="1" fill="black" />
                        <rect x="14" y="6" width="1" height="1" fill="black" />
                        <rect x="16" y="6" width="1" height="1" fill="black" />
                        <rect x="18" y="6" width="1" height="1" fill="black" />
                        <rect x="20" y="6" width="1" height="1" fill="black" />

                        {/* Timing Pattern - Vertical */}
                        <rect x="6" y="8" width="1" height="1" fill="black" />
                        <rect x="6" y="10" width="1" height="1" fill="black" />
                        <rect x="6" y="12" width="1" height="1" fill="black" />
                        <rect x="6" y="14" width="1" height="1" fill="black" />
                        <rect x="6" y="16" width="1" height="1" fill="black" />
                        <rect x="6" y="18" width="1" height="1" fill="black" />
                        <rect x="6" y="20" width="1" height="1" fill="black" />

                        {/* Data Pattern - Random dots to simulate QR code */}
                        <rect x="9" y="8" width="1" height="1" fill="black" />
                        <rect x="10" y="8" width="1" height="1" fill="black" />
                        <rect x="12" y="8" width="1" height="1" fill="black" />
                        <rect x="14" y="8" width="1" height="1" fill="black" />
                        <rect x="16" y="8" width="1" height="1" fill="black" />
                        <rect x="18" y="8" width="1" height="1" fill="black" />
                        <rect x="20" y="8" width="1" height="1" fill="black" />

                        <rect x="8" y="9" width="1" height="1" fill="black" />
                        <rect x="11" y="9" width="1" height="1" fill="black" />
                        <rect x="13" y="9" width="1" height="1" fill="black" />
                        <rect x="15" y="9" width="1" height="1" fill="black" />
                        <rect x="17" y="9" width="1" height="1" fill="black" />
                        <rect x="19" y="9" width="1" height="1" fill="black" />

                        <rect x="9" y="10" width="1" height="1" fill="black" />
                        <rect x="10" y="10" width="1" height="1" fill="black" />
                        <rect x="12" y="10" width="1" height="1" fill="black" />
                        <rect x="14" y="10" width="1" height="1" fill="black" />
                        <rect x="15" y="10" width="1" height="1" fill="black" />
                        <rect x="17" y="10" width="1" height="1" fill="black" />
                        <rect x="18" y="10" width="1" height="1" fill="black" />
                        <rect x="20" y="10" width="1" height="1" fill="black" />

                        <rect x="8" y="11" width="1" height="1" fill="black" />
                        <rect x="11" y="11" width="1" height="1" fill="black" />
                        <rect x="13" y="11" width="1" height="1" fill="black" />
                        <rect x="16" y="11" width="1" height="1" fill="black" />
                        <rect x="19" y="11" width="1" height="1" fill="black" />

                        <rect x="9" y="12" width="1" height="1" fill="black" />
                        <rect x="10" y="12" width="1" height="1" fill="black" />
                        <rect x="12" y="12" width="1" height="1" fill="black" />
                        <rect x="13" y="12" width="1" height="1" fill="black" />
                        <rect x="15" y="12" width="1" height="1" fill="black" />
                        <rect x="17" y="12" width="1" height="1" fill="black" />
                        <rect x="18" y="12" width="1" height="1" fill="black" />
                        <rect x="20" y="12" width="1" height="1" fill="black" />

                        {/* Center area with Solana icon overlay */}
                        <rect x="11" y="13" width="1" height="1" fill="black" />
                        <rect x="13" y="13" width="1" height="1" fill="black" />
                        <rect x="15" y="13" width="1" height="1" fill="black" />
                        <rect x="17" y="13" width="1" height="1" fill="black" />
                        <rect x="19" y="13" width="1" height="1" fill="black" />

                        <rect x="9" y="14" width="1" height="1" fill="black" />
                        <rect x="12" y="14" width="1" height="1" fill="black" />
                        <rect x="16" y="14" width="1" height="1" fill="black" />
                        <rect x="18" y="14" width="1" height="1" fill="black" />

                        <rect x="8" y="15" width="1" height="1" fill="black" />
                        <rect x="10" y="15" width="1" height="1" fill="black" />
                        <rect x="11" y="15" width="1" height="1" fill="black" />
                        <rect x="13" y="15" width="1" height="1" fill="black" />
                        <rect x="15" y="15" width="1" height="1" fill="black" />
                        <rect x="17" y="15" width="1" height="1" fill="black" />
                        <rect x="19" y="15" width="1" height="1" fill="black" />
                        <rect x="20" y="15" width="1" height="1" fill="black" />

                        <rect x="9" y="16" width="1" height="1" fill="black" />
                        <rect x="12" y="16" width="1" height="1" fill="black" />
                        <rect x="14" y="16" width="1" height="1" fill="black" />
                        <rect x="16" y="16" width="1" height="1" fill="black" />
                        <rect x="18" y="16" width="1" height="1" fill="black" />

                        <rect x="8" y="17" width="1" height="1" fill="black" />
                        <rect x="10" y="17" width="1" height="1" fill="black" />
                        <rect x="11" y="17" width="1" height="1" fill="black" />
                        <rect x="13" y="17" width="1" height="1" fill="black" />
                        <rect x="15" y="17" width="1" height="1" fill="black" />
                        <rect x="17" y="17" width="1" height="1" fill="black" />
                        <rect x="19" y="17" width="1" height="1" fill="black" />
                        <rect x="20" y="17" width="1" height="1" fill="black" />

                        <rect x="9" y="18" width="1" height="1" fill="black" />
                        <rect x="12" y="18" width="1" height="1" fill="black" />
                        <rect x="14" y="18" width="1" height="1" fill="black" />
                        <rect x="16" y="18" width="1" height="1" fill="black" />
                        <rect x="18" y="18" width="1" height="1" fill="black" />

                        <rect x="8" y="19" width="1" height="1" fill="black" />
                        <rect x="10" y="19" width="1" height="1" fill="black" />
                        <rect x="13" y="19" width="1" height="1" fill="black" />
                        <rect x="15" y="19" width="1" height="1" fill="black" />
                        <rect x="17" y="19" width="1" height="1" fill="black" />
                        <rect x="19" y="19" width="1" height="1" fill="black" />
                        <rect x="20" y="19" width="1" height="1" fill="black" />

                        <rect x="9" y="20" width="1" height="1" fill="black" />
                        <rect x="11" y="20" width="1" height="1" fill="black" />
                        <rect x="12" y="20" width="1" height="1" fill="black" />
                        <rect x="14" y="20" width="1" height="1" fill="black" />
                        <rect x="16" y="20" width="1" height="1" fill="black" />
                        <rect x="18" y="20" width="1" height="1" fill="black" />

                        {/* Bottom area */}
                        <rect x="8" y="22" width="1" height="1" fill="black" />
                        <rect x="10" y="22" width="1" height="1" fill="black" />
                        <rect x="12" y="22" width="1" height="1" fill="black" />
                        <rect x="14" y="22" width="1" height="1" fill="black" />
                        <rect x="16" y="22" width="1" height="1" fill="black" />
                        <rect x="18" y="22" width="1" height="1" fill="black" />
                        <rect x="20" y="22" width="1" height="1" fill="black" />

                        <rect x="9" y="23" width="1" height="1" fill="black" />
                        <rect x="11" y="23" width="1" height="1" fill="black" />
                        <rect x="13" y="23" width="1" height="1" fill="black" />
                        <rect x="15" y="23" width="1" height="1" fill="black" />
                        <rect x="17" y="23" width="1" height="1" fill="black" />
                        <rect x="19" y="23" width="1" height="1" fill="black" />

                        <rect x="8" y="24" width="1" height="1" fill="black" />
                        <rect x="10" y="24" width="1" height="1" fill="black" />
                        <rect x="12" y="24" width="1" height="1" fill="black" />
                        <rect x="14" y="24" width="1" height="1" fill="black" />
                        <rect x="16" y="24" width="1" height="1" fill="black" />
                        <rect x="18" y="24" width="1" height="1" fill="black" />
                        <rect x="20" y="24" width="1" height="1" fill="black" />

                        <rect x="9" y="25" width="1" height="1" fill="black" />
                        <rect x="11" y="25" width="1" height="1" fill="black" />
                        <rect x="13" y="25" width="1" height="1" fill="black" />
                        <rect x="15" y="25" width="1" height="1" fill="black" />
                        <rect x="17" y="25" width="1" height="1" fill="black" />
                        <rect x="19" y="25" width="1" height="1" fill="black" />

                        <rect x="8" y="26" width="1" height="1" fill="black" />
                        <rect x="10" y="26" width="1" height="1" fill="black" />
                        <rect x="12" y="26" width="1" height="1" fill="black" />
                        <rect x="14" y="26" width="1" height="1" fill="black" />
                        <rect x="16" y="26" width="1" height="1" fill="black" />
                        <rect x="18" y="26" width="1" height="1" fill="black" />
                        <rect x="20" y="26" width="1" height="1" fill="black" />

                        <rect x="22" y="8" width="1" height="1" fill="black" />
                        <rect x="23" y="8" width="1" height="1" fill="black" />
                        <rect x="24" y="8" width="1" height="1" fill="black" />
                        <rect x="25" y="8" width="1" height="1" fill="black" />
                        <rect x="26" y="8" width="1" height="1" fill="black" />

                        <rect x="22" y="9" width="1" height="1" fill="black" />
                        <rect x="24" y="9" width="1" height="1" fill="black" />
                        <rect x="26" y="9" width="1" height="1" fill="black" />

                        <rect x="22" y="10" width="1" height="1" fill="black" />
                        <rect x="23" y="10" width="1" height="1" fill="black" />
                        <rect x="25" y="10" width="1" height="1" fill="black" />
                        <rect x="26" y="10" width="1" height="1" fill="black" />
                      </svg>
                      {/* Solana Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-0.5 rounded">
                          <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[10px] font-medium text-text-secondary">Deposit Address</label>
                    <div className="flex items-start gap-1.5">
                      <div className="flex-1 p-2 bg-bg-tertiary rounded-lg text-[10px] text-white font-mono break-all leading-relaxed">
                        8PphWSU6ovuZUpkpis3gfp9gpCuhG8CX7e4GLwnZMkMX
                      </div>
                      <button className="p-1.5 bg-bg-tertiary hover:bg-bg-hover rounded-lg transition-smooth flex-shrink-0">
                        <svg className="h-3 w-3 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Buy Link */}
                <p className="text-[10px] text-text-tertiary">
                  Don't have any Solana?{' '}
                  <button className="text-blue-500 hover:text-blue-400 transition-smooth">
                    Buy through Onramper.
                  </button>
                </p>
              </div>
            )}

            {activeTab === 'convert' && (
              <div className="space-y-4">
                {/* Title */}
                <p className="text-sm text-text-tertiary">Swap SOL for BNB</p>

                {/* Converting Section */}
                <div className="p-4 bg-bg-tertiary rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-tertiary">Converting</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-text-tertiary">Balance:</span>
                      <span className="text-xs text-blue-500 font-semibold">0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      placeholder="0.0"
                      className="bg-transparent text-2xl font-semibold text-white outline-none flex-1 min-w-0"
                      defaultValue="0.0"
                    />
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-bg-secondary hover:bg-bg-hover rounded-lg transition-smooth flex-shrink-0">
                      <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                      <span className="text-sm font-medium text-white">SOL</span>
                      <svg className="h-3.5 w-3.5 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-xs text-text-tertiary">($0.70)</span>
                  </div>
                </div>

                {/* Swap Icon */}
                <div className="flex items-center justify-center -my-2">
                  <button className="p-2 bg-bg-tertiary hover:bg-bg-hover rounded-full transition-smooth">
                    <svg className="h-5 w-5 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 16V4M7 4L3 8M7 4L11 8" />
                      <path d="M17 8V20M17 20L21 16M17 20L13 16" />
                    </svg>
                  </button>
                </div>

                {/* Gaining Section */}
                <div className="p-4 bg-bg-tertiary rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-tertiary">Gaining</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-text-tertiary">Balance:</span>
                      <span className="text-xs text-blue-500 font-semibold">0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      placeholder="0.0"
                      className="bg-transparent text-2xl font-semibold text-white outline-none flex-1 min-w-0"
                      defaultValue="0.0"
                    />
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-bg-secondary hover:bg-bg-hover rounded-lg transition-smooth flex-shrink-0">
                      <div className="h-4 w-4 bg-yellow-500 rounded-sm flex items-center justify-center text-xs font-bold text-black">
                        B
                      </div>
                      <span className="text-sm font-medium text-white">BNB</span>
                      <svg className="h-3.5 w-3.5 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-xs text-text-tertiary">1 SOL ≈ 0.1471 BNB</span>
                  </div>
                </div>

                {/* Confirm Button */}
                <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-smooth">
                  Confirm
                </button>
              </div>
            )}

            {activeTab === 'buy' && (
              <div className="space-y-5">
                {/* Network Selection */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-blue-500 rounded-sm"></div>
                      <div className="w-1 h-3 bg-blue-500 rounded-sm"></div>
                      <div className="w-1 h-3 bg-blue-500 rounded-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-white">Solana</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-text-secondary">Balance:</span>
                    <span className="text-sm font-medium text-white ml-2">0 SOL</span>
                  </div>
                </div>

                {/* Buying Section */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Buying</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-text-secondary">SOL Price:</span>
                      <span className="text-sm text-white">128.71</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="0.0"
                      className="bg-transparent text-4xl font-light text-white outline-none flex-1"
                      defaultValue="0.0"
                    />
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-3 bg-blue-500 rounded-sm"></div>
                        <div className="w-1 h-3 bg-blue-500 rounded-sm"></div>
                        <div className="w-1 h-3 bg-blue-500 rounded-sm"></div>
                      </div>
                      <span className="text-lg font-medium text-white">SOL</span>
                    </div>
                  </div>
                </div>

                {/* Min/Max info */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-500">Minimum: 20 USD</span>
                  <span className="text-text-secondary">≈ 0 USD</span>
                </div>

                {/* Spacer for Onramper */}
                <div className="py-12"></div>

                {/* Powered by Onramper */}
                <div className="flex items-center justify-end gap-1.5 text-xs">
                  <span className="text-text-tertiary">powered by</span>
                  <span className="font-semibold text-white">Onramper</span>
                </div>

                {/* Buy Button */}
                <button className="w-full px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-lg transition-smooth">
                  Buy
                </button>
              </div>
            )}
          </div>

          {/* Footer - Only show Copy Address button for Deposit tab */}
          {activeTab === 'deposit' && (
            <div className="px-4 pb-4">
              <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-smooth">
                Copy Address
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
