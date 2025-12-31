# Token Discovery Table - Step-by-Step Development Guide

## 📋 Project Overview
Building a pixel-perfect replica of Axiom Trade's token discovery table with extreme performance optimization and atomic architecture.

**Tech Stack:**
- Next.js 14 App Router + TypeScript (strict)
- Redux Toolkit + React Query
- Tailwind CSS + Radix UI/shadcn/ui
- React Virtual for table virtualization

**Performance Targets:**
- Lighthouse score ≥90 (mobile & desktop)
- Interactions <100ms
- Zero layout shifts
- Smooth 60fps animations

---

## 🏗️ Architecture Overview

```
eterna/
├── app/                      # Next.js App Router
│   ├── pulse/               # Token discovery page
│   └── layout.tsx           # Root layout with providers
├── components/              # Atomic Design Structure
│   ├── atoms/              # Smallest reusable units
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Skeleton.tsx
│   │   └── Spinner.tsx
│   ├── molecules/          # Combinations of atoms
│   │   ├── TokenCell.tsx
│   │   ├── PriceCell.tsx
│   │   ├── ChangeIndicator.tsx
│   │   └── TooltipWrapper.tsx
│   ├── organisms/          # Complex components
│   │   ├── TokenTable/
│   │   │   ├── index.tsx
│   │   │   ├── TableHeader.tsx
│   │   │   ├── TableRow.tsx
│   │   │   └── VirtualizedTable.tsx
│   │   └── FilterPanel/
│   └── templates/          # Page layouts
│       └── PulseLayout.tsx
├── hooks/                   # Custom React hooks
│   ├── useWebSocket.ts
│   ├── usePriceUpdates.ts
│   ├── useTableVirtualization.ts
│   └── useDebounce.ts
├── store/                   # Redux Toolkit
│   ├── index.ts
│   ├── slices/
│   │   ├── tokensSlice.ts
│   │   └── filtersSlice.ts
│   └── middleware/
│       └── websocketMiddleware.ts
├── lib/                     # Utilities
│   ├── queryClient.ts
│   ├── api.ts
│   └── utils.ts
├── types/                   # TypeScript definitions
│   ├── token.ts
│   └── api.ts
└── services/
    └── mockSocket.ts
```

---

## 🎯 STEP 1: Design System Foundation

### What to Build
Create a comprehensive design system matching Axiom Trade's dark theme with reusable tokens.

### Why
A solid design system ensures consistency, reduces code duplication, and makes the UI pixel-perfect.

### Folder Structure
```
lib/
  design-tokens.ts    # Colors, spacing, typography
  cn.ts               # Tailwind merge utility
styles/
  globals.css         # Tailwind base + custom properties
```

### Implementation

#### 1.1 Create Design Tokens

**File:** `lib/design-tokens.ts`
```typescript
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
  },
} as const
```

**Why these values:**
- Dark theme reduces eye strain for trading
- Monospace fonts ensure number alignment
- Spacing follows 4px grid for consistency

#### 1.2 Create Tailwind Utility

**File:** `lib/cn.ts`
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwindwind-merge'

/**
 * Merge Tailwind classes with clsx
 * Prevents class conflicts and enables conditional styling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### 1.3 Update Tailwind Config

**File:** `tailwind.config.cjs`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0b',
          secondary: '#111113',
          tertiary: '#18181b',
          hover: '#1f1f23',
        },
        text: {
          primary: '#fafafa',
          secondary: '#a1a1aa',
          tertiary: '#71717a',
        },
        accent: {
          green: '#22c55e',
          red: '#ef4444',
          blue: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      animation: {
        'price-up': 'price-flash-green 0.6s ease-out',
        'price-down': 'price-flash-red 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'price-flash-green': {
          '0%': { backgroundColor: 'rgba(34, 197, 94, 0.2)' },
          '100%': { backgroundColor: 'transparent' },
        },
        'price-flash-red': {
          '0%': { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
          '100%': { backgroundColor: 'transparent' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
```

#### 1.4 Global Styles

**File:** `styles/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-geist-sans: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-geist-mono: 'Geist Mono', 'IBM Plex Mono', monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  @apply bg-bg-primary text-text-primary font-sans antialiased;
  /* Prevent layout shift */
  overflow-y: scroll;
}

