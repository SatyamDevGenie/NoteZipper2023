import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import notesSlice from './slices/notesSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    notes: notesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;