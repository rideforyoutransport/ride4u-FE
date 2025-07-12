import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui';
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
      render: (booking: Booking) => {
        const getCityName = (fullName: string) => fullName.split(',')[0].trim();
        const fromName = booking.from?.name ? getCityName(booking.from.name) : 'N/A';
        const toName = booking.to?.name ? getCityName(booking.to.name) : 'N/A';
        return `${fromName} → ${toName}`;
      },
    },
    {
      key: 'tripDate',
      header: 'Trip Date',
      render: (booking: Booking) => formatDate(booking.bookingDate),
    },
    {
      key: 'luggageOpted',
      header: 'Luggage Type',
      render: (booking: Booking) => String(booking.luggageTypeOpted).toUpperCase(),
    },
    {
      key: 'refreshmentsOpted',
      header: 'Refreshments Opted?',
      render: (booking: Booking) => booking.refreshmentsOpted ? "Yes" : "No",
    },
    {
      key: 'vehicle',
      header: 'Vehicle',
      render: (booking: Booking) => booking.vehicle?.name || 'N/A',
    },
    {
      key: 'totalSeatsBooked',
      header: 'Seats',
      render: (booking: Booking) => booking.totalSeatsBooked,
    },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      render: (booking: Booking) => formatCurrency(booking.totalAmount || 0),
    },
    {
      key: 'amountPaid',
      header: 'Paid',
      render: (booking: Booking) => formatCurrency(booking.amountPaid || 0),
    },
    {
      key: 'amountLeft',
      header: 'Balance',
      render: (booking: Booking) => formatCurrency(booking.amountLeft || 0),
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (booking: Booking) => booking.rating ? `${booking.rating}/5` : '--',
    },
    {
      key: 'review',
      header: 'Review',
      className: 'max-w-xs',
      render: (booking: Booking) => {
        if (!booking.review) return '--';

        // Function to truncate text to 20 words
        const truncateToWords = (text: string, wordLimit: number = 20) => {
          if (text.length <= wordLimit) return text;
          return text.slice(0, wordLimit) + '...';
        };

        const truncatedReview = truncateToWords(booking.review, 20);
        const isLongReview = booking.review.length > 20;

        return (
          <div className="max-w-xs relative group">
            <p className="text-sm text-gray-900 cursor-pointer">
              {truncatedReview}
            </p>

            {/* Tooltip that shows on the right side */}
            {isLongReview && (
              <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-[9999] bg-gray-800 text-white text-sm rounded-lg p-4 shadow-xl w-max max-w-lg whitespace-pre-wrap border border-gray-600">
                {booking.review}
                {/* Arrow pointing left */}
                <div className="absolute right-full top-4 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800"></div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'paymentId',
      header: 'Payment ID',
      render: (booking: Booking) => booking.paymentID ? booking.paymentID : '--',
    },
    {
      key: 'tip',
      header: 'Tip',
      render: (booking: Booking) => booking.tipAmount,
    },
    {
      key: 'tipId',
      header: 'Tip Payment ID',
      render: (booking: Booking) => booking.tipPaymentID,
    },
    {
      key: 'bookingDate',
      header: 'Booking Date',
      render: (booking: Booking) => formatDate(booking.created),
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
