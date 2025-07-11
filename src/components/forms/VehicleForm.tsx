import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Select } from '../../components/ui';
import { Card, CardContent, CardHeader } from '../../components/ui';
import { CreateVehicleData, Vendor } from '../../types';

const vehicleSchema = z.object({
  name: z.string().min(1, 'Vehicle name is required').min(2, 'Name must be at least 2 characters'),
  number: z.string().min(1, 'Vehicle number is required').min(3, 'Vehicle number must be at least 3 characters'),
  totalSeats: z.number().min(1, 'Vehicle must have at least 1 seat').max(100, 'Maximum 100 seats allowed'),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

interface VehicleFormProps {
  initialData?: Partial<CreateVehicleData>;
  onSubmit: (data: CreateVehicleData) => Promise<void>;
  loading?: boolean;
  isEdit?: boolean;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
  isEdit = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: '',
      number: '',
      totalSeats: 1,
    },
  });

  // Add useEffect to update form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        number: initialData.number || '',
        totalSeats: initialData.totalSeats || 1,
      });
    }
  }, [initialData, reset]);

  const onSubmitForm = async (data: VehicleFormData) => {
    const submitData: CreateVehicleData = {
      name: data.name,
      number: data.number.toUpperCase(), // Normalize vehicle number to uppercase
      totalSeats: data.totalSeats,
    };

    await onSubmit(submitData);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Vehicle Name/Model"
              {...register('name')}
              error={errors.name?.message}
              placeholder="e.g., Toyota Camry 2023"
            />

            <Input
              label="Vehicle Number/License Plate"
              {...register('number')}
              error={errors.number?.message}
              placeholder="e.g., ABC-1234"
              helperText="Enter license plate number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Total Seats"
              type="number"
              min="1"
              max="100"
              {...register('totalSeats', { valueAsNumber: true })}
              error={errors.totalSeats?.message}
              placeholder="Enter number of passenger seats"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              loading={loading}
            >
              {isEdit ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};