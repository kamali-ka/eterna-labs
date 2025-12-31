/**
 * Utility functions for data formatting and common operations
 */

/**
 * Format number as currency with appropriate suffixes
 * @example formatCurrency(1234567) => "$1.23M"
 */
export function formatCurrency(value: number, options?: { decimals?: number }): string {
  const decimals = options?.decimals ?? 2

  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(decimals)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(decimals)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(decimals)}K`
  }
  return `$${value.toFixed(decimals)}`
}

/**
 * Format number with commas
 * @example formatNumber(1234567.89) => "1,234,567.89"
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Format percentage change with + or - sign
 * @example formatPercentage(5.67) => "+5.67%"
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  const formatted = Math.abs(value).toFixed(decimals)
  const sign = value > 0 ? '+' : value < 0 ? '-' : ''
  return `${sign}${formatted}%`
}

/**
 * Format large numbers with K/M/B suffixes
 * @example formatCompactNumber(1234567) => "1.23M"
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`
  }
  return value.toString()
}

/**
 * Truncate wallet address or contract address
 * @example truncateAddress("0x1234...7890", 6, 4) => "0x1234...7890"
 */
export function truncateAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (address.length <= startChars + endChars) return address
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}

/**
 * Format timestamp to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: string | number): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  return `${Math.floor(diffInSeconds / 86400)}d ago`
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Sleep for a given number of milliseconds
 * Useful for testing loading states
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
