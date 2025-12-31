"use client"

import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', ...rest }: Props) {
  const base = 'px-3 py-1.5 rounded-md text-sm font-medium'
  const styles =
    variant === 'primary'
      ? 'bg-sky-600 text-white hover:bg-sky-700'
      : 'bg-transparent text-slate-700 hover:bg-slate-100'

  return <button className={`${base} ${styles} ${className}`} {...rest} />
}
