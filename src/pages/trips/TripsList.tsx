import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Button, Card, CardHeader, CardContent } from '../../components/ui';
import { DataTable, EmptyState, SearchInput } from '../../components/common';
import { useTrips } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import { formatDate, formatCurrency } from '../../utils/formatters';
import type { Trip } from '../../types';

export const TripsList: React.FC = () => {
  const navigate = useNavigate();
  const { trips, loading, deleteTrip } = useTrips();
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'id' as keyof Trip,
      header: 'Trip ID',
      render: (trip: Trip) => `#${trip.id}`,
    },
    {
      key: 'tripDescription' as keyof Trip,
      header: 'Description',
      render: (trip: Trip) => trip.tripDescription || 'No description',
    },
    {
      key: 'from' as keyof Trip,
      header: 'From',
      render: (trip: Trip) => trip.from?.name || 'N/A',
    },
    {
      key: 'to' as keyof Trip,
      header: 'To',
      render: (trip: Trip) => trip.to?.name || 'N/A',
    },
    {
      key: 'tripDate' as keyof Trip,
      header: 'Date',
      render: (trip: Trip) => formatDate(trip.tripDate),
    },
    {
      key: 'totalTripAmount' as keyof Trip,
      header: 'Amount',
      render: (trip: Trip) => formatCurrency(trip.totalTripAmount || 0),
    },
    {
      key: 'vehicle' as keyof Trip,
      header: 'Vehicle',
      render: (trip: Trip) => trip.vehicle?.name || 'N/A',
    },
    {
      key: 'driver' as keyof Trip,
      header: 'Driver',
      render: (trip: Trip) => trip.driver?.name || 'N/A',
    },
    {
      key: 'bookingAmount' as keyof Trip,
      header: 'Booking Amount',
      render: (trip: Trip) => formatCurrency(trip.bookingMinimumAmount || 0),
    },
    {
      key: 'seats' as keyof Trip,
      header: 'Seats',
      render: (trip: Trip) => trip.totalSeats,
    },
    {
      key: 'luggage' as keyof Trip,
      header: 'Luggage',
      render: (trip: Trip) => trip.luggage,
    },
    {
      key: 'refreshments' as keyof Trip,
      header: 'Refreshments Available',
      render: (trip: Trip) => trip.refreshments?"Yes": "No",
    },
    {
      key: 'stops' as keyof Trip,
      header: 'Stops',
      render: (trip: Trip) => trip.stops.map(stop => stop.name).join(', '),
    },
    {
      key: 'returnTrip' as keyof Trip,
      header: 'Is Return Trip?',
      render: (trip: Trip) => trip.returnTrip != null ? "No" : "Yes",
    },
    {
      key: 'createdAt' as keyof Trip,
      header: 'Created At',
      render: (trip: Trip) => formatDate(trip.created),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (trip: Trip) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Eye}
            onClick={() => navigate(`${ROUTES.VIEW_TRIP}/${trip.id}`)}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Edit}
            onClick={() => navigate(`${ROUTES.EDIT_TRIP}/${trip.id}`)}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => deleteTrip(trip.id)}
            className="text-red-600 hover:text-red-700"
          />
        </div>
      ),
    },
  ];

  const filteredTrips = trips.filter(trip =>
    trip.tripDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.from?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.to?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Trips</h1>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => navigate(ROUTES.ADD_TRIP)}
        >
          Add Trip
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">All Trips</h2>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search trips..."
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredTrips.length === 0 && !loading ? (
            <EmptyState
              title="No trips found"
              description="Get started by creating your first trip"
              action={{
                label: "Add Trip",
                onClick: () => navigate(ROUTES.ADD_TRIP),
                icon: Plus,
              }}
            />
          ) : (
            <DataTable
              title='Trips'
              data={filteredTrips}
              columns={columns}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
