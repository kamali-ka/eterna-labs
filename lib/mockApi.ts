import type { Token } from '../types/token'

const sample: Token[] = Array.from({ length: 20 }).map((_, i) => {
  const base = 100 + i * 3
  return {
    id: `tkn-${i}`,
    symbol: ['ETH', 'BTC', 'SOL', 'USDT', 'LINK'][i % 5] + `-${i}`,
    name: `Token ${i}`,
    price: Math.round((base + Math.random() * 50) * 100) / 100,
    change24h: Math.round((Math.random() - 0.5) * 1000) / 100,
    liquidity: Math.round((Math.random() * 1_000_000) / 100) * 100
  }
})

export async function fetchTokens(): Promise<Token[]> {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 300))
  return sample
}
