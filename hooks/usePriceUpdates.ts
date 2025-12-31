'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { connectMockSocket } from '@/services/mockSocket'
import { updateTokenPrice } from '@/store/slices/tokensSlice'

/**
 * Hook to subscribe to real-time price updates via mock WebSocket
 * Automatically connects/disconnects and dispatches updates to Redux store
 *
 * @example
 * function TokenTable() {
 *   usePriceUpdates() // Just call it - handles everything automatically
 *   // ...
 * }
 */
export function usePriceUpdates() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const socket = connectMockSocket((update) => {
      // Dispatch price update to Redux store
      dispatch(
        updateTokenPrice({
          tokenId: update.id,
          price: update.price,
          change24h: 0, // Mock socket doesn't provide this yet
          volume24h: 0, // Mock socket doesn't provide this yet
        })
      )
    })

    return () => socket.close()
  }, [dispatch])
}
