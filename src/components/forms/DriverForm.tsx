import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '../../components/ui';
import { Card, CardContent, CardHeader } from '../../components/ui';
import { CreateDriverData, UpdateDriverData, Vendor } from '../../types';
import { emailSchema, phoneSchema } from '../../utils/validation';

const driverSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  number: phoneSchema,
  vendorId: z.string().optional(), // Make optional since it's set automatically
  password: z.string().optional(), // Make optional since it's auto-generated
  passwordConfirm: z.string().optional(), // Make optional since it's auto-generated
});

type DriverFormData = z.infer<typeof driverSchema>;

interface DriverFormProps {
  initialData?: Partial<CreateDriverData | UpdateDriverData>;
  vendor: Vendor;
  onSubmit: (data: CreateDriverData | UpdateDriverData) => Promise<void>;
  loading?: boolean;
  isEdit?: boolean;
}

export const DriverForm: React.FC<DriverFormProps> = ({
  initialData,
  vendor,
  onSubmit,
  loading = false,
  isEdit = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: '',
      email: '',
      number: '',
      vendorId: vendor?.id || '',
    },
  });

  // Add useEffect to update form when initialData changes
  useEffect(() => {
    if (initialData && vendor) {
      reset({
        name: initialData.name || '',
        email: initialData.email || '',
        number: initialData.number || '',
        vendorId: vendor.id,
      });
    }
  }, [initialData, vendor, reset]);

  // Set vendorId whenever vendor changes
  useEffect(() => {
    if (vendor?.id) {
      setValue('vendorId', vendor.id);
    }
  }, [vendor, setValue]);

  const onSubmitForm = async (data: DriverFormData) => {
    console.log('Form submitted with data:', data);
    console.log('Form errors:', errors);
    
    try {
      if (isEdit) {
        const submitData: UpdateDriverData = {
          name: data.name,
          email: data.email,
          number: data.number,
          vendorId: vendor.id, // Use vendor.id directly
        };
        console.log('Submitting edit data:', submitData);
        await onSubmit(submitData);
      } else {
        const submitData: CreateDriverData = {
          name: data.name,
          email: data.email,
          number: data.number,
          vendorId: vendor.id, // Use vendor.id directly
          password: `${data.name}@2024`,
          passwordConfirm: `${data.name}@2024`,
        };
        console.log('Submitting create data:', submitData);
        await onSubmit(submitData);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  // Don't render if vendor is not available
  if (!vendor) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {isEdit ? 'Edit Driver' : 'Add New Driver'}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {/* Hidden field for vendorId */}
          <input type="hidden" {...register('vendorId')} />
          
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