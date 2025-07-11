import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2, Building } from 'lucide-react';
import { Button, Card, CardHeader, CardContent } from '../../components/ui';
import { DataTable, EmptyState, SearchInput } from '../../components/common';
import { useVendors } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import type { Vendor } from '../../types';

export const VendorsList: React.FC = () => {
  const navigate = useNavigate();
  const { vendors, loading, deleteVendor } = useVendors();
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'name' as keyof Vendor,
      header: 'Company Name',
      render: (vendor: Vendor) => (
        <div className="flex items-center">
          <Building className="w-4 h-4 mr-2 text-gray-400" />
          {vendor.name}
        </div>
      ),
    },
    {
      key: 'email' as keyof Vendor,
      header: 'Email',
      render: (vendor: Vendor) => vendor.email,
    },
    {
      key: 'phoneNumber' as keyof Vendor,
      header: 'Phone',
      render: (vendor: Vendor) => vendor.phoneNumber || 'N/A',
    },
    {
      key: 'created' as keyof Vendor,
      header: 'Added',
      render: (vendor: Vendor) => formatDate(vendor.created),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (vendor: Vendor) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Eye}
            onClick={() => console.log('View vendor', vendor.id)}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Edit}
            onClick={() => navigate(`${ROUTES.EDIT_VENDOR}/${vendor.id}`)}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => deleteVendor(vendor.id)}
            className="text-red-600 hover:text-red-700"
          />
        </div>
      ),
    },
  ];

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.phoneNumber?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => navigate(ROUTES.ADD_VENDOR)}
        >
          Add Vendor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">All Vendors</h2>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search vendors..."
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredVendors.length === 0 && !loading ? (
            <EmptyState
              title="No vendors found"
              description="Get started by adding your first vendor"
              action={{
                label: "Add Vendor",
                onClick: () => navigate(ROUTES.ADD_VENDOR),
                icon: Plus,
              }}
            />
          ) : (
            <DataTable
              title='Vendors'
              data={filteredVendors}
              columns={columns}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
