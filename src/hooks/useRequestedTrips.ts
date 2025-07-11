import { useState, useEffect, useCallback } from 'react';
import { requestedTripsService } from '../services';
import type { RequestedTrip } from '../types';
import toast from 'react-hot-toast';

export const useRequestedTrips = () => {
  const [requestedTrips, setRequestedTrips] = useState<RequestedTrip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequestedTrips = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await requestedTripsService.getRequestedTrips();
      if (response.success) {
        setRequestedTrips(response.result.items);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch requested trips');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequestedTrips();
  }, [fetchRequestedTrips]);

  return {
    requestedTrips,
    loading,
    error,
    fetchRequestedTrips
  };
};
