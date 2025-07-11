import React from 'react';
import { Lock } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui';
import { PasswordChangeForm } from '../../components/forms';
import { useAuth } from '../../hooks';
import type { ChangePasswordData } from '../../types';

export const ChangePassword: React.FC = () => {
  const { changePassword, loading } = useAuth();

  const handleChangePassword = async (data: ChangePasswordData) => {
    await changePassword(data.oldPassword, data.newPassword);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Lock className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Update Your Password</h2>
          <p className="text-sm text-gray-600">
            Choose a strong password to keep your account secure
          </p>
        </CardHeader>
        <CardContent>
          <PasswordChangeForm onSubmit={handleChangePassword} loading={loading} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Password Security Tips</h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li>• Use a combination of uppercase and lowercase letters</li>
                <li>• Include numbers and special characters</li>
                <li>• Make it at least 8 characters long</li>
                <li>• Don't use personal information or common words</li>
                <li>• Consider using a password manager</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
