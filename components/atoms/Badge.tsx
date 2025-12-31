"use client"

import React from 'react'

type Props = {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'danger'
}

export default function Badge({ children, variant = 'default' }: Props) {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium'
  const cls =
    variant === 'success'
      ? 'bg-success text-white'
      : variant === 'danger'
      ? 'bg-danger text-white'
      : 'bg-muted text-slate-800'

  return <span className={`${base} ${cls}`}>{children}</span>
}
