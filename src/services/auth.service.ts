import { apiService } from './api';
import { LoginCredentials, ChangePasswordData } from '../types';

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await apiService.post<{ token: string; id: string }>('/login', credentials);
    return response;
  },

  async changePassword(data: ChangePasswordData) {
    const adminId = localStorage.getItem('adminId');
    const response = await apiService.put(`/changepassword/${adminId}`, data);
    return response;
  },

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  },
};
