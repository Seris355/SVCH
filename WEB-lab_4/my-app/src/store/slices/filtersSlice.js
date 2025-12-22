import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
  minPrice: 0,
  maxPrice: 10000,
  sortBy: 'title' 
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.min
      state.maxPrice = action.payload.max
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    resetFilters: (state) => {
      state.search = ''
      state.minPrice = 0
      state.maxPrice = 10000
      state.sortBy = 'title'
    }
  }
})

export const { setSearch, setPriceRange, setSortBy, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer