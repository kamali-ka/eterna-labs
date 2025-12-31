import { configureStore } from '@reduxjs/toolkit'
import tokensReducer from './slices/tokensSlice'
import filtersReducer from './slices/filtersSlice'

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for WebSocket messages
        ignoredActions: ['tokens/updateTokenPrice'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
