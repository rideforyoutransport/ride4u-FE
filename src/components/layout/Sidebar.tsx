import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Car,
  Users,
  MapPin,
  Calendar,
  Truck,
  UserPlus,
  FileText,
  Settings,
  X,
} from 'lucide-react';
import { RootState } from '../../store';
import { setSidebarOpen } from '../../store/globalSlice';
import { ROUTES } from '../../utils/constants';
import { cn } from '../../utils/helpers';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: 'Trips', href: ROUTES.TRIPS, icon: MapPin },
  { title: 'Bookings', href: ROUTES.BOOKINGS, icon: Calendar },
  { title: 'Users', href: ROUTES.USERS, icon: Users },
  { title: 'Drivers', href: ROUTES.DRIVERS, icon: UserPlus },
  { title: 'Vehicles', href: ROUTES.VEHICLES, icon: Truck },
  { title: 'Requested Trips', href: ROUTES.REQUESTED_TRIPS, icon: FileText },
  { title: 'Change Password', href: ROUTES.CHANGE_PASSWORD, icon: Settings },
];

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.global);

  const closeSidebar = () => dispatch(setSidebarOpen(false));

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-dark-800 text-white transform transition-transform duration-300 ease-in-out z-50',
          'lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-dark-700">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-primary-500 mr-2" />
            <span className="text-lg font-bold">RIDEFORYOU</span>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1 rounded hover:bg-dark-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                    )
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
