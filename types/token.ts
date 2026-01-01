/**
 * Token-related TypeScript type definitions
 */

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
  liquidity: number             // Liquidity in USD

  // Axiom-specific metrics
  ageMinutes: number            // Age in minutes since creation
  top10HoldersPercent: number   // % held by top 10 holders
  devHoldingPercent: number     // % held by developer
  snipersPercent: number        // % held by snipers/bots
  insidersPercent: number       // % held by insiders/team

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
