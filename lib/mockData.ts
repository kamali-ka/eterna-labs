import type { Token } from '@/types/token'

/**
 * Generate mock token data for development and testing
 * Creates 20 sample tokens with realistic data
 */
export function generateMockTokens(): Token[] {
  const tokenNames = [
    { symbol: 'PEPE', name: 'Pepe Coin', launchpad: 'pump.fun' },
    { symbol: 'DOGE', name: 'Dogecoin', launchpad: 'virtual-curve' },
    { symbol: 'SHIB', name: 'Shiba Inu', launchpad: 'launchlab' },
    { symbol: 'BONK', name: 'Bonk', launchpad: 'pump.fun' },
    { symbol: 'WIF', name: 'Dog Wif Hat', launchpad: 'virtual-curve' },
    { symbol: 'BRETT', name: 'Brett', launchpad: 'pump.fun' },
    { symbol: 'MEW', name: 'cat in a dogs world', launchpad: 'launchlab' },
    { symbol: 'POPCAT', name: 'Popcat', launchpad: 'pump.fun' },
    { symbol: 'MOG', name: 'Mog Coin', launchpad: 'virtual-curve' },
    { symbol: 'PONKE', name: 'Ponke', launchpad: 'pump.fun' },
    { symbol: 'GIGA', name: 'Giga Chad', launchpad: 'launchlab' },
    { symbol: 'TURBO', name: 'Turbo', launchpad: 'pump.fun' },
    { symbol: 'MYRO', name: 'Myro', launchpad: 'virtual-curve' },
    { symbol: 'BOME', name: 'Book of Meme', launchpad: 'pump.fun' },
    { symbol: 'SNAP', name: 'Snap', launchpad: 'launchlab' },
    { symbol: 'MICHI', name: 'Michi', launchpad: 'pump.fun' },
    { symbol: 'WEN', name: 'Wen', launchpad: 'virtual-curve' },
    { symbol: 'SLERF', name: 'Slerf', launchpad: 'pump.fun' },
    { symbol: 'SMOG', name: 'Smog', launchpad: 'launchlab' },
    { symbol: 'BILLY', name: 'Billy', launchpad: 'pump.fun' },
  ]

  const statuses: Token['status'][] = ['new', 'final-stretch', 'migrated', 'graduated']
  const chains: Token['chain'][] = ['SOL', 'ETH', 'BASE', 'BTC']

  return tokenNames.map((token, index) => {
    const basePrice = 50 + Math.random() * 200
    const priceChange = (Math.random() - 0.5) * 30 // -15% to +15%
    const volume = Math.random() * 10_000_000
    const marketCap = basePrice * (1_000_000 + Math.random() * 50_000_000)
    const liquidity = Math.random() * 5_000_000
    const ageMinutes = Math.floor(Math.random() * 1440) // 0-24 hours in minutes

    // Generate age display string
    const ageDisplay = ageMinutes < 1
      ? `${Math.floor(ageMinutes * 60)}s`
      : ageMinutes < 60
      ? `${ageMinutes}m`
      : ageMinutes < 1440
      ? `${Math.floor(ageMinutes / 60)}h`
      : `${Math.floor(ageMinutes / 1440)}d`

    // Generate creator address
    const creatorAddress = `${Math.random().toString(36).substring(2, 6)}...${token.launchpad.substring(0, 4)}`

    // Generate random percentage colors
    const percentColors: Array<'green' | 'red' | 'gray'> = ['green', 'red', 'gray']
    const timePeriods = ['4mo', '1d', '2d', '1y', '20d', '3w', '5h']

    return {
      id: `tkn-${index}`,
      symbol: token.symbol,
      name: token.name,
      contractAddress: `0x${Math.random().toString(16).substring(2, 42).padEnd(40, '0')}`,
      chain: chains[Math.floor(Math.random() * chains.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      currentPrice: Number(basePrice.toFixed(2)),
      priceChange24h: Number(priceChange.toFixed(2)),
      volume24h: Number(volume.toFixed(2)),
      marketCap: Number(marketCap.toFixed(2)),
      liquidity: Number(liquidity.toFixed(2)),

      // Age & Time
      ageMinutes,
      ageDisplay,

      // Axiom-specific metrics
      top10HoldersPercent: Number((20 + Math.random() * 50).toFixed(2)), // 20-70%
      devHoldingPercent: Number((Math.random() * 20).toFixed(2)), // 0-20%
      snipersPercent: Number((Math.random() * 15).toFixed(2)), // 0-15%
      insidersPercent: Number((Math.random() * 25).toFixed(2)), // 0-25%

      // Icon row data
      organicGrowth: Math.random() > 0.5,
      hasLink: Math.random() > 0.3,
      searchable: Math.random() > 0.3,
      holderCount: Math.floor(Math.random() * 10),
      trendDirection: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'neutral',
      fireCount: Math.floor(Math.random() * 5),
      equalsValue: Number((Math.random() * 0.5).toFixed(2)),
      txCount: Math.floor(Math.random() * 100),
      txIndicator: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'neutral',

      // Platform info
      platform: token.launchpad.includes('pump') ? 'pump' : 'Raydium',
      creatorAddress,

      // Percentage indicators with colors and time periods
      percentage1: {
        value: Math.floor(Math.random() * 100),
        period: timePeriods[Math.floor(Math.random() * timePeriods.length)],
        color: percentColors[Math.floor(Math.random() * percentColors.length)]
      },
      percentage2: {
        value: Math.floor(Math.random() * 100),
        period: timePeriods[Math.floor(Math.random() * timePeriods.length)],
        color: percentColors[Math.floor(Math.random() * percentColors.length)]
      },
      percentage3: {
        value: Math.floor(Math.random() * 100),
        period: timePeriods[Math.floor(Math.random() * timePeriods.length)],
        color: percentColors[Math.floor(Math.random() * percentColors.length)]
      },
      percentage4: {
        value: Math.floor(Math.random() * 100),
        period: '',
        color: percentColors[Math.floor(Math.random() * percentColors.length)]
      },

      // Badge indicators
      verified: Math.random() > 0.7,
      hasBadge: Math.random() > 0.8,

      logo: `https://api.dicebear.com/7.x/identicon/svg?seed=${token.symbol}`,
      createdAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(), // Last 7 days
      launchpad: token.launchpad,
      lastPriceDirection: 'neutral',
      lastUpdateTime: Date.now(),
    }
  })
}

// Export a singleton instance for consistent data across the app
let mockTokensCache: Token[] | null = null

export function getMockTokens(): Token[] {
  if (!mockTokensCache) {
    mockTokensCache = generateMockTokens()
  }
  return mockTokensCache
}

// Reset mock data (useful for testing)
export function resetMockTokens(): void {
  mockTokensCache = null
}
