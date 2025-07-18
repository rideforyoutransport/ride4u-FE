import { apiService } from './api';
import { Trip, QueryParams } from '../types';

export const tripsService = {

  async getAll(params?: QueryParams & { page?: number; limit?: number }) {
    const page = params?.page || 1;
    const limit = params?.limit || 20;

    // Calculate pagination correctly
    const from = (page - 1) * limit;  // Page 1: 0, Page 2: 20, Page 3: 40
    const to = from + limit;          // Page 1: 20, Page 2: 40, Page 3: 60

    const getData = {
      "from": from,
      "to": to,
      "expandKeys": {
        "from": ["name", "id", "place_id", "geoLocation"],
        "to": ["name", "id", "place_id", "geoLocation"],
        "driver": ["name", "id", "number"],
        "vehicle": [],
        "stops": ["name", "id", "place_id", "geoLocation"],
        "vendor": []
      }
    };

    // Add debugging to see what's actually being sent
    console.log(`🔍 Pagination Debug - Page: ${page}, Limit: ${limit}, From: ${from}, To: ${to}`);

    const response = await apiService.post<{ items: Trip[]; total?: number }>('/trips/all', getData);
    console.log(`📄 API Response:`, response);

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