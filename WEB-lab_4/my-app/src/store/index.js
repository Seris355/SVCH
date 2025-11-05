import { configureStore } from '@reduxjs/toolkit';
import masterClassesReducer from './slices/masterClassesSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    masterClasses: masterClassesReducer,
    filters: filtersReducer,
  },
});