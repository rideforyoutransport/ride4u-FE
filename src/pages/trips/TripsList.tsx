import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2, Share } from 'lucide-react';
import { Button, Card, CardHeader, CardContent } from '../../components/ui';
import { DataTable, EmptyState, SearchInput } from '../../components/common';
import { useTrips } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import type { Trip } from '../../types';
import toast from 'react-hot-toast';

export const TripsList: React.FC = () => {
  const navigate = useNavigate();
  const { 
    trips, 
    loading, 
    deleteTrip,
    currentPage,
    totalPages,
    totalCount,
    limit,
    changePage,
    changeLimit
  } = useTrips();
  const [searchTerm, setSearchTerm] = useState('');

  const handleShareTrip = async (trip: Trip) => {
    const shareUrl = `https://admin.rideforyoutransport.com/trip/${trip.id}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert("Link has not been copied to Clipboard!");
    }
  };

  const columns = [
    {
      key: 'route' as keyof Trip,
      header: 'Route',
      render: (trip: Trip) => {
        const getCityName = (fullName: string) => fullName.split(',')[0].trim();
        const fromName = trip.from?.name ? getCityName(trip.from.name) : 'N/A';
        const toName = trip.to?.name ? getCityName(trip.to.name) : 'N/A';
        return `${fromName} → ${toName}`;
      },
    },
    {
      key: 'tripDate' as keyof Trip,
      header: 'Date',
      render: (trip: Trip) => formatDate(trip.tripDate),
    },
    {
      key: 'driver' as keyof Trip,
      header: 'Driver',
      render: (trip: Trip) => trip.driver?.name || 'N/A',
    },
    {
      key: 'returnTrip' as keyof Trip,
      header: 'Is Return Trip?',
      render: (trip: Trip) => trip.returnTrip != null ? "Yes" : "No",
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
            icon={Share}
            onClick={() => handleShareTrip(trip)}
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

  // Filter trips on frontend for search functionality
  // Note: For production, you might want to implement search on backend as well
  const filteredTrips = trips.filter(trip =>
    trip.from?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.to?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginationInfo = {
    currentPage,
    totalPages,
    totalCount,
    limit,
  };

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
              pagination={paginationInfo}
              onPageChange={changePage}
              onLimitChange={changeLimit}
              pageSizeOptions={[10, 20, 50, 100]}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};