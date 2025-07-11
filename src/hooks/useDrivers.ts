import { useState, useEffect, useCallback } from 'react';
import { driversService } from '../services';
import type { Driver, CreateDriverData, UpdateDriverData } from '../types';
import toast from 'react-hot-toast';

export const useDrivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDrivers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await driversService.getAll();
      if (response.success) {
        setDrivers(response.result.items);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch drivers');
    } finally {
      setLoading(false);
    }
  }, []);

  const getDriver = useCallback(async (id: string): Promise<Driver | null> => {
    try {
      const response = await driversService.getDriver(id);
      if (response.success) {
        return response.result;
      }
      return null;
    } catch (err: any) {
      toast.error('Failed to fetch vehicle');
      return null;
    }
  }, []);

  const createDriver = useCallback(async (data: CreateDriverData) => {
    try {
      setLoading(true);
      console.log(data);
      const response = await driversService.create(data);
      if (response.success) {
        toast.success('Driver created successfully');
        await fetchDrivers(); // Refresh the list
        return response.result;
      }
    } catch (err: any) {
      toast.error('Failed to create driver');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchDrivers]);

  const updateDriver = useCallback(async (id: string, data: UpdateDriverData) => {
    try {
      setLoading(true);
      const response = await driversService.update(id, data);
      if (response.success) {
        toast.success('Driver updated successfully');
        await fetchDrivers(); // Refresh the list
        return response.result;
      }
    } catch (err: any) {
      toast.error('Failed to update driver');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchDrivers]);

  const deleteDriver = useCallback(async (id: string) => {
    try {
      const response = await driversService.delete(id);
      if (response.success) {
        toast.success('Driver deleted successfully');
        await fetchDrivers(); // Refresh the list
      }
    } catch (err: any) {
      toast.error('Failed to delete driver');
    }
  }, [fetchDrivers]);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  return {
    drivers,
    loading,
    error,
    fetchDrivers,
    createDriver,
    updateDriver,
    deleteDriver,
    getDriver
  };
};
