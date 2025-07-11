import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { LoginForm } from '../../components/forms';
import { Card, CardContent } from '../../components/ui';
import { ROUTES } from '../../utils/constants';
import type { LoginCredentials } from '../../types';

export const Login: React.FC = () => {
  const { login, isAuthenticated, loading } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const handleLogin = async (data: LoginCredentials) => {
    await login(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">RFY</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            RideForYou Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <LoginForm onSubmit={handleLogin} loading={loading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};