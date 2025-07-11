import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Driver, CreateDriverData, UpdateDriverData, QueryParams } from '../types';
import { driversService } from '../services';

interface DriversState {
  drivers: Driver[];
  selectedDriver: Driver | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: DriversState = {
  drivers: [],
  selectedDriver: null,
  loading: false,
  error: null,
  totalCount: 0,
};

// Async thunks
export const fetchDrivers = createAsyncThunk(
  'drivers/fetchDrivers',
  async (params?: QueryParams) => {
    const response = await driversService.getAll(params);
    return response.result.items;
  }
);

export const createDriver = createAsyncThunk(
  'drivers/createDriver',
  async (data: CreateDriverData) => {
    const response = await driversService.create(data);
    return response.result;
  }
);

export const updateDriver = createAsyncThunk(
  'drivers/updateDriver',
  async ({ id, data }: { id: string; data: UpdateDriverData }) => {
    const response = await driversService.update(id, data);
    return response.result;
  }
);

export const deleteDrivers = createAsyncThunk(
  'drivers/deleteDrivers',
  async (ids: string[]) => {
    await driversService.deleteMultiple(ids);
    return ids;
  }
);

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setSelectedDriver: (state, action: PayloadAction<Driver | null>) => {
      state.selectedDriver = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch drivers';
      })
      .addCase(createDriver.fulfilled, (state, action) => {
        state.drivers.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(updateDriver.fulfilled, (state, action) => {
        const index = state.drivers.findIndex(driver => driver.id === action.payload.id);
        if (index !== -1) {
          state.drivers[index] = action.payload;
        }
      })
      .addCase(deleteDrivers.fulfilled, (state, action) => {
        state.drivers = state.drivers.filter(driver => !action.payload.includes(driver.id));
        state.totalCount -= action.payload.length;
      });
  },
});

export const { setSelectedDriver, clearError } = driversSlice.actions;
export default driversSlice.reducer;
