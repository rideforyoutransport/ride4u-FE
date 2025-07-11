import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Trip, CreateTripData, QueryParams } from '../types';
import { tripsService } from '../services';

interface TripsState {
  trips: Trip[];
  selectedTrip: Trip | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
  filters: QueryParams;
}

const initialState: TripsState = {
  trips: [],
  selectedTrip: null,
  loading: false,
  error: null,
  totalCount: 0,
  filters: {},
};

// Async thunks
export const fetchTrips = createAsyncThunk(
  'trips/fetchTrips',
  async (params?: QueryParams) => {
    const response = await tripsService.getAll(params);
    return response.result;
  }
);

export const fetchTripById = createAsyncThunk(
  'trips/fetchTripById',
  async (id: string) => {
    const response = await tripsService.getById(id);
    return response.result;
  }
);

export const createTrip = createAsyncThunk(
  'trips/createTrip',
  async (data: CreateTripData) => {
    const response = await tripsService.create(data);
    return response.result;
  }
);

export const updateTrip = createAsyncThunk(
  'trips/updateTrip',
  async ({ id, data }: { id: string; data: Partial<CreateTripData> }) => {
    const response = await tripsService.update(id, data);
    return response.result;
  }
);

export const deleteTrips = createAsyncThunk(
  'trips/deleteTrips',
  async (ids: string[]) => {
    await tripsService.deleteMultiple(ids);
    return ids;
  }
);

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setSelectedTrip: (state, action: PayloadAction<Trip | null>) => {
      state.selectedTrip = action.payload;
    },
    setFilters: (state, action: PayloadAction<QueryParams>) => {
      state.filters = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearTrips: (state) => {
      state.trips = [];
      state.selectedTrip = null;
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch trips
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trips';
      })
      // Fetch trip by ID
      .addCase(fetchTripById.fulfilled, (state, action) => {
        state.selectedTrip = action.payload;
      })
      // Create trip
      .addCase(createTrip.fulfilled, (state, action) => {
        state.trips.unshift(action.payload);
        state.totalCount += 1;
      })
      // Update trip
      .addCase(updateTrip.fulfilled, (state, action) => {
        const index = state.trips.findIndex(trip => trip.id === action.payload.id);
        if (index !== -1) {
          state.trips[index] = action.payload;
        }
        if (state.selectedTrip?.id === action.payload.id) {
          state.selectedTrip = action.payload;
        }
      })
      // Delete trips
      .addCase(deleteTrips.fulfilled, (state, action) => {
        state.trips = state.trips.filter(trip => !action.payload.includes(trip.id));
        state.totalCount -= action.payload.length;
        if (state.selectedTrip && action.payload.includes(state.selectedTrip.id)) {
          state.selectedTrip = null;
        }
      });
  },
});

export const { setSelectedTrip, setFilters, clearError, clearTrips } = tripsSlice.actions;
export default tripsSlice.reducer;
