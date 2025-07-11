import React, { useState } from 'react';
import { Check, X, Eye, Clock } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Badge } from '../../components/ui';
import { DataTable, SearchInput } from '../../components/common';
import { useRequestedTrips } from '../../hooks';
import { formatDate, formatCurrency } from '../../utils/formatters';
import type { RequestedTrip } from '../../types';

export const RequestedTripsList: React.FC = () => {
  const { requestedTrips, loading } = useRequestedTrips();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'warning' as const,
      approved: 'success' as const,
      rejected: 'error' as const,
    };
    return <Badge variant={variants[status as keyof typeof variants] || 'default'}>{status}</Badge>;
  };

  const columns = [
    {
      key: 'route',
      header: 'Route',
      render: (trip: RequestedTrip) => 
        `${trip.fromLocation} → ${trip.toLocation}`,
    },
    {
      key: 'requestedDate' as keyof RequestedTrip,
      header: 'Trip Date',
      render: (trip: RequestedTrip) => formatDate(trip.requestedDate),
    }
  ];

  const filteredTrips = requestedTrips.filter((trip: any) => {
    const matchesSearch = 
      trip.fromLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.toLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || trip.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingCount = requestedTrips.filter(((trip: any) => trip.status === 'pending')).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Requested Trips</h1>
          {pendingCount > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              <Clock className="inline w-4 h-4 mr-1" />
              {pendingCount} pending request{pendingCount !== 1 ? 's' : ''} awaiting approval
            </p>
          )}
        </div>
      </div>

      <Card>
        <CardContent>
          <DataTable
            title='Requested Trips'
            data={filteredTrips}
            columns={columns}
            loading={loading}
            emptyMessage="No trip requests found"
          />
        </CardContent>
      </Card>
    </div>
  );
};