/* Custom scrollbar for dark theme */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-bg-secondary;
}

::-webkit-scrollbar-thumb {
  @apply bg-bg-tertiary rounded-md;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-bg-hover;
}

/* Smooth transitions for interactive elements */
@layer utilities {
  .transition-smooth {
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
}
```

### Best Practices
✅ **Do:**
- Use CSS variables for theme values
- Implement dark mode from the start
- Create custom animations for price changes
- Use consistent spacing scale

❌ **Don't:**
- Hardcode color values in components
- Mix spacing units (stick to rem)
- Use random animation durations
- Forget to test contrast ratios (WCAG AA minimum)

### Common Mistakes to Avoid
1. **Not using `twMerge`**: Tailwind classes can conflict (e.g., `p-4 p-2` → only `p-2` applies)
2. **Missing `antialiased`**: Text looks jagged on dark backgrounds
3. **No GPU acceleration**: Add `will-change` for frequently animated elements
4. **Layout shifts**: Reserve space for scrollbars with `overflow-y: scroll`

---

## 🎯 STEP 2: Type Definitions & Data Models

### What to Build
Comprehensive TypeScript types for tokens, price updates, and API responses.

### Why
Strong typing prevents runtime errors, improves autocomplete, and serves as documentation.

### Folder Structure
```
types/
  token.ts      # Token entity types
  api.ts        # API request/response types
  websocket.ts  # WebSocket message types
```

### Implementation

#### 2.1 Token Types

**File:** `types/token.ts`
```typescript
/**
 * Token status in lifecycle
 */
export type TokenStatus = 'new' | 'final-stretch' | 'migrated' | 'graduated'

/**
 * Blockchain network
 */
export type ChainType = 'SOL' | 'ETH' | 'BASE' | 'BTC'

/**
 * Core token entity
 * Represents a trading pair in the discovery table
 */
export interface Token {
  id: string                    // Unique identifier
  symbol: string                // e.g., "ETH"
  name: string                  // Full name
  contractAddress: string       // Blockchain address
  chain: ChainType              // Network
  status: TokenStatus           // Lifecycle stage

  // Price data
  currentPrice: number          // USD price
  priceChange24h: number        // % change (can be negative)
  volume24h: number             // 24h trading volume
  marketCap: number             // Total market cap

  // Metadata
  logo?: string                 // Token logo URL
  createdAt: string             // ISO 8601 timestamp
  launchpad?: string            // e.g., "pump.fun"

  // Real-time state (for animations)
  lastPriceDirection?: 'up' | 'down' | 'neutral'
  lastUpdateTime?: number       // Timestamp for transition detection
}

/**
 * Table sorting configuration
 */
export interface SortConfig {
  field: keyof Token
  direction: 'asc' | 'desc'
}

/**
 * Table filters
 */
export interface TokenFilters {
  status?: TokenStatus[]
  chain?: ChainType[]
  searchQuery?: string
  minVolume?: number
  maxVolume?: number
  priceChangeRange?: [number, number]
}

/**
 * Pagination state
 */
export interface PaginationState {
  page: number
  pageSize: number
  total: number
}
```

#### 2.2 API Types

**File:** `types/api.ts`
```typescript
import { Token, TokenFilters, SortConfig } from './token'

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: {
    code: string
    message: string
  }
  meta?: {
    timestamp: string
    requestId: string
  }
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

/**
 * Token list request params
 */
export interface GetTokensParams {
  filters?: TokenFilters
  sort?: SortConfig
  page?: number
  pageSize?: number
}

/**
 * Token list response
 */
export type GetTokensResponse = ApiResponse<PaginatedResponse<Token>>
```

#### 2.3 WebSocket Types

**File:** `types/websocket.ts`
```typescript
/**
 * WebSocket message types
 */
export type WSMessageType =
  | 'price_update'
  | 'new_token'
  | 'status_change'
  | 'volume_update'

/**
 * Base WebSocket message
 */
interface BaseWSMessage {
  type: WSMessageType
  timestamp: string
}

/**
 * Price update message
 */
export interface PriceUpdateMessage extends BaseWSMessage {
  type: 'price_update'
  payload: {
    tokenId: string
    price: number
    change24h: number
    volume24h: number
  }
}

/**
 * New token listed message
 */
export interface NewTokenMessage extends BaseWSMessage {
  type: 'new_token'
  payload: {
    token: Token
  }
}

/**
 * Token status change message
 */
export interface StatusChangeMessage extends BaseWSMessage {
  type: 'status_change'
  payload: {
    tokenId: string
    oldStatus: TokenStatus
    newStatus: TokenStatus
  }
}

/**
 * Union type of all WS messages
 */
export type WSMessage =
  | PriceUpdateMessage
  | NewTokenMessage
  | StatusChangeMessage

/**
 * WebSocket connection state
 */
export type WSConnectionState =
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error'
  | 'reconnecting'

/**
 * WebSocket hook return type
 */
export interface UseWebSocketReturn {
  connectionState: WSConnectionState
  lastMessage: WSMessage | null
  sendMessage: (message: any) => void
  reconnect: () => void
}
```

### Best Practices
✅ **Do:**
- Use strict TypeScript (`"strict": true`)
- Export interfaces for all data shapes
- Add JSDoc comments for complex types
- Use discriminated unions for message types
- Make optional fields explicit with `?`

❌ **Don't:**
- Use `any` type
- Create overly complex nested types
- Forget to export types
- Use enums (use const objects or literal unions instead)

### Common Mistakes
1. **Not using `readonly` for immutable data**: Add `readonly` to arrays/objects that shouldn't be mutated
2. **Missing null checks**: Use `field?: Type` or `field: Type | null` explicitly
3. **Overly generic types**: `Record<string, any>` loses type safety
4. **Not versioning API types**: Add version suffix for breaking changes (`TokenV2`)

---

## 🎯 STEP 3: Atomic Components

### What to Build
Highly reusable, accessible atomic components following Radix UI patterns.

### Why
Atomic components ensure consistency, reduce bundle size through reuse, and maintain accessibility standards.

### Folder Structure
```
components/atoms/
  Badge.tsx           # Status indicators
  Button.tsx          # Interactive buttons
  Skeleton.tsx        # Loading placeholders
  Spinner.tsx         # Loading indicators
  Tooltip.tsx         # Radix UI tooltip wrapper
  Popover.tsx         # Radix UI popover wrapper
```

### Implementation

#### 3.1 Badge Component

**File:** `components/atoms/Badge.tsx`
```typescript
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-smooth',
  {
    variants: {
      variant: {
        default: 'bg-bg-tertiary text-text-secondary',
        success: 'bg-accent-green/10 text-accent-green',
        danger: 'bg-accent-red/10 text-accent-red',
        warning: 'bg-yellow-500/10 text-yellow-500',
        info: 'bg-accent-blue/10 text-accent-blue',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

Badge.displayName = 'Badge'
```

**Why this approach:**
- `class-variance-authority` provides type-safe variants
- Consistent sizing across the app
- Easy to extend with new variants
- Full TypeScript autocomplete

#### 3.2 Skeleton Component

**File:** `components/atoms/Skeleton.tsx`
```typescript
import { cn } from '@/lib/cn'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'shimmer'
}

export function Skeleton({
  className,
  variant = 'shimmer',
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-md bg-bg-tertiary',
        variant === 'shimmer' && 'animate-shimmer bg-gradient-to-r from-bg-tertiary via-bg-hover to-bg-tertiary bg-[length:1000px_100%]',
        className
      )}
      {...props}
    />
  )
}

/**
 * Skeleton variants for common use cases
 */
export function SkeletonText({ className }: { className?: string }) {
  return <Skeleton className={cn('h-4 w-full', className)} />
}

export function SkeletonAvatar({ className }: { className?: string }) {
  return <Skeleton className={cn('h-10 w-10 rounded-full', className)} />
}

export function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn('h-10 w-24 rounded-lg', className)} />
}
```

**Performance note:** The shimmer animation uses CSS background-position, which is GPU-accelerated.

#### 3.3 Tooltip Component

**File:** `components/atoms/Tooltip.tsx`
```typescript
'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/cn'

