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
  symbol: string                // e.g., "GOOSE"
  name: string                  // Full name e.g., "Golden Goose"
  contractAddress: string       // Blockchain address (short version for display)
  chain: ChainType              // Network
  status: TokenStatus           // Lifecycle stage

  // Price data
  currentPrice: number          // USD price (V column)
  priceChange24h: number        // % change (can be negative)
  volume24h: number             // 24h trading volume (V column)
  marketCap: number             // Total market cap (MC column)
  liquidity: number             // Liquidity in USD

  // Age & Time
  ageMinutes: number            // Age in minutes since creation
  ageDisplay: string            // Display format: "2s", "5s", "1d", "16h", "19s"

  // Holder metrics (percentages with colored indicators)
  top10HoldersPercent: number   // % held by top 10 holders
  devHoldingPercent: number     // % held by developer
  snipersPercent: number        // % held by snipers/bots
  insidersPercent: number       // % held by insiders/team

  // Icon row data
  organicGrowth: boolean        // Leaf icon indicator
  hasLink: boolean              // Link icon
  searchable: boolean           // Search icon
  holderCount: number           // User icon with count (e.g., 1, 0, 6, 3)
  trendDirection: 'up' | 'down' | 'neutral'  // Arrow up/down/neutral
  fireCount: number             // Fire icon with number
  equalsValue: number           // Equals sign with decimal value (e.g., 0.02)
  txCount: number               // Transaction count
  txIndicator: 'up' | 'down' | 'neutral'  // TX bar color indicator

  // Platform info
  platform: string              // e.g., "pump", "Raydium"
  creatorAddress: string        // Short creator address (e.g., "HiAs...pump")

  // Percentage indicators (with time periods)
  percentage1: { value: number; period: string; color: 'green' | 'red' | 'gray' }  // e.g., 10% 4mo
  percentage2: { value: number; period: string; color: 'green' | 'red' | 'gray' }  // e.g., 10% 1d
  percentage3: { value: number; period: string; color: 'green' | 'red' | 'gray' }  // e.g., 10% 2d
  percentage4: { value: number; period: string; color: 'green' | 'red' | 'gray' }  // e.g., 0% (with icon)

  // Badge indicators
  verified: boolean             // Verified badge
  hasBadge: boolean            // Special badge (checkmark, crown, etc.)

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
