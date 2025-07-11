import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle, CreateVehicleData } from '../types';
import { vehiclesService } from '../services';

interface VehiclesState {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: VehiclesState = {
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,
  totalCount: 0,
};

// Async thunks
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    const response = await vehiclesService.getVehicles();
    return response.result;
  }
);

export const createVehicle = createAsyncThunk(
  'vehicles/createVehicle',
  async (data: CreateVehicleData) => {
    const response = await vehiclesService.createVehicle(data);
    return response.result;
  }
);

export const updateVehicle = createAsyncThunk(
  'vehicles/updateVehicle',
  async ({ id, data }: { id: string; data: Partial<CreateVehicleData> }) => {
    const response = await vehiclesService.updateVehicle(id, data);
    return response.result;
  }
);

export const deleteVehicles = createAsyncThunk(
  'vehicles/deleteVehicles',
  async (ids: string[]) => {
    await vehiclesService.deleteVehicles(ids);
    return ids;
  }
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setSelectedVehicle: (state, action: PayloadAction<Vehicle | null>) => {
      state.selectedVehicle = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vehicles';
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.vehicles.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        const index = state.vehicles.findIndex(vehicle => vehicle.id === action.payload.id);
        if (index !== -1) {
          state.vehicles[index] = action.payload;
        }
      })
      .addCase(deleteVehicles.fulfilled, (state, action) => {
        state.vehicles = state.vehicles.filter(vehicle => !action.payload.includes(vehicle.id));
        state.totalCount -= action.payload.length;
      });
  },
});

export const { setSelectedVehicle, clearError } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