const TooltipProvider = TooltipPrimitive.Provider

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md bg-bg-secondary px-3 py-1.5 text-sm text-text-primary shadow-lg',
      'animate-in fade-in-0 zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

/**
 * Simple tooltip wrapper for common use case
 *
 * @example
 * <Tooltip content="Click to copy">
 *   <button>Copy</button>
 * </Tooltip>
 */
export function Tooltip({
  children,
  content,
  delayDuration = 200,
  ...props
}: {
  children: React.ReactNode
  content: React.ReactNode
  delayDuration?: number
} & React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent {...props}>{content}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}

export { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent }
```

**Accessibility features:**
- Keyboard navigation support
- Screen reader friendly
- Auto-positioning to stay in viewport
- Customizable delay

### Best Practices
✅ **Do:**
- Use Radix UI primitives for accessibility
- Implement proper focus management
- Add loading states for async actions
- Use semantic HTML
- Memoize components that receive object props

❌ **Don't:**
- Create custom implementations of complex widgets
- Forget keyboard navigation
- Use `div` for interactive elements
- Inline large Tailwind class strings

### Common Mistakes
1. **Missing `forwardRef`**: Radix UI components need ref forwarding
2. **Not using `asChild`**: Prevents wrapper divs for composition
3. **Hardcoded z-index**: Use Tailwind utilities for consistent layering
4. **Missing `displayName`**: Helpful for React DevTools debugging

---

## 🎯 STEP 4: Custom Hooks

### What to Build
Performance-optimized React hooks for WebSocket connections, data fetching, and UI interactions.

### Why
Custom hooks encapsulate complex logic, enable reuse, and separate concerns from UI components.

### Folder Structure
```
hooks/
  useWebSocket.ts           # WebSocket connection management
  usePriceUpdates.ts        # Real-time price subscription
  useDebounce.ts            # Debounce user input
  useIntersectionObserver.ts # Lazy loading detection
  useMediaQuery.ts          # Responsive breakpoint detection
