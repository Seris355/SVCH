import { configureStore } from '@reduxjs/toolkit'
import masterClassesSlice from './slices/masterClassesSlice'
import filtersSlice from './slices/filtersSlice'

export const store = configureStore({
  reducer: {
    masterClasses: masterClassesSlice,
    filters: filtersSlice,
  },
})