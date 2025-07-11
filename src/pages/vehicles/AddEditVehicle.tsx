import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui';
import { VehicleForm } from '../../components/forms';
import { useVehicles, useVendors } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import type { CreateVehicleData } from '../../types';

export const AddEditVehicle: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const { createVehicle, updateVehicle, getVehicle, loading } = useVehicles();
  const { vendors } = useVendors();
  
  const [initialData, setInitialData] = useState<Partial<CreateVehicleData>>();

  useEffect(() => {
    if (isEdit && id) {
      const loadVehicle = async () => {
        const vehicle = await getVehicle(id);
        if (vehicle) {
          setInitialData({
            name: vehicle.name,
            number: vehicle.number,
            totalSeats: vehicle.totalSeats,
            vendor: vehicle.vendor?.[0]?.id,
          });
        }
      };
      loadVehicle();
    }
  }, [isEdit, id, getVehicle]);

  const handleSubmit = async (data: CreateVehicleData) => {
    try {
      if (isEdit && id) {
        await updateVehicle(id, data);
      } else {
        await createVehicle(data);
      }
      navigate(ROUTES.VEHICLES);
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate(ROUTES.VEHICLES)}
        />
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}
        </h1>
      </div>

      <VehicleForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={loading}
        isEdit={isEdit}
      />
    </div>
  );
};