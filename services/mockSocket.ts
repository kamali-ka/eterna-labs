type PriceUpdate = { id: string; price: number }

// Emits price updates for token ids `tkn-0`..`tkn-19` to match the mock API sample
export function connectMockSocket(onUpdate: (u: PriceUpdate) => void) {
  const t = setInterval(() => {
    const idx = Math.floor(Math.random() * 20)
    const id = `tkn-${idx}`
    const price = Math.round((50 + Math.random() * 200) * 100) / 100
    onUpdate({ id, price })
  }, 1000)

  return {
    close: () => clearInterval(t)
  }
}