```

### Implementation

#### 4.1 WebSocket Hook

**File:** `hooks/useWebSocket.ts`
```typescript
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { WSMessage, WSConnectionState } from '@/types/websocket'

interface UseWebSocketOptions {
  url: string
  reconnectInterval?: number
  reconnectAttempts?: number
  onMessage?: (message: WSMessage) => void
  onOpen?: () => void
  onClose?: () => void
  onError?: (error: Event) => void
}

export function useWebSocket({
  url,
  reconnectInterval = 3000,
  reconnectAttempts = 5,
  onMessage,
  onOpen,
  onClose,
  onError,
}: UseWebSocketOptions) {
  const [connectionState, setConnectionState] = useState<WSConnectionState>('disconnected')
  const [lastMessage, setLastMessage] = useState<WSMessage | null>(null)

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectCountRef = useRef(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const connect = useCallback(() => {
    try {
      setConnectionState('connecting')
      const ws = new WebSocket(url)

      ws.onopen = () => {
        setConnectionState('connected')
        reconnectCountRef.current = 0
        onOpen?.()
      }

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as WSMessage
          setLastMessage(message)
          onMessage?.(message)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      ws.onclose = () => {
        setConnectionState('disconnected')
        onClose?.()

        // Auto-reconnect logic
        if (reconnectCountRef.current < reconnectAttempts) {
          setConnectionState('reconnecting')
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectCountRef.current++
            connect()
          }, reconnectInterval)
        }
      }

      ws.onerror = (error) => {
        setConnectionState('error')
        onError?.(error)
      }

      wsRef.current = ws
    } catch (error) {
      setConnectionState('error')
      console.error('WebSocket connection error:', error)
    }
  }, [url, reconnectInterval, reconnectAttempts, onMessage, onOpen, onClose, onError])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    wsRef.current?.close()
    wsRef.current = null
    setConnectionState('disconnected')
  }, [])

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket is not connected')
    }
  }, [])

  useEffect(() => {
    connect()
    return disconnect
  }, [connect, disconnect])

  return {
    connectionState,
    lastMessage,
    sendMessage,
    reconnect: connect,
    disconnect,
  }
}
```

**Why this pattern:**
- Automatic reconnection with exponential backoff
- Proper cleanup on unmount
- Type-safe message handling
- Connection state tracking

#### 4.2 Debounce Hook

**File:** `hooks/useDebounce.ts`
```typescript
'use client'

