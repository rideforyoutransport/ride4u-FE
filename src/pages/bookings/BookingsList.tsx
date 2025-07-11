import React, { useState } from 'react';
import { Eye, Download } from 'lucide-react';
import { Button, Card, CardHeader, CardContent } from '../../components/ui';
import { DataTable, SearchInput } from '../../components/common';
import { useBookings } from '../../hooks';
import { formatDate, formatCurrency } from '../../utils/formatters';
import type { Booking } from '../../types';

export const BookingsList: React.FC = () => {
  const { bookings, loading } = useBookings();
  const [searchTerm, setSearchTerm] = useState('');

  // Fix: Type the columns properly for the DataTable
  const columns = [
    {
      key: 'route',
      header: 'Route',
      render: (booking: any) => 
        `${booking.from?.name || 'N/A'} → ${booking.to?.name || 'N/A'}`,
    },
    {
      key: 'tripDate',
      header: 'Trip Date',
      render: (booking: any) => formatDate(booking.bookingDate),
    },
    {
      key: 'luggageOpted',
      header: 'Luggage Type',
      render: (booking: any) => String(booking.luggageTypeOpted).toUpperCase(),
    },
    {
      key: 'refreshmentsOpted',
      header: 'Refreshments Opted?',
      render: (booking: any) => booking.refreshmentsOpted? "Yes": "No",
    },
    {
      key: 'vehicle',
      header: 'Vehicle',
      render: (booking: any) => booking.vehicle?.name || 'N/A',
    },
    {
      key: 'totalSeatsBooked',
      header: 'Seats',
      render: (booking: any) => booking.totalSeatsBooked,
    },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      render: (booking: any) => formatCurrency(booking.totalAmount || 0),
    },
    {
      key: 'amountPaid',
      header: 'Paid',
      render: (booking: any) => formatCurrency(booking.amountPaid || 0),
    },
    {
      key: 'amountLeft',
      header: 'Balance',
      render: (booking: any) => formatCurrency(booking.amountLeft || 0),
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (booking: any) => booking.rating ? `${booking.rating}/5` : 'No rating',
    },
    {
      key: 'review',
      header: 'Review',
      render: (booking: any) => booking.review,
    },
    {
      key: 'paymentId',
      header: 'Payment ID',
      render: (booking: any) => booking.paymentID,
    },
    {
      key: 'tip',
      header: 'Tip',
      render: (booking: any) => booking.tipAmount,
    },
    {
      key: 'tipId',
      header: 'Tip Payment ID',
      render: (booking: any) => booking.tipPaymentId,
    },
    {
      key: 'bookingDate',
      header: 'Booking Date',
      render: (booking: any) => formatDate(booking.created),
    },
  ];

  const filteredBookings = bookings.filter((booking: Booking) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.id.toLowerCase().includes(searchLower) ||
      booking.from?.name?.toLowerCase().includes(searchLower) ||
      booking.to?.name?.toLowerCase().includes(searchLower) ||
      booking.vehicle?.name?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">All Bookings</h2>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search bookings..."
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            title='Bookings'
            data={filteredBookings}
            columns={columns}
            loading={loading}
            emptyMessage="No bookings found"
          />
        </CardContent>
      </Card>
    </div>
  );
};

// ====================
// Alternative: Better DataTable Component (Generic)
// Update your DataTable component to be generic
// ====================

// src/components/common/DataTable.tsx
