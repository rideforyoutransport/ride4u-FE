import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Button, Card, CardHeader, CardContent } from '../../components/ui';
import { DataTable, EmptyState, SearchInput } from '../../components/common';
import { useDrivers } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import type { Driver } from '../../types';

export const DriversList: React.FC = () => {
  const navigate = useNavigate();
  const { drivers, loading, deleteDriver } = useDrivers();
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'name' as keyof Driver,
      header: 'Name',
      render: (driver: Driver) => driver.name,
    },
    {
      key: 'email' as keyof Driver,
      header: 'Email',
      render: (driver: Driver) => driver.email,
    },
    {
      key: 'number' as keyof Driver,
      header: 'Phone',
      render: (driver: Driver) => driver.number,
    },
    {
      key: 'rating' as keyof Driver,
      header: 'Rating',
      render: (driver: Driver) => `${driver.rating}/5`,
    },
    {
      key: 'totalTrips' as keyof Driver,
      header: 'Total Trips',
      render: (driver: Driver) => driver.totalTrips,
    },
    {
      key: 'created' as keyof Driver,
      header: 'Joined',
      render: (driver: Driver) => formatDate(driver.created),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (driver: Driver) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Edit}
            onClick={() => navigate(`${ROUTES.EDIT_DRIVER}/${driver.id}`)}
            title="Edit Driver"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => deleteDriver(driver.id)}
            className="text-red-600 hover:text-red-700"
            title="Delete Driver"
          />
        </div>
      ),
    },
  ];

  const filteredDrivers = drivers.filter((driver: any) =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.number?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => navigate(ROUTES.ADD_DRIVER)}
        >
          Add Driver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">All Drivers</h2>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search drivers..."
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredDrivers.length === 0 && !loading ? (
            <EmptyState
              title="No drivers found"
              description="Get started by adding your first driver"
              action={{
                label: "Add Driver",
                onClick: () => navigate(ROUTES.ADD_DRIVER),
                icon: Plus,
              }}
            />
          ) : (
            <DataTable
              title='Drivers'
              data={filteredDrivers}
              columns={columns}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};