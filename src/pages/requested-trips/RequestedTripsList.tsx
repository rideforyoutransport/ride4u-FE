import React from 'react';
import { Card, CardContent } from '../../components/ui';
import { DataTable } from '../../components/common';
import { useRequestedTrips } from '../../hooks';
import { formatDate } from '../../utils/formatters';
import type { RequestedTrip } from '../../types';

export const RequestedTripsList: React.FC = () => {
  const { requestedTrips, loading } = useRequestedTrips();

  const columns = [
    {
      key: 'route',
      header: 'Route',
      render: (trip: RequestedTrip) => 
        `${trip.origin?.name || 'N/A'} → ${trip.destination?.name || 'N/A'}`,
    },
    {
      key: 'totalSeats' as keyof RequestedTrip,
      header: 'Seats Required',
      render: (trip: RequestedTrip) => trip.totalSeats,
    },
    {
      key: 'requestDate' as keyof RequestedTrip,
      header: 'Request Date',
      render: (trip: RequestedTrip) => formatDate(trip.requestDate),
    },
    {
      key: 'requestingUser',
      header: 'Requesting User',
      render: (trip: RequestedTrip) => trip.requestingUser?.name || 'N/A',
    },
    {
      key: 'mobile',
      header: 'User Phone Number',
      render: (trip: RequestedTrip) => trip.mobile!= ""? trip.mobile : trip.requestingUser.phoneNumber,
    },
    {
      key: 'created' as keyof RequestedTrip,
      header: 'Created On',
      render: (trip: RequestedTrip) => formatDate(trip.created),
    }
  ];

  // Ensure data is always an array, even if undefined or null
  const safeRequestedTrips = requestedTrips || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Requested Trips</h1>
      </div>

      <Card>
        <CardContent>
          <DataTable
            title='Requested Trips'
            data={safeRequestedTrips}
            columns={columns}
            loading={loading}
            emptyMessage="No trip requests found"
          />
        </CardContent>
      </Card>
    </div>
  );
};