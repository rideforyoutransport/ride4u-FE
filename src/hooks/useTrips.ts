import { useState, useEffect, useCallback } from 'react';
import { tripsService } from '../services';
import type { Trip } from '../types';
import toast from 'react-hot-toast';

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tripsService.getAll();
      if (response.success) {
        // Process trips to add name property like in original code
        const processedTrips = (Array.isArray(response.result) ? response.result : []).map((trip: any) => {
          let tripName = '';
          if (trip.returnTrip) {
            tripName = `${trip.from?.name || 'Unknown'} - ${trip.to?.name || 'Unknown'} - ${trip.from?.name || 'Unknown'}`;
          } else {
            tripName = `${trip.from?.name || 'Unknown'} - ${trip.to?.name || 'Unknown'}`;
          }
          return {
            ...trip,
            name: tripName
          };
        });
        setTrips(processedTrips);
      } else {
        setTrips([]);
      }
    } catch (err: any) {
      console.error('Error fetching trips:', err);
      setError(err.message);
      setTrips([]);
      toast.error('Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  }, []);

  const getTrip = useCallback(async (id: string): Promise<any | null> => {
    try {
      const response = await tripsService.getById(id);
      if (response.success) {
        return response.result;
      }
      return null;
    } catch (err: any) {
      console.error('Error fetching trip:', err);
      toast.error('Failed to fetch trip');
      return null;
    }
  }, []);

  const createTrip = useCallback(async (data: any) => {
    try {
      setLoading(true);
      const response = await tripsService.create(data);
      if (response.success) {
        toast.success('Trip created successfully');
        await fetchTrips(); // Refresh the list
        return response.result;
      } else {
        throw new Error('Failed to create trip');
      }
    } catch (err: any) {
      console.error('Error creating trip:', err);
      toast.error('Failed to create trip');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTrips]);

  const updateTrip = useCallback(async (id: string, data: any) => {
    try {
      setLoading(true);
      const response = await tripsService.update(id, data);
      if (response.success) {
        toast.success('Trip updated successfully');
        await fetchTrips(); // Refresh the list
        return response.result;
      } else {
        throw new Error('Failed to update trip');
      }
    } catch (err: any) {
      console.error('Error updating trip:', err);
      toast.error('Failed to update trip');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTrips]);

  const deleteTrip = useCallback(async (id: string) => {
    try {
      const response = await tripsService.delete(id);
      if (response.success) {
        toast.success('Trip deleted successfully');
        await fetchTrips(); // Refresh the list
      } else {
        throw new Error('Failed to delete trip');
      }
    } catch (err: any) {
      console.error('Error deleting trip:', err);
      toast.error('Failed to delete trip');
    }
  }, [fetchTrips]);

  const deleteMultipleTrips = useCallback(async (ids: string[]) => {
    try {
      const response = await tripsService.deleteMultiple(ids);
      if (response.success) {
        toast.success(`${ids.length} trip(s) deleted successfully`);
        await fetchTrips(); // Refresh the list
      } else {
        throw new Error('Failed to delete trips');
      }
    } catch (err: any) {
      console.error('Error deleting trips:', err);
      toast.error('Failed to delete trips');
    }
  }, [fetchTrips]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return {
    trips,
    loading,
    error,
    fetchTrips,
    getTrip,
    createTrip,
    updateTrip,
    deleteTrip,
    deleteMultipleTrips,
  };
};