import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../../components/ui';
import { ChangePasswordData } from '../../types';
import { changePasswordSchema } from '../../utils/validation';

interface PasswordChangeFormProps {
  onSubmit: (data: ChangePasswordData) => Promise<void>;
  loading?: boolean;
}

export const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleFormSubmit = async (data: ChangePasswordData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Input
        label="Current Password"
        type="password"
        {...register('oldPassword')}
        error={errors.oldPassword?.message}
      />

      <Input
        label="New Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
        helperText="Password must be at least 8 characters with uppercase, lowercase, number, and special character"
      />

      <Input
        label="Confirm New Password"
        type="password"
        {...register('passwordConfirm')}
        error={errors.passwordConfirm?.message}
      />

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit" loading={loading}>
          Change Password
        </Button>
      </div>
    </form>
  );
};
