import { useState, useEffect, useCallback } from 'react';
import { tripsService } from '../services';
import type { Trip, CreateTripData } from '../types';
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
        setTrips(response.result);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  }, []);

  const getTrip = useCallback(async (id: string): Promise<Trip | null> => {
    try {
      const response = await tripsService.getById(id);
      if (response.success) {
        return response.result;
      }
      return null;
    } catch (err: any) {
      toast.error('Failed to fetch trip');
      return null;
    }
  }, []);

  const createTrip = useCallback(async (data: CreateTripData) => {
    try {
      setLoading(true);
      const response = await tripsService.create(data);
      if (response.success) {
        toast.success('Trip created successfully');
        await fetchTrips(); // Refresh the list
        return response.result;
      }
    } catch (err: any) {
      toast.error('Failed to create trip');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTrips]);

  const updateTrip = useCallback(async (id: string, data: CreateTripData) => {
    try {
      setLoading(true);
      const response = await tripsService.update(id, data);
      if (response.success) {
        toast.success('Trip updated successfully');
        await fetchTrips(); // Refresh the list
        return response.result;
      }
    } catch (err: any) {
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
      }
    } catch (err: any) {
      toast.error('Failed to delete trip');
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
  };
};
