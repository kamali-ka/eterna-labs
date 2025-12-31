/**
 * API-related TypeScript type definitions
 */

import { Token, TokenFilters, SortConfig } from './token'

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: {
    code: string
    message: string
  }
  meta?: {
    timestamp: string
    requestId: string
  }
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

/**
 * Token list request params
 */
export interface GetTokensParams {
  filters?: TokenFilters
  sort?: SortConfig
  page?: number
  pageSize?: number
}

/**
 * Token list response
 */
export type GetTokensResponse = ApiResponse<PaginatedResponse<Token>>
