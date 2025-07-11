import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser, AuthState } from '../types';
import { storage } from '../utils/crypto';

const getInitialAuthState = (): AuthState => {
  const token = storage.get('access_token');
  const adminId = storage.get('adminId');
  const authorized = storage.get('authorized');

  return {
    user: token && adminId ? { id: adminId, token, email: '', name: '' } : null,
    isAuthenticated: Boolean(authorized && token),
    loading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      
      // Store in localStorage
      storage.set('access_token', action.payload.token);
      storage.set('adminId', action.payload.id);
      storage.set('authorized', 'true');
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      storage.clear();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
