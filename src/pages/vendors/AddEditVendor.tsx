import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui';
import { VendorForm } from '../../components/forms';
import { useVendors } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import type { CreateVendorData, UpdateVendorData } from '../../types';

export const AddEditVendor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const { createVendor, updateVendor, getVendor, loading } = useVendors();
  
  const [initialData, setInitialData] = useState<Partial<CreateVendorData | UpdateVendorData>>();

  useEffect(() => {
    if (isEdit && id) {
      const loadVendor = async () => {
        const vendor = await getVendor(id);
        if (vendor) {
          setInitialData({
            name: vendor.name,
            email: vendor.email,
            phoneNumber: vendor.phoneNumber,
          });
        }
      };
      loadVendor();
    }
  }, [isEdit, id, getVendor]);

  const handleSubmit = async (data: CreateVendorData | UpdateVendorData) => {
    try {
      if (isEdit && id) {
        await updateVendor(id, data);
      } else {
        await createVendor(data as CreateVendorData);
      }
      navigate(ROUTES.VENDORS);
    } catch (error) {
      console.error('Error saving vendor:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate(ROUTES.VENDORS)}
        />
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Vendor' : 'Add New Vendor'}
        </h1>
      </div>

      <VendorForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={loading}
        isEdit={isEdit}
      />
    </div>
  );
};
