import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Booking, QueryParams } from '../types';
import { bookingsService } from '../services';

interface BookingsState {
  bookings: Booking[];
  tripBookings: Booking[]; // New: bookings for a specific trip
  selectedBooking: Booking | null;
  loading: boolean;
  tripBookingsLoading: boolean; // New: separate loading state for trip bookings
  error: string | null;
  tripBookingsError: string | null; // New: separate error state for trip bookings
  totalCount: number;
  tripBookingsCount: number; // New: count of bookings for a specific trip
  filters: QueryParams;
}

const initialState: BookingsState = {
  bookings: [],
  tripBookings: [],
  selectedBooking: null,
  loading: false,
  tripBookingsLoading: false,
  error: null,
  tripBookingsError: null,
  totalCount: 0,
  tripBookingsCount: 0,
  filters: {},
};

// Async thunks
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (params?: QueryParams) => {
    const response = await bookingsService.getAll(params);
    return response.result;
  }
);

// New: Fetch bookings by trip ID
export const fetchBookingsByTrip = createAsyncThunk(
  'bookings/fetchBookingsByTrip',
  async (params: { tripId: string } & QueryParams) => {
    const response = await bookingsService.getAllByTrip(params);
    return {
      bookings: response.result,
      tripId: params.tripId
    };
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setSelectedBooking: (state, action: PayloadAction<Booking | null>) => {
      state.selectedBooking = action.payload;
    },
    setFilters: (state, action: PayloadAction<QueryParams>) => {
      state.filters = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearTripBookingsError: (state) => {
      state.tripBookingsError = null;
    },
    clearTripBookings: (state) => {
      state.tripBookings = [];
      state.tripBookingsCount = 0;
      state.tripBookingsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      // Fetch bookings by trip
      .addCase(fetchBookingsByTrip.pending, (state) => {
        state.tripBookingsLoading = true;
        state.tripBookingsError = null;
      })
      .addCase(fetchBookingsByTrip.fulfilled, (state, action) => {
        state.tripBookingsLoading = false;
        state.tripBookings = action.payload.bookings;
        state.tripBookingsCount = action.payload.bookings.length;
      })
      .addCase(fetchBookingsByTrip.rejected, (state, action) => {
        state.tripBookingsLoading = false;
        state.tripBookingsError = action.error.message || 'Failed to fetch trip bookings';
      });
  },
});

export const { 
  setSelectedBooking, 
  setFilters, 
  clearError, 
  clearTripBookingsError,
  clearTripBookings 
} = bookingsSlice.actions;

export default bookingsSlice.reducer;