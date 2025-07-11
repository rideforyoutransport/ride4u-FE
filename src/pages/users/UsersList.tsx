import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button, Card, CardHeader, CardContent } from '../../components/ui';
import { DataTable, EmptyState, SearchInput } from '../../components/common';
import { useUsers } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import type { User } from '../../types';

export const UsersList: React.FC = () => {
  const navigate = useNavigate();
  const { users, loading } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'name' as keyof User,
      header: 'Name',
      render: (user: User) => user.name,
    },
    {
      key: 'email' as keyof User,
      header: 'Email',
      render: (user: User) => user.email,
    },
    {
      key: 'phoneNumber' as keyof User,
      header: 'Phone',
      render: (user: User) => user.phoneNumber || 'N/A',
    },
    {
      key: 'totalTrips' as keyof User,
      header: 'Total Trips',
      render: (user: User) => user.totalTrips,
    },
    {
      key: 'created' as keyof User,
      header: 'Joined',
      render: (user: User) => formatDate(user.created),
    },
  ];

  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNumber?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">All Users</h2>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search users..."
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 && !loading ? (
            <EmptyState
              title="No users found"
              description="Get started by adding your first user"
              action={{
                label: "Add User",
                onClick: () => navigate(ROUTES.ADD_USER),
                icon: Plus,
              }}
            />
          ) : (
            <DataTable
              title='Users'
              data={filteredUsers}
              columns={columns}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};