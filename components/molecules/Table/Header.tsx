"use client"

import React from 'react'

type Col = { key: string; label: string; className?: string }

export default function TableHeader({ cols }: { cols: Col[] }) {
  return (
    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center px-4 py-2 text-xs text-slate-600 border-b border-slate-100">
      {cols.map((c) => (
        <div key={c.key} className={c.className || ''}>
          {c.label}
        </div>
      ))}
    </div>
  )
}
