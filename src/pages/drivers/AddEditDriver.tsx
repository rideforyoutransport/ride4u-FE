import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui';
import { DriverForm } from '../../components/forms';
import { PageLoading } from '../../components/ui';
import { useDrivers, useVendors } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import type { CreateDriverData, UpdateDriverData } from '../../types';

export const AddEditDriver: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const { createDriver, updateDriver, getDriver, loading } = useDrivers();
  const { vendors, loading: vendorsLoading } = useVendors();
  
  const [initialData, setInitialData] = useState<Partial<CreateDriverData | UpdateDriverData>>();

  useEffect(() => {
    if (vendors.length > 0) {
      const vendor = vendors[0];
      if (isEdit && id) {
        const loadDriver = async () => {
          const driver = await getDriver(id);
          if (driver) {
            setInitialData({
              name: driver.name,
              email: driver.email,
              number: driver.number,
              vendorId: vendor.id
            });
          }
        };
        loadDriver();
      }
    }
  }, [isEdit, id, getDriver, vendors]);

  const handleSubmit = async (data: CreateDriverData | UpdateDriverData) => {
    try {
      if (isEdit && id) {
        await updateDriver(id, data);
      } else {
        await createDriver(data as CreateDriverData);
      }
      navigate(ROUTES.DRIVERS);
    } catch (error) {
      console.error('Error saving driver:', error);
    }
  };

  // Show loading while vendors are being fetched
  if (vendorsLoading || vendors.length === 0) {
    return <PageLoading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate(ROUTES.DRIVERS)}
        />
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Driver' : 'Add New Driver'}
        </h1>
      </div>

      <DriverForm
        initialData={initialData}
        vendor={vendors[0]}
        onSubmit={handleSubmit}
        loading={loading}
        isEdit={isEdit}
      />
    </div>
  );
};