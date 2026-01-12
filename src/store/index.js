import { configureStore } from '@reduxjs/toolkit';
import instructorsSlice from './slices/instructorsSlice';
import participantsSlice from './slices/participantsSlice';
import masterClassesSlice from './slices/masterClassesSlice';

export const store = configureStore({
  reducer: {
    instructors: instructorsSlice,
    participants: participantsSlice,
    masterClasses: masterClassesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});