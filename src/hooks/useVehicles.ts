import { useState, useEffect, useCallback } from 'react';
import { vehiclesService } from '../services';
import type { Vehicle, CreateVehicleData } from '../types';
import toast from 'react-hot-toast';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await vehiclesService.getVehicles();
      if (response.success) {
        setVehicles(response.result);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  }, []);

  const getVehicle = useCallback(async (id: string): Promise<Vehicle | null> => {
    try {
      const response = await vehiclesService.getVehicle(id);
      if (response.success) {
        return response.result;
      }
      return null;
    } catch (err: any) {
      toast.error('Failed to fetch vehicle');
      return null;
    }
  }, []);

  const createVehicle = useCallback(async (data: CreateVehicleData) => {
    try {
      setLoading(true);
      const response = await vehiclesService.createVehicle(data);
      if (response.success) {
        toast.success('Vehicle created successfully');
        await fetchVehicles(); // Refresh the list
        return response.result;
      }
    } catch (err: any) {
      toast.error('Failed to create vehicle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchVehicles]);

  const updateVehicle = useCallback(async (id: string, data: CreateVehicleData) => {
    try {
      setLoading(true);
      const response = await vehiclesService.updateVehicle(id, data);
      if (response.success) {
        toast.success('Vehicle updated successfully');
        await fetchVehicles(); // Refresh the list
        return response.result;
      }
    } catch (err: any) {
      toast.error('Failed to update vehicle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchVehicles]);

  const deleteVehicle = useCallback(async (id: string) => {
    try {
      const response = await vehiclesService.deleteVehicle(id);
      if (response.success) {
        toast.success('Vehicle deleted successfully');
        await fetchVehicles(); // Refresh the list
      }
    } catch (err: any) {
      toast.error('Failed to delete vehicle');
    }
  }, [fetchVehicles]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    loading,
    error,
    fetchVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  };
};
