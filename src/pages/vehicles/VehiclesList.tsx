import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button, Card, CardHeader, CardContent } from '../../components/ui';
import { DataTable, EmptyState, SearchInput } from '../../components/common';
import { useVehicles } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import type { Vehicle } from '../../types';

export const VehiclesList: React.FC = () => {
  const navigate = useNavigate();
  const { vehicles, loading, deleteVehicle } = useVehicles();
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'name' as keyof Vehicle,
      header: 'Vehicle Name',
      render: (vehicle: Vehicle) => vehicle.name,
    },
    {
      key: 'number' as keyof Vehicle,
      header: 'Number',
      render: (vehicle: Vehicle) => vehicle.number,
    },
    {
      key: 'totalSeats' as keyof Vehicle,
      header: 'Total Seats',
      render: (vehicle: Vehicle) => vehicle.totalSeats,
    },
    {
      key: 'totalTrips' as keyof Vehicle,
      header: 'Total Trips',
      render: (vehicle: Vehicle) => vehicle.totalTrips,
    },
    {
      key: 'created' as keyof Vehicle,
      header: 'Added',
      render: (vehicle: Vehicle) => formatDate(vehicle.created),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (vehicle: Vehicle) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Edit}
            onClick={() => navigate(`${ROUTES.EDIT_VEHICLE}/${vehicle.id}`)}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => deleteVehicle(vehicle.id)}
            className="text-red-600 hover:text-red-700"
          />
        </div>
      ),
    },
  ];

  const filteredVehicles = vehicles.filter((vehicle: any) =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => navigate(ROUTES.ADD_VEHICLE)}
        >
          Add Vehicle
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">All Vehicles</h2>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search vehicles..."
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredVehicles.length === 0 && !loading ? (
            <EmptyState
              title="No vehicles found"
              description="Get started by adding your first vehicle"
              action={{
                label: "Add Vehicle",
                onClick: () => navigate(ROUTES.ADD_VEHICLE),
                icon: Plus,
              }}
            />
          ) : (
            <DataTable
              title='Vehicles'
              data={filteredVehicles}
              columns={columns}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};