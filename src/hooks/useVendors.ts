import { useState, useEffect, useCallback } from 'react';
import { vendorsService } from '../services';
import type { Vendor, CreateVendorData, UpdateVendorData } from '../types';
import toast from 'react-hot-toast';

export const useVendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVendors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await vendorsService.getVendors();
      if (response.success) {
        console.log(response.result.items)
        setVendors(response.result.items);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  }, []);

  const getVendor = useCallback(async (id: string): Promise<Vendor | null> => {
    try {
      const response = await vendorsService.getVendor(id);
      if (response.success) {
        return response.result;
      }
      return null;
    } catch (err: any) {
      toast.error('Failed to fetch vendor');
      return null;
    }
  }, []);

  const createVendor = useCallback(async (data: CreateVendorData) => {
    try {
      setLoading(true);
      const response = await vendorsService.createVendor(data);
      if (response.success) {
        toast.success('Vendor created successfully');
        await fetchVendors(); // Refresh the list
        return response.result;
      }
    } catch (err: any) {
      toast.error('Failed to create vendor');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchVendors]);

  const updateVendor = useCallback(async (id: string, data: UpdateVendorData) => {
    try {
      setLoading(true);
      const response = await vendorsService.updateVendor(id, data);
      if (response.success) {
        toast.success('Vendor updated successfully');
        await fetchVendors(); // Refresh the list
        return response.result;
      }
    } catch (err: any) {
      toast.error('Failed to update vendor');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchVendors]);

  const deleteVendor = useCallback(async (id: string) => {
    try {
      const response = await vendorsService.deleteVendor(id);
      if (response.success) {
        toast.success('Vendor deleted successfully');
        await fetchVendors(); // Refresh the list
      }
    } catch (err: any) {
      toast.error('Failed to delete vendor');
    }
  }, [fetchVendors]);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  return {
    vendors,
    loading,
    error,
    fetchVendors,
    getVendor,
    createVendor,
    updateVendor,
    deleteVendor,
  };
};
