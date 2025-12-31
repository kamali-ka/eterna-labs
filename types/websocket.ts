/**
 * WebSocket-related TypeScript type definitions
 */

import { Token, TokenStatus } from './token'

/**
 * WebSocket message types
 */
export type WSMessageType =
  | 'price_update'
  | 'new_token'
  | 'status_change'
  | 'volume_update'

/**
 * Base WebSocket message
 */
interface BaseWSMessage {
  type: WSMessageType
  timestamp: string
}

/**
 * Price update message
 */
export interface PriceUpdateMessage extends BaseWSMessage {
  type: 'price_update'
  payload: {
    tokenId: string
    price: number
    change24h: number
    volume24h: number
  }
}

/**
 * New token listed message
 */
export interface NewTokenMessage extends BaseWSMessage {
  type: 'new_token'
  payload: {
    token: Token
  }
}

/**
 * Token status change message
 */
export interface StatusChangeMessage extends BaseWSMessage {
  type: 'status_change'
  payload: {
    tokenId: string
    oldStatus: TokenStatus
    newStatus: TokenStatus
  }
}

/**
 * Union type of all WS messages
 */
export type WSMessage =
  | PriceUpdateMessage
  | NewTokenMessage
  | StatusChangeMessage

/**
 * WebSocket connection state
 */
export type WSConnectionState =
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error'
  | 'reconnecting'

/**
 * WebSocket hook return type
 */
export interface UseWebSocketReturn {
  connectionState: WSConnectionState
  lastMessage: WSMessage | null
  sendMessage: (message: any) => void
  reconnect: () => void
}
