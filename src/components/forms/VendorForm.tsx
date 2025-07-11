import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '../../components/ui';
import { Card, CardContent, CardHeader } from '../../components/ui';
import { CreateVendorData, UpdateVendorData } from '../../types';
import { emailSchema, phoneSchema } from '../../utils/validation';

const vendorSchema = z.object({
  name: z.string().min(1, 'Company name is required').min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  phoneNumber: phoneSchema,
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  passwordConfirm: z.string().optional(),
}).refine((data) => {
  if (data.password && data.password !== data.passwordConfirm) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

type VendorFormData = z.infer<typeof vendorSchema>;

interface VendorFormProps {
  initialData?: Partial<CreateVendorData | UpdateVendorData>;
  onSubmit: (data: CreateVendorData | UpdateVendorData) => Promise<void>;
  loading?: boolean;
  isEdit?: boolean;
}

export const VendorForm: React.FC<VendorFormProps> = ({
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
    watch,
  } = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phoneNumber: initialData?.phoneNumber || '',
    },
  });

  const watchName = watch('name');

  const onSubmitForm = async (data: VendorFormData) => {
    const submitData: CreateVendorData | UpdateVendorData = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };

    if (!isEdit) {
      // For new vendors, generate a default password
      (submitData as CreateVendorData).password = data.password || `${data.name}@2024`;
      (submitData as CreateVendorData).passwordConfirm = data.password || `${data.name}@2024`;
    }

    await onSubmit(submitData);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          {isEdit ? 'Edit Vendor' : 'Add New Vendor'}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company/Vendor Name"
              {...register('name')}
              error={errors.name?.message}
              placeholder="Enter company or vendor name"
            />

            <Input
              label="Email Address"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="contact@company.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              type="tel"
              {...register('phoneNumber')}
              error={errors.phoneNumber?.message}
              placeholder="+1 (555) 123-4567"
              helperText="Business contact number"
            />

            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                <p className="font-medium">Vendor Status:</p>
                <p className="text-green-600">✓ Active</p>
                <p className="text-xs mt-1">Can manage vehicles and drivers</p>
              </div>
            </div>
          </div>

          {/* Password fields for new vendors */}
          {!isEdit && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password?.message}
                placeholder={`Default: ${watchName || '[Company Name]'}@2024`}
                helperText="Leave empty to use default password"
              />

              <Input
                label="Confirm Password"
                type="password"
                {...register('passwordConfirm')}
                error={errors.passwordConfirm?.message}
                placeholder="Re-enter password"
              />
            </div>
          )}

          {/* Information Notice */}
          <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-purple-800">
                  Vendor Account Information
                </h3>
                <div className="mt-2 text-sm text-purple-700">
                  <ul className="list-disc list-inside space-y-1">
                    {!isEdit && (
                      <>
                        <li>Default password will be: {watchName || '[Company Name]'}@2024</li>
                        <li>Vendor will receive account setup email</li>
                      </>
                    )}
                    <li>Vendors can manage their own vehicles and drivers</li>
                    <li>Account includes access to vendor dashboard</li>
                    <li>Financial reports and trip analytics will be available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Vendor Permissions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Vendor Permissions</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Manage Vehicles
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Manage Drivers
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                View Reports
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Trip Analytics
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Financial Data
              </div>
              <div className="flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Profile Management
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Additional Information</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Business registration and insurance documents may be required</p>
              <p>• Vendor agreement and terms of service apply</p>
              <p>• Regular performance reviews and compliance checks</p>
              <p>• Revenue sharing and payment terms as per contract</p>
            </div>
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
              {isEdit ? 'Update Vendor' : 'Add Vendor'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
