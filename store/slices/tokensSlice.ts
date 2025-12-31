import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Token } from '@/types/token'
import type { PriceUpdateMessage } from '@/types/websocket'

interface TokensState {
  items: Record<string, Token>  // Normalized by ID for O(1) lookup
  ids: string[]                 // Ordered array of IDs
  loading: boolean
  error: string | null
  lastUpdateTime: number
}

const initialState: TokensState = {
  items: {},
  ids: [],
  loading: false,
  error: null,
  lastUpdateTime: 0,
}

/**
 * Async thunk for fetching initial token data
 */
export const fetchTokens = createAsyncThunk(
  'tokens/fetchTokens',
  async (params: { status?: string; chain?: string } = {}) => {
    const queryParams = new URLSearchParams(params as any)
    const response = await fetch(`/api/tokens?${queryParams}`)
    if (!response.ok) throw new Error('Failed to fetch tokens')
    const data = await response.json()
    return data.items as Token[]
  }
)

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    /**
     * Update token price from WebSocket
     * Includes direction for animation
     */
    updateTokenPrice: (state, action: PayloadAction<PriceUpdateMessage['payload']>) => {
      const { tokenId, price, change24h, volume24h } = action.payload
      const token = state.items[tokenId]

      if (token) {
        const oldPrice = token.currentPrice
        const direction = price > oldPrice ? 'up' : price < oldPrice ? 'down' : 'neutral'

        state.items[tokenId] = {
          ...token,
          currentPrice: price,
          priceChange24h: change24h,
          volume24h,
          lastPriceDirection: direction,
          lastUpdateTime: Date.now(),
        }
        state.lastUpdateTime = Date.now()
      }
    },

    /**
     * Add new token to the list
     */
    addToken: (state, action: PayloadAction<Token>) => {
      const token = action.payload
      if (!state.items[token.id]) {
        state.items[token.id] = token
        state.ids.unshift(token.id) // Add to beginning
      }
    },

    /**
     * Remove token from the list
     */
    removeToken: (state, action: PayloadAction<string>) => {
      const id = action.payload
      delete state.items[id]
      state.ids = state.ids.filter((tokenId) => tokenId !== id)
    },

    /**
     * Clear all tokens
     */
    clearTokens: (state) => {
      state.items = {}
      state.ids = []
    },

    /**
     * Set tokens directly (for initial load or mock data)
     */
    setTokens: (state, action: PayloadAction<Token[]>) => {
      const normalized: Record<string, Token> = {}
      const ids: string[] = []

      action.payload.forEach((token) => {
        normalized[token.id] = token
        ids.push(token.id)
      })

      state.items = normalized
      state.ids = ids
      state.loading = false
      state.lastUpdateTime = Date.now()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.loading = false

        // Normalize tokens by ID
        const normalized: Record<string, Token> = {}
        const ids: string[] = []

        action.payload.forEach((token) => {
          normalized[token.id] = token
          ids.push(token.id)
        })

        state.items = normalized
        state.ids = ids
        state.lastUpdateTime = Date.now()
      })
      .addCase(fetchTokens.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch tokens'
      })
  },
})

export const { updateTokenPrice, addToken, removeToken, clearTokens, setTokens } = tokensSlice.actions
export default tokensSlice.reducer

/**
 * Selectors
 */
export const selectAllTokens = (state: { tokens: TokensState }) =>
  state.tokens.ids.map((id) => state.tokens.items[id])

export const selectTokenById = (id: string) => (state: { tokens: TokensState }) =>
  state.tokens.items[id]

export const selectTokensLoading = (state: { tokens: TokensState }) =>
  state.tokens.loading

export const selectTokensError = (state: { tokens: TokensState }) =>
  state.tokens.error
