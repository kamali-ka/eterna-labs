import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TokenStatus, ChainType, SortConfig } from '@/types/token'

interface FiltersState {
  searchQuery: string
  selectedStatuses: TokenStatus[]
  selectedChains: ChainType[]
  sortConfig: SortConfig
  priceRange: [number, number] | null
  volumeRange: [number, number] | null
}

const initialState: FiltersState = {
  searchQuery: '',
  selectedStatuses: [],
  selectedChains: [],
  sortConfig: {
    field: 'volume24h',
    direction: 'desc',
  },
  priceRange: null,
  volumeRange: null,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },

    toggleStatus: (state, action: PayloadAction<TokenStatus>) => {
      const status = action.payload
      const index = state.selectedStatuses.indexOf(status)

      if (index > -1) {
        state.selectedStatuses.splice(index, 1)
      } else {
        state.selectedStatuses.push(status)
      }
    },

    toggleChain: (state, action: PayloadAction<ChainType>) => {
      const chain = action.payload
      const index = state.selectedChains.indexOf(chain)

      if (index > -1) {
        state.selectedChains.splice(index, 1)
      } else {
        state.selectedChains.push(chain)
      }
    },

    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload
    },

    setPriceRange: (state, action: PayloadAction<[number, number] | null>) => {
      state.priceRange = action.payload
    },

    setVolumeRange: (state, action: PayloadAction<[number, number] | null>) => {
      state.volumeRange = action.payload
    },

    resetFilters: () => initialState,
  },
})

export const {
  setSearchQuery,
  toggleStatus,
  toggleChain,
  setSortConfig,
  setPriceRange,
  setVolumeRange,
  resetFilters,
} = filtersSlice.actions

export default filtersSlice.reducer

/**
 * Selectors
 */
export const selectSearchQuery = (state: { filters: FiltersState }) =>
  state.filters.searchQuery

export const selectSelectedStatuses = (state: { filters: FiltersState }) =>
  state.filters.selectedStatuses

export const selectSelectedChains = (state: { filters: FiltersState }) =>
  state.filters.selectedChains

export const selectSortConfig = (state: { filters: FiltersState }) =>
  state.filters.sortConfig
