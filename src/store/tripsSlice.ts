import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Trip, QueryParams } from '../types';
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
  async ({ params }: { params?: QueryParams } = {}, { rejectWithValue }) => {
    try {
      const response = await tripsService.getAll(params);
      if (response.success) {
        // Process trips to add name property like in original code
        const processedTrips = (Array.isArray(response.result) ? response.result : []).map((trip: any) => {
          let tripName = '';
          if (trip.returnTrip) {
            tripName = `${trip.from?.name || 'Unknown'} - ${trip.to?.name || 'Unknown'} - ${trip.from?.name || 'Unknown'}`;
          } else {
            tripName = `${trip.from?.name || 'Unknown'} - ${trip.to?.name || 'Unknown'}`;
          }
          return {
            ...trip,
            name: tripName
          };
        });
        return processedTrips;
      } else {
        return rejectWithValue('Failed to fetch trips');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch trips');
    }
  }
);

export const fetchTripById = createAsyncThunk(
  'trips/fetchTripById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await tripsService.getById(id);
      if (response.success) {
        return response.result;
      } else {
        return rejectWithValue('Failed to fetch trip');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch trip');
    }
  }
);

export const createTrip = createAsyncThunk(
  'trips/createTrip',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await tripsService.create(data);
      if (response.success) {
        // Add name property to the created trip
        let tripName = '';
        const trip = response.result;
        if (trip.returnTrip) {
          tripName = `${trip.from?.name || 'Unknown'} - ${trip.to?.name || 'Unknown'} - ${trip.from?.name || 'Unknown'}`;
        } else {
          tripName = `${trip.from?.name || 'Unknown'} - ${trip.to?.name || 'Unknown'}`;
        }
        return {
          ...trip,
          name: tripName
        };
      } else {
        return rejectWithValue('Failed to create trip');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create trip');
    }
  }
);

export const updateTrip = createAsyncThunk(
  'trips/updateTrip',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await tripsService.update(id, data);
      if (response.success) {
        // Add name property to the updated trip
        let tripName = '';
        const trip = response.result;
        if (trip.returnTrip) {
          tripName = `${trip.from?.name || 'Unknown'} - ${trip.to?.name || 'Unknown'} - ${trip.from?.name || 'Unknown'}`;
        } else {
          tripName = `${trip.from?.name || 'Unknown'} - ${trip.to?.name || 'Unknown'}`;
        }
        return {
          ...trip,
          name: tripName
        };
      } else {
        return rejectWithValue('Failed to update trip');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update trip');
    }
  }
);

export const deleteTrips = createAsyncThunk(
  'trips/deleteTrips',
  async (ids: string[], { rejectWithValue }) => {
    try {
      const response = await tripsService.deleteMultiple(ids);
      if (response.success) {
        return ids;
      } else {
        return rejectWithValue('Failed to delete trips');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete trips');
    }
  }
);

export const deleteSingleTrip = createAsyncThunk(
  'trips/deleteSingleTrip',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await tripsService.delete(id);
      if (response.success) {
        return id;
      } else {
        return rejectWithValue('Failed to delete trip');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete trip');
    }
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
    updateTripInList: (state, action: PayloadAction<Trip>) => {
      const index = state.trips.findIndex(trip => trip.id === action.payload.id);
      if (index !== -1) {
        state.trips[index] = action.payload;
      }
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
        state.error = null;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch trips';
        state.trips = [];
        state.totalCount = 0;
      })
      // Fetch trip by ID
      .addCase(fetchTripById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTripById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTrip = action.payload;
        state.error = null;
      })
      .addCase(fetchTripById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch trip';
        state.selectedTrip = null;
      })
      // Create trip
      .addCase(createTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips.unshift(action.payload);
        state.totalCount += 1;
        state.error = null;
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create trip';
      })
      // Update trip
      .addCase(updateTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.trips.findIndex(trip => trip.id === action.payload.id);
        if (index !== -1) {
          state.trips[index] = action.payload;
        }
        if (state.selectedTrip?.id === action.payload.id) {
          state.selectedTrip = action.payload;
        }
        state.error = null;
      })
      .addCase(updateTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update trip';
      })
      // Delete multiple trips
      .addCase(deleteTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = state.trips.filter(trip => !action.payload.includes(trip.id));
        state.totalCount -= action.payload.length;
        if (state.selectedTrip && action.payload.includes(state.selectedTrip.id)) {
          state.selectedTrip = null;
        }
        state.error = null;
      })
      .addCase(deleteTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete trips';
      })
      // Delete single trip
      .addCase(deleteSingleTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSingleTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = state.trips.filter(trip => trip.id !== action.payload);
        state.totalCount -= 1;
        if (state.selectedTrip?.id === action.payload) {
          state.selectedTrip = null;
        }
        state.error = null;
      })
      .addCase(deleteSingleTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete trip';
      });
  },
});

export const { 
  setSelectedTrip, 
  setFilters, 
  clearError, 
  clearTrips, 
  updateTripInList 
} = tripsSlice.actions;

export default tripsSlice.reducer;