import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
  difficulty: 'all',
  priceRange: 'all',
  sortBy: 'newest',
  searchQuery: ''
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      state.category = 'all';
      state.difficulty = 'all';
      state.priceRange = 'all';
      state.sortBy = 'newest';
      state.searchQuery = '';
    }
  }
});

export const {
  setCategory,
  setDifficulty,
  setPriceRange,
  setSortBy,
  setSearchQuery,
  resetFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;