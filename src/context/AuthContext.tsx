import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser } from '../types';
import { storage } from '../utils/crypto';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on mount
    const token = storage.get('access_token');
    const adminId = storage.get('adminId');
    const authorized = storage.get('authorized');

    if (token && adminId && authorized) {
      setUser({
        id: adminId,
        token,
        email: storage.get('email') || '',
        name: storage.get('name') || '',
      });
    }
    setLoading(false);
  }, []);

  const login = (userData: AuthUser) => {
    setUser(userData);
    storage.set('access_token', userData.token);
    storage.set('adminId', userData.id);
    storage.set('authorized', 'true');
    if (userData.email) storage.set('email', userData.email);
    if (userData.name) storage.set('name', userData.name);
  };

  const logout = () => {
    setUser(null);
    storage.clear();
  };

  const updateUser = (userData: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      if (userData.email) storage.set('email', userData.email);
      if (userData.name) storage.set('name', userData.name);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
