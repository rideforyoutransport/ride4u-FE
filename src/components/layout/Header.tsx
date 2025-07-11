import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/globalSlice';
import { useAuth } from '../../hooks';
import { Button } from '../../components/ui';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            icon={Menu}
            onClick={() => dispatch(toggleSidebar())}
            className="mr-4 lg:hidden"
          />
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome to Dashboard!
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            icon={LogOut}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
