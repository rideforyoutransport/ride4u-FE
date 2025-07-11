import { apiService } from './api';
import type { ApiResponse, Vendor, CreateVendorData, UpdateVendorData, QueryParams } from '../types';

class VendorService {
  async getVendors(params?: QueryParams): Promise<ApiResponse<{ items: Vendor[] }>> {
    return apiService.post('/vendor/all', params || {});
  }

  async getVendor(id: string): Promise<ApiResponse<Vendor>> {
    return apiService.get(`/vendor/${id}`);
  }

  async createVendor(data: CreateVendorData): Promise<ApiResponse<Vendor>> {
    // Match the structure from AddVendor.js
    const payload = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password || `${data.name}..2024`,
      passwordConfirm: data.passwordConfirm || `${data.name}..2024`,
    };
    return apiService.post('/vendor/register', payload);
  }

  async updateVendor(id: string, data: UpdateVendorData): Promise<ApiResponse<Vendor>> {
    // Match the structure from AddVendor.js  
    const payload = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
    };
    return apiService.patch(`/vendor/${id}`, payload);
  }

  async deleteVendor(id: string): Promise<ApiResponse<void>> {
    return apiService.post('/vendor/deleteMultiple', { ids: [id] });
  }

  async deleteVendors(ids: string[]): Promise<ApiResponse<void>> {
    return apiService.post('/vendor/deleteMultiple', { ids });
  }
}

export const vendorsService = new VendorService();