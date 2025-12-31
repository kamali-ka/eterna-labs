type PriceUpdate = { id: string; price: number }

export function connectMockSocket(onUpdate: (u: PriceUpdate) => void) {
  let i = 0
  const ids = ['ETH/USDC', 'BTC/USDC', 'SOL/USDC']

  const t = setInterval(() => {
    const id = ids[i % ids.length]
    const price = Math.round((100 + Math.random() * 1000) * 100) / 100
    onUpdate({ id, price })
    i++
  }, 1000)

  return {
    close: () => clearInterval(t)
  }
}
