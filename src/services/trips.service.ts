import { apiService } from './api';
import { Trip, CreateTripData, QueryParams } from '../types';

// Use the same data structure as your original code
const getData = {
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
};

export const tripsService = {
  async getAll(params?: QueryParams) {
    const response = await apiService.post<{ result: Trip[] }>('/trips/all', getData);
    return response;
  },

  async getById(id: string) {
    // For getting single trip, we might need to use the same expandKeys
    const expandData = {
      "expandKeys": {
        "from": ["name", "id", "place_id", "geoLocation"],
        "to": ["name", "id", "place_id", "geoLocation"],
        "vehicle": ["name", "id", "number", "totalSeats"],
        "stops": ["name", "id", "place_id", "geoLocation"],
        "driver": ["name", "id", "number", "rating"],
        "vendor": [],
      }
    };
    const response = await apiService.post<Trip>(`/trips/details/${id}`, expandData);
    return response;
  },

  async create(data: any) {
    // Transform data to match your original API structure
    const transformedData = {
      vendor: data.vendor,
      from: data.from,
      to: data.to,
      duration: data.duration || 0,
      tripDate: data.tripDate,
      vehicle: data.vehicle,
      driver: data.driver,
      luggage: data.luggage,
      stops: data.stops,
      tripDescription: data.tripDescription,
      totalTripAmount: data.totalTripAmount || 0,
      refreshments: data.refreshments,
      bookingAmount: data.bookingAmount,
      returnTrip: data.returnTrip,
      fares: data.fares,
    };
    
    const response = await apiService.post<Trip>('/trips/add', transformedData);
    return response;
  },

  async update(id: string, data: any) {
    // Transform data to match your original API structure
    const transformedData = {
      vendor: data.vendor,
      from: data.from,
      to: data.to,
      duration: data.duration || 0,
      tripDate: data.tripDate,
      vehicle: data.vehicle,
      driver: data.driver,
      luggage: data.luggage,
      stops: data.stops,
      tripDescription: data.tripDescription,
      totalTripAmount: data.totalTripAmount || 0,
      refreshments: data.refreshments,
      bookingAmount: data.bookingAmount,
      returnTrip: data.returnTrip,
      fares: data.fares,
    };
    
    const response = await apiService.patch<Trip>(`/trips/${id}`, transformedData);
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