import { useEffect, useState } from 'react'

/**
 * Debounce a value to reduce unnecessary renders
 * Perfect for search inputs and expensive operations
 *
 * @example
 * const [search, setSearch] = useState('')
 * const debouncedSearch = useDebounce(search, 300)
 *
 * useEffect(() => {
 *   // Only runs 300ms after user stops typing
 *   fetchResults(debouncedSearch)
 * }, [debouncedSearch])
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

#### 4.3 Media Query Hook

**File:** `hooks/useMediaQuery.ts`
```typescript
'use client'

import { useEffect, useState } from 'react'

/**
 * React hook for responsive design
 * Returns true if the media query matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Create event listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)

    // Modern browsers
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// Preset breakpoints matching Tailwind
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1025px)')
}
```

### Best Practices
✅ **Do:**
- Cleanup effects with return functions
- Use `useCallback` for stable function references
- Memoize expensive computations with `useMemo`
- Handle edge cases (null, undefined, errors)
- Add JSDoc comments with examples

❌ **Don't:**
- Create hooks that violate Rules of Hooks
- Forget dependencies in useEffect
- Return unstable references from hooks
- Create overly complex hooks (split them up)

### Common Mistakes
1. **Missing cleanup**: Always cleanup timers, subscriptions, event listeners
2. **Stale closures**: Use `useRef` for values that shouldn't trigger re-renders
3. **Infinite loops**: Ensure useEffect dependencies are stable
4. **Not handling SSR**: Add `typeof window !== 'undefined'` checks

---

## 🎯 STEP 5: Redux Store Setup

### What to Build
Redux Toolkit slices for token state, filters, and WebSocket synchronization.

### Why
Centralized state management prevents prop drilling and enables time-travel debugging.

### Folder Structure
```
store/
  index.ts              # Store configuration
  hooks.ts              # Typed Redux hooks
  slices/
    tokensSlice.ts      # Token data state
    filtersSlice.ts     # Filter/sort state
    uiSlice.ts          # UI state (modals, tooltips)
  middleware/
    websocketMiddleware.ts  # WS event handling
```

### Implementation

#### 5.1 Tokens Slice

**File:** `store/slices/tokensSlice.ts`
```typescript
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Token } from '@/types/token'
import type { PriceUpdateMessage } from '@/types/websocket'

interface TokensState {
  items: Record<string, Token>  // Normalized by ID for O(1) lookup
  ids: string[]                 // Ordered array of IDs
  loading: boolean
  error: string | null
  lastUpdateTime: number
}

const initialState: TokensState = {
  items: {},
  ids: [],
  loading: false,
  error: null,
  lastUpdateTime: 0,
}

/**
 * Async thunk for fetching initial token data
 */
