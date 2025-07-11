import { apiService } from './api';
import type { ApiResponse, RequestedTrip, QueryParams } from '../types';

let data = {
  "expandKeys": {
      "origin": [],
      "destination": [],
      "requestingUser": []
  }
}

class RequestedTripService {
  async getRequestedTrips(params?: QueryParams): Promise<ApiResponse<{ items: RequestedTrip[] }>> {
    return apiService.post('/requestedTrips/all', data);
  }
}

export const requestedTripsService = new RequestedTripService();