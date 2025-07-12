import { useState, useEffect, useCallback } from 'react';
import { tripsService } from '../services';
import type { Trip } from '../types';
import toast from 'react-hot-toast';

interface PaginationParams {
  page: number;
  limit: number;
}

interface TripsState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}

export const useTrips = () => {
  const [state, setState] = useState<TripsState>({
    trips: [],
    loading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 20,
  });

  const fetchTrips = useCallback(async (params?: PaginationParams) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const page = params?.page || state.currentPage;
      const limit = params?.limit || state.limit;
      
      const response = await tripsService.getAll({ page, limit });
      
      if (response.success) {
        // Process trips to add name property like in original code
        const processedTrips = (Array.isArray(response.result.items) ? response.result.items : []).map((trip: any) => {
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
        
        const totalCount = response.result.total || processedTrips.length;
        const totalPages = Math.ceil(totalCount / limit);
        
        setState(prev => ({
          ...prev,
          trips: processedTrips,
          totalCount,
          currentPage: page,
          totalPages,
          limit,
        }));
      } else {
        setState(prev => ({ ...prev, trips: [], totalCount: 0, totalPages: 0 }));
      }
    } catch (err: any) {
      console.error('Error fetching trips:', err);
      setState(prev => ({ ...prev, error: err.message, trips: [], totalCount: 0, totalPages: 0 }));
      toast.error('Failed to fetch trips');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [state.currentPage, state.limit]);

  const changePage = useCallback((page: number) => {
    if (page >= 1 && page <= state.totalPages) {
      fetchTrips({ page, limit: state.limit });
    }
  }, [fetchTrips, state.totalPages, state.limit]);

  const changeLimit = useCallback((limit: number) => {
    fetchTrips({ page: 1, limit }); // Reset to first page when changing limit
  }, [fetchTrips]);

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
      setState(prev => ({ ...prev, loading: true }));
      const response = await tripsService.create(data);
      if (response.success) {
        toast.success('Trip created successfully');
        await fetchTrips({ page: 1, limit: state.limit }); // Refresh from first page
        return response.result;
      } else {
        throw new Error('Failed to create trip');
      }
    } catch (err: any) {
      console.error('Error creating trip:', err);
      toast.error('Failed to create trip');
      throw err;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [fetchTrips, state.limit]);

  const updateTrip = useCallback(async (id: string, data: any) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await tripsService.update(id, data);
      if (response.success) {
        toast.success('Trip updated successfully');
        await fetchTrips({ page: state.currentPage, limit: state.limit }); // Refresh current page
        return response.result;
      } else {
        throw new Error('Failed to update trip');
      }
    } catch (err: any) {
      console.error('Error updating trip:', err);
      toast.error('Failed to update trip');
      throw err;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [fetchTrips, state.currentPage, state.limit]);

  const deleteTrip = useCallback(async (id: string) => {
    try {
      const response = await tripsService.delete(id);
      if (response.success) {
        toast.success('Trip deleted successfully');
        
        // Check if we need to go back a page after deletion
        const newTotalCount = state.totalCount - 1;
        const newTotalPages = Math.ceil(newTotalCount / state.limit);
        const targetPage = state.currentPage > newTotalPages ? Math.max(1, newTotalPages) : state.currentPage;
        
        await fetchTrips({ page: targetPage, limit: state.limit });
      } else {
        throw new Error('Failed to delete trip');
      }
    } catch (err: any) {
      console.error('Error deleting trip:', err);
      toast.error('Failed to delete trip');
    }
  }, [fetchTrips, state.currentPage, state.limit, state.totalCount]);

  const deleteMultipleTrips = useCallback(async (ids: string[]) => {
    try {
      const response = await tripsService.deleteMultiple(ids);
      if (response.success) {
        toast.success(`${ids.length} trip(s) deleted successfully`);
        
        // Check if we need to go back a page after deletion
        const newTotalCount = state.totalCount - ids.length;
        const newTotalPages = Math.ceil(newTotalCount / state.limit);
        const targetPage = state.currentPage > newTotalPages ? Math.max(1, newTotalPages) : state.currentPage;
        
        await fetchTrips({ page: targetPage, limit: state.limit });
      } else {
        throw new Error('Failed to delete trips');
      }
    } catch (err: any) {
      console.error('Error deleting trips:', err);
      toast.error('Failed to delete trips');
    }
  }, [fetchTrips, state.currentPage, state.limit, state.totalCount]);

  useEffect(() => {
    fetchTrips();
  }, []); // Only run on mount

  return {
    // Data
    trips: state.trips,
    loading: state.loading,
    error: state.error,
    
    // Pagination info
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    totalCount: state.totalCount,
    limit: state.limit,
    
    // Actions
    fetchTrips,
    changePage,
    changeLimit,
    getTrip,
    createTrip,
    updateTrip,
    deleteTrip,
    deleteMultipleTrips,
  };
};