export const fetchTokens = createAsyncThunk(
  'tokens/fetchTokens',
  async (params: { status?: string; chain?: string } = {}) => {
    const queryParams = new URLSearchParams(params as any)
    const response = await fetch(`/api/tokens?${queryParams}`)
    if (!response.ok) throw new Error('Failed to fetch tokens')
    const data = await response.json()
    return data.items as Token[]
  }
)

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    /**
     * Update token price from WebSocket
     * Includes direction for animation
     */
    updateTokenPrice: (state, action: PayloadAction<PriceUpdateMessage['payload']>) => {
      const { tokenId, price, change24h, volume24h } = action.payload
      const token = state.items[tokenId]

      if (token) {
        const oldPrice = token.currentPrice
        const direction = price > oldPrice ? 'up' : price < oldPrice ? 'down' : 'neutral'

        state.items[tokenId] = {
          ...token,
          currentPrice: price,
          priceChange24h: change24h,
          volume24h,
          lastPriceDirection: direction,
          lastUpdateTime: Date.now(),
        }
        state.lastUpdateTime = Date.now()
      }
    },

    /**
     * Add new token to the list
     */
    addToken: (state, action: PayloadAction<Token>) => {
      const token = action.payload
      if (!state.items[token.id]) {
        state.items[token.id] = token
        state.ids.unshift(token.id) // Add to beginning
      }
    },

    /**
     * Remove token from the list
     */
    removeToken: (state, action: PayloadAction<string>) => {
      const id = action.payload
      delete state.items[id]
      state.ids = state.ids.filter((tokenId) => tokenId !== id)
    },

    /**
     * Clear all tokens
     */
    clearTokens: (state) => {
      state.items = {}
      state.ids = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.loading = false

        // Normalize tokens by ID
        const normalized: Record<string, Token> = {}
        const ids: string[] = []

        action.payload.forEach((token) => {
          normalized[token.id] = token
          ids.push(token.id)
        })

        state.items = normalized
        state.ids = ids
        state.lastUpdateTime = Date.now()
      })
      .addCase(fetchTokens.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch tokens'
      })
  },
})

export const { updateTokenPrice, addToken, removeToken, clearTokens } = tokensSlice.actions
export default tokensSlice.reducer

/**
 * Selectors
 */
export const selectAllTokens = (state: { tokens: TokensState }) =>
  state.tokens.ids.map((id) => state.tokens.items[id])

export const selectTokenById = (id: string) => (state: { tokens: TokensState }) =>
  state.tokens.items[id]

export const selectTokensLoading = (state: { tokens: TokensState }) =>
  state.tokens.loading

export const selectTokensError = (state: { tokens: TokensState }) =>
  state.tokens.error
```

**Why normalize state:**
- O(1) lookups by ID
- Prevents duplicate data
- Easier to update individual tokens
- Matches Redux best practices

#### 5.2 Filters Slice

**File:** `store/slices/filtersSlice.ts`
```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TokenStatus, ChainType, SortConfig } from '@/types/token'

interface FiltersState {
  searchQuery: string
  selectedStatuses: TokenStatus[]
  selectedChains: ChainType[]
  sortConfig: SortConfig
  priceRange: [number, number] | null
  volumeRange: [number, number] | null
}

const initialState: FiltersState = {
  searchQuery: '',
  selectedStatuses: [],
  selectedChains: [],
  sortConfig: {
    field: 'volume24h',
    direction: 'desc',
  },
  priceRange: null,
  volumeRange: null,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },

    toggleStatus: (state, action: PayloadAction<TokenStatus>) => {
      const status = action.payload
      const index = state.selectedStatuses.indexOf(status)

      if (index > -1) {
        state.selectedStatuses.splice(index, 1)
      } else {
        state.selectedStatuses.push(status)
      }
    },

    toggleChain: (state, action: PayloadAction<ChainType>) => {
      const chain = action.payload
      const index = state.selectedChains.indexOf(chain)

      if (index > -1) {
        state.selectedChains.splice(index, 1)
      } else {
        state.selectedChains.push(chain)
      }
    },

    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload
    },

    setPriceRange: (state, action: PayloadAction<[number, number] | null>) => {
      state.priceRange = action.payload
    },

    setVolumeRange: (state, action: PayloadAction<[number, number] | null>) => {
      state.volumeRange = action.payload
    },

    resetFilters: () => initialState,
  },
})

export const {
  setSearchQuery,
  toggleStatus,
  toggleChain,
  setSortConfig,
  setPriceRange,
  setVolumeRange,
  resetFilters,
} = filtersSlice.actions

