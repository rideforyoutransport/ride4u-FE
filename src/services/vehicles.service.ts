import { apiService } from './api';
import type { ApiResponse, Vehicle, CreateVehicleData } from '../types';

class VehicleService {
  async getVehicles(): Promise<ApiResponse<Vehicle[]>> {
    return apiService.get('/vehicle/all');
  }

  async getVehicle(id: string): Promise<ApiResponse<Vehicle>> {
    return apiService.get(`/vehicle/${id}`);
  }

  async createVehicle(data: CreateVehicleData): Promise<ApiResponse<Vehicle>> {
    // Match the structure from AddVehicle.js
    const payload = {
      name: data.name,
      number: data.number,
      totalSeats: data.totalSeats,
      vendor: data.vendor, // vendor ID
    };
    return apiService.post('/vehicle/add', payload);
  }

  async updateVehicle(id: string, data: Partial<CreateVehicleData>): Promise<ApiResponse<Vehicle>> {
    // Match the structure from AddVehicle.js
    const payload = {
      name: data.name,
      number: data.number,
      totalSeats: data.totalSeats,
      vendor: data.vendor, // vendor ID
    };
    return apiService.patch(`/vehicle/${id}`, payload);
  }

  async deleteVehicle(id: string): Promise<ApiResponse<void>> {
    return apiService.post('/vehicle/deleteMultiple', { ids: [id] });
  }

  async deleteVehicles(ids: string[]): Promise<ApiResponse<void>> {
    return apiService.post('/vehicle/deleteMultiple', { ids });
  }
}

export const vehiclesService = new VehicleService();