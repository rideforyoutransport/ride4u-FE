import { useState, useEffect, useCallback } from 'react';
import { bookingsService } from '../services';
import type { Booking } from '../types';
import toast from 'react-hot-toast';

export const useBookings = () => {
  // All bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Trip-specific bookings state
  const [tripBookings, setTripBookings] = useState<Booking[]>([]);
  const [tripBookingsLoading, setTripBookingsLoading] = useState(false);
  const [tripBookingsError, setTripBookingsError] = useState<string | null>(null);

  // Fetch all bookings
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingsService.getAll();
      if (response.success) {
        setBookings(response.result);
      } else {
        setBookings([]);
      }
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err.message);
      toast.error('Failed to fetch bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch bookings by trip ID
  const fetchBookingsByTrip = useCallback(async (tripId: string) => {
    if (!tripId) {
      toast.error('Trip ID is required');
      return;
    }

    try {
      setTripBookingsLoading(true);
      setTripBookingsError(null);
      const response = await bookingsService.getAllByTrip({ tripId });
      if (response.success) {
        setTripBookings(response.result || []);
      } else {
        setTripBookings([]);
      }
    } catch (err: any) {
      console.error('Error fetching trip bookings:', err);
      setTripBookingsError(err.message);
      toast.error('Failed to fetch trip bookings');
      setTripBookings([]);
    } finally {
      setTripBookingsLoading(false);
    }
  }, []);

  // Clear trip bookings
  const clearTripBookings = useCallback(() => {
    setTripBookings([]);
    setTripBookingsError(null);
  }, []);

  // Auto-fetch all bookings on mount
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    // All bookings data
    bookings,
    loading,
    error,
    totalCount: bookings.length,
    
    // Trip-specific bookings data
    tripBookings,
    tripBookingsLoading,
    tripBookingsError,
    tripBookingsCount: tripBookings.length,
    
    // Actions
    fetchBookings,
    fetchBookingsByTrip,
    clearTripBookings,
    
    // Legacy method for backward compatibility (removes the duplicate)
    fetchBookingsByTripId: fetchBookingsByTrip
  };
};