export default filtersSlice.reducer
```

#### 5.3 Store Configuration

**File:** `store/index.ts`
```typescript
import { configureStore } from '@reduxjs/toolkit'
import tokensReducer from './slices/tokensSlice'
import filtersReducer from './slices/filtersSlice'

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for WebSocket messages
        ignoredActions: ['tokens/updateTokenPrice'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**File:** `store/hooks.ts`
```typescript
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

/**
 * Typed Redux hooks
 * Use these instead of plain `useDispatch` and `useSelector`
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### Best Practices
✅ **Do:**
- Normalize data by ID
- Use createAsyncThunk for API calls
- Create typed hooks
- Use selectors for derived state
- Keep reducers pure

❌ **Don't:**
- Mutate state outside reducers (Immer handles this)
- Put non-serializable data in state
- Create selectors that do expensive computations
- Dispatch actions in render

### Common Mistakes
1. **Not using Immer**: Redux Toolkit uses Immer, write "mutable" code safely
2. **Putting everything in Redux**: Only put shared state in Redux
3. **Not memoizing selectors**: Use `createSelector` from reselect for expensive operations
4. **Forgetting to export selectors**: Makes testing easier

---

## 🎯 NEXT STEPS SUMMARY

We've completed the foundation. Here's what to build next:

### Step 6: Molecule Components
- TokenCell (with logo, symbol, name)
- PriceCell (with change indicator and animation)
- VolumeCell (formatted numbers)
- ActionButtons (trade, favorite, etc.)

### Step 7: Table Organism
- VirtualizedTable (using @tanstack/react-virtual)
- TableHeader (with sorting)
- TableRow (memoized for performance)
- TableFilters (status, chain selectors)

### Step 8: Integration & Optimization
- Connect WebSocket to Redux
- Implement infinite scroll
- Add error boundaries
- Performance profiling

### Step 9: Testing & Deployment
- Visual regression tests
- Lighthouse optimization
- Responsive testing (320px-4K)
- Vercel deployment

---

## 📊 Performance Checklist

### Rendering Performance
- [ ] Memoize components with `React.memo`
- [ ] Use `useCallback` for event handlers
- [ ] Use `useMemo` for expensive calculations
- [ ] Implement virtualization for long lists
- [ ] Avoid inline object/array creation in render

### Network Performance
- [ ] Enable HTTP/2 server push
- [ ] Compress images with next/image
- [ ] Lazy load below-the-fold components
- [ ] Use React Query cache
- [ ] Implement optimistic updates

### Bundle Size
- [ ] Code split routes
- [ ] Dynamic import heavy components
- [ ] Tree-shake unused code
- [ ] Analyze bundle with `@next/bundle-analyzer`
- [ ] Use barrel exports carefully

### Runtime Performance
- [ ] Use CSS transforms for animations (GPU accelerated)
- [ ] Debounce expensive operations
- [ ] Use Web Workers for heavy computations
- [ ] Implement request coalescing
- [ ] Profile with React DevTools

---

## 🚫 Common Anti-Patterns to Avoid

### React Anti-Patterns
```typescript
// ❌ BAD: Creating objects in render
<Component style={{ color: 'red' }} />

// ✅ GOOD: Define outside component
const style = { color: 'red' }
<Component style={style} />

// ❌ BAD: Anonymous functions in props
<Button onClick={() => handleClick(id)} />

// ✅ GOOD: Memoized callback
const onClick = useCallback(() => handleClick(id), [id])
<Button onClick={onClick} />

// ❌ BAD: Conditional hooks
if (condition) {
  useEffect(() => {})
}

// ✅ GOOD: Condition inside hook
useEffect(() => {
  if (condition) {
    // ...
  }
}, [condition])
```

### Performance Anti-Patterns
```typescript
// ❌ BAD: Expensive operation in render
function Component() {
  const sorted = items.sort((a, b) => a.price - b.price)
  return <List items={sorted} />
}

// ✅ GOOD: Memoized computation
function Component() {
  const sorted = useMemo(
    () => items.sort((a, b) => a.price - b.price),
    [items]
  )
  return <List items={sorted} />
}

// ❌ BAD: Not virtualizing long lists
<div>
  {items.map(item => <Row key={item.id} data={item} />)}
</div>

// ✅ GOOD: Virtual scrolling
<VirtualList items={items} renderItem={Row} />
```

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Radix UI](https://www.radix-ui.com/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
- [Web.dev Performance](https://web.dev/performance)

---

**Ready to continue?** Next, I'll help you implement the molecule components and build the table organism. Let me know when you're ready to proceed!
