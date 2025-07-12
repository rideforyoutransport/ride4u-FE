import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParams, RequestedTrip } from '../types';
import { requestedTripsService } from '../services';

interface RequestedTripsState {
  requestedTrips: RequestedTrip[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: RequestedTripsState = {
  requestedTrips: [],
  loading: false,
  error: null,
  totalCount: 0,
};

// Async thunks
export const fetchRequestedTrips = createAsyncThunk(
  'requestedTrips/fetchRequestedTrips',
  async (params?: QueryParams) => {
    const response = await requestedTripsService.getRequestedTrips(params);
    return response.result.items;
  }
);

const requestedTripsSlice = createSlice({
  name: 'requestedTrips',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestedTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestedTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.requestedTrips = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchRequestedTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch requestedTrips';
      })
  },
});

export const { clearError } = requestedTripsSlice.actions;
export default requestedTripsSlice.reducer;
