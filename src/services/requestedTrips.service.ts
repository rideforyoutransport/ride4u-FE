import { apiService } from './api';
import type { ApiResponse, RequestedTrip, QueryParams } from '../types';

class RequestedTripService {
  async getRequestedTrips(params?: QueryParams): Promise<ApiResponse<{ items: RequestedTrip[] }>> {
    return apiService.post('/requestedTrips/all', params || {});
  }
}

export const requestedTripsService = new RequestedTripService();