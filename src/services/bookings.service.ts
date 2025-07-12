import { apiService } from './api';
import { Booking, QueryParams } from '../types';

let getData = {
  "from": 0,
  "to": 50,
  "expandKeys": {
    "from": [],
    "to": [],
    "vehicle": [],
    "stops": [],
    "user": ["name", "number"],
    "driver": ["name", "id", "number", "rating"],
  }
}

export const bookingsService = {
  async getAll(params?: QueryParams) {
    const response = await apiService.post<Booking[]>('/booking/all', getData);
    return response;
  },

  async getAllByTrip(params?: QueryParams& { tripId?: string }) {
    let data = {...getData, tripId: params?.tripId};
    const response = await apiService.post<Booking[]>('/booking/all/byTrip', data);
    return response;
  },
};
