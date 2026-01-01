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

      // Axiom-specific metrics
      ageMinutes: Math.floor(Math.random() * 1440), // 0-24 hours in minutes
      top10HoldersPercent: Number((20 + Math.random() * 50).toFixed(2)), // 20-70%
      devHoldingPercent: Number((Math.random() * 20).toFixed(2)), // 0-20%
      snipersPercent: Number((Math.random() * 15).toFixed(2)), // 0-15%
      insidersPercent: Number((Math.random() * 25).toFixed(2)), // 0-25%

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
