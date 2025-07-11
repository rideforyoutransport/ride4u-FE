import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  sidebarOpen: boolean;
  loading: boolean;
}

const initialState: GlobalState = {
  sidebarOpen: false,
  loading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setLoading } = globalSlice.actions;
export default globalSlice.reducer;
