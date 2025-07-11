import { apiService } from './api';
import { Driver, CreateDriverData, UpdateDriverData, QueryParams, ApiResponse } from '../types';

let data = {
  "from": 0,
  "to": 100,
}

export const driversService = {
  async getAll(params?: QueryParams) {
    const response = await apiService.post<{ items: Driver[] }>('/driver/all', data);
    return response;
  },

  async getDriver(id: string): Promise<ApiResponse<Driver>> {
    return apiService.get(`/driver/${id}`);
  },

  async create(data: CreateDriverData) {
    const response = await apiService.post<Driver>('/driver/add', data);
    return response;
  },

  async update(id: string, data: UpdateDriverData) {
    const response = await apiService.patch<Driver>(`/driver/${id}`, data);
    return response;
  },

  async delete(id: string) {
    const response = await apiService.post('/driver/deleteMultiple', { ids: [id] });
    return response;
  },

  async deleteMultiple(ids: string[]) {
    const response = await apiService.post('/driver/deleteMultiple', { ids });
    return response;
  },
};
