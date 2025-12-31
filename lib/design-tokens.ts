/**
 * Design System Tokens
 * Centralized design values matching Axiom Trade's dark theme
 */

export const colors = {
  // Background layers
  bg: {
    primary: '#0a0a0b',
    secondary: '#111113',
    tertiary: '#18181b',
    hover: '#1f1f23',
  },
  // Text colors
  text: {
    primary: '#fafafa',
    secondary: '#a1a1aa',
    tertiary: '#71717a',
    disabled: '#52525b',
  },
  // Accent colors
  accent: {
    green: '#22c55e',
    red: '#ef4444',
    blue: '#3b82f6',
    purple: '#a855f7',
    yellow: '#eab308',
  },
  // Borders
  border: {
    default: '#27272a',
    focus: '#3f3f46',
  },
} as const

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
} as const

export const typography = {
  family: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  size: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
  },
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const

export const borderRadius = {
  sm: '0.25rem',   // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  full: '9999px',
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
} as const
