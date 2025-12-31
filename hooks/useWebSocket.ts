'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { WSMessage, WSConnectionState } from '@/types/websocket'

interface UseWebSocketOptions {
  url?: string
  reconnectInterval?: number
  reconnectAttempts?: number
  onMessage?: (message: WSMessage) => void
  onOpen?: () => void
  onClose?: () => void
  onError?: (error: Event) => void
}

/**
 * Custom hook for WebSocket connection management
 * Features: auto-reconnect, connection state tracking, type-safe messages
 *
 * @example
 * const { connectionState, lastMessage } = useWebSocket({
 *   url: 'wss://api.example.com/ws',
 *   onMessage: (msg) => console.log(msg),
 * })
 */
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
    if (!url) return

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
    if (url) {
      connect()
    }
    return disconnect
  }, [connect, disconnect, url])

  return {
    connectionState,
    lastMessage,
    sendMessage,
    reconnect: connect,
    disconnect,
  }
}
