import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '../../components/ui';
import { Card, CardContent, CardHeader } from '../../components/ui';
import { CreateDriverData, UpdateDriverData } from '../../types';
import { emailSchema, phoneSchema } from '../../utils/validation';

const driverSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  number: phoneSchema,
});

type DriverFormData = z.infer<typeof driverSchema>;

interface DriverFormProps {
  initialData?: Partial<CreateDriverData | UpdateDriverData>;
  onSubmit: (data: CreateDriverData | UpdateDriverData) => Promise<void>;
  loading?: boolean;
  isEdit?: boolean;
}

export const DriverForm: React.FC<DriverFormProps> = ({
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
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: '',
      email: '',
      number: '',
    },
  });

  // Add useEffect to update form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        email: initialData.email || '',
        number: initialData.number || '',
      });
    }
  }, [initialData, reset]);

  const onSubmitForm = async (data: DriverFormData) => {
    const submitData: CreateDriverData | UpdateDriverData = {
      name: data.name,
      email: data.email,
      number: data.number,
    };

    await onSubmit(submitData);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {isEdit ? 'Edit Driver' : 'Add New Driver'}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Driver Name"
              {...register('name')}
              error={errors.name?.message}
              placeholder="Enter driver's full name"
            />

            <Input
              label="Email Address"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="driver@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              type="tel"
              {...register('number')}
              error={errors.number?.message}
              placeholder="+1 (555) 123-4567"
              helperText="Enter with country code"
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
              {isEdit ? 'Update Driver' : 'Add Driver'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};