import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import globalSlice from './globalSlice';
import tripsSlice from './tripsSlice';
import driversSlice from './driversSlice';
import vehiclesSlice from './vehiclesSlice';
import usersSlice from './usersSlice';
import vendorsSlice from './vendorsSlice';
import bookingsSlice from './bookingsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    global: globalSlice,
    trips: tripsSlice,
    drivers: driversSlice,
    vehicles: vehiclesSlice,
    users: usersSlice,
    vendors: vendorsSlice,
    bookings: bookingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export { useAppDispatch, useAppSelector } from './hooks';
