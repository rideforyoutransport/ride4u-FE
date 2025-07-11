import { useState, useEffect, useCallback } from 'react';
import { bookingsService } from '../services';
import type { Booking } from '../types';
import toast from 'react-hot-toast';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingsService.getAll();
      if (response.success) {
        setBookings(response.result);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    fetchBookings
  };
};
