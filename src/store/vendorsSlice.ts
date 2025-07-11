import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Vendor, CreateVendorData, UpdateVendorData, QueryParams } from '../types';
import { vendorsService } from '../services';

interface VendorsState {
  vendors: Vendor[];
  selectedVendor: Vendor | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: VendorsState = {
  vendors: [],
  selectedVendor: null,
  loading: false,
  error: null,
  totalCount: 0,
};

// Async thunks
export const fetchVendors = createAsyncThunk(
  'vendors/fetchVendors',
  async (params?: QueryParams) => {
    const response = await vendorsService.getVendors(params);
    return response.result.items;
  }
);

export const createVendor = createAsyncThunk(
  'vendors/createVendor',
  async (data: CreateVendorData) => {
    const response = await vendorsService.createVendor(data);
    return response.result;
  }
);

export const updateVendor = createAsyncThunk(
  'vendors/updateVendor',
  async ({ id, data }: { id: string; data: UpdateVendorData }) => {
    const response = await vendorsService.updateVendor(id, data);
    return response.result;
  }
);

export const deleteVendors = createAsyncThunk(
  'vendors/deleteVendors',
  async (ids: string[]) => {
    await vendorsService.deleteVendors(ids);
    return ids;
  }
);

const vendorsSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    setSelectedVendor: (state, action: PayloadAction<Vendor | null>) => {
      state.selectedVendor = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vendors';
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.vendors.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        const index = state.vendors.findIndex(vendor => vendor.id === action.payload.id);
        if (index !== -1) {
          state.vendors[index] = action.payload;
        }
      })
      .addCase(deleteVendors.fulfilled, (state, action) => {
        state.vendors = state.vendors.filter(vendor => !action.payload.includes(vendor.id));
        state.totalCount -= action.payload.length;
      });
  },
});

export const { setSelectedVendor, clearError } = vendorsSlice.actions;
export default vendorsSlice.reducer;
