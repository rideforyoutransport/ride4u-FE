import { apiService } from './api';
import { LoginCredentials, ChangePasswordData } from '../types';
import { storage } from '../utils/crypto';

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await apiService.post<{ token: string; id: string }>('/login', credentials);
    return response;
  },

  async changePassword(data: ChangePasswordData) {
    const adminId = storage.get('adminId');
    const response = await apiService.post(`/changepassword/${adminId}`, data);
    return response;
  },

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  },
};
