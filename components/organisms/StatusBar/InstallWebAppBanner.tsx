'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

/**
 * Install WebApp Banner
 * Appears at the bottom of mobile view prompting users to add to home screen
 */
export function InstallWebAppBanner() {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-[#0a0a0a] border-t border-border-default p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white mb-1">Install WebApp</h3>
          <p className="text-xs text-text-tertiary">Add Axiom Pulse to your home screen for quick access</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDismissed(true)}
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-smooth"
          >
            Dismiss
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-smooth">
            Add to Home Screen
          </button>
        </div>
      </div>
    </div>
  )
}
