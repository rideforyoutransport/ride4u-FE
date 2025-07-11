import { apiService } from './api';
import { Booking, QueryParams } from '../types';

let data = {
  "from": 0,
  "to": 5,
  "expandKeys": {
    "from": [],
    "to": [],
    "vehicle": [],
    "stops": [],
    "driver": ["name", "id", "number", "rating"],
  }
}

export const bookingsService = {
  async getAll(params?: QueryParams) {
    const response = await apiService.post<Booking[]>('/booking/all', data);
    return response;
  },
};
