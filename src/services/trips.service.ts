import { apiService } from './api';
import { Trip, CreateTripData, QueryParams } from '../types';

let getData = {
  "from": 0,
  "to": 500,
  "expandKeys": {
    "from": [
      "name",
      "id",
      "place_id",
      "geoLocation"
    ],
    "to": [
      "name",
      "id",
      "place_id",
      "geoLocation"
    ],
    "vehicle": [],
    "stops": [
      "name",
      "id",
      "place_id",
      "geoLocation"
    ],
    "driver": ["name", "id", "number", "rating"],
    "vendor": [],
  }
}

export const tripsService = {

  async getAll(params?: QueryParams) {
    const response = await apiService.post<Trip[]>('/trips/all', getData);
    return response;
  },

  async getById(id: string) {
    const response = await apiService.get<Trip>(`/trips/${id}`);
    return response;
  },

  async create(data: CreateTripData) {
    const response = await apiService.post<Trip>('/trips/add', data);
    return response;
  },

  async update(id: string, data: Partial<CreateTripData>) {
    const response = await apiService.patch<Trip>(`/trips/${id}`, data);
    return response;
  },

  async delete(id: string) {
    const response = await apiService.post('/trips/deleteMultiple', { ids: [id] });
    return response;
  },

  async deleteMultiple(ids: string[]) {
    const response = await apiService.post('/trips/deleteMultiple', { ids });
    return response;
  },
};
