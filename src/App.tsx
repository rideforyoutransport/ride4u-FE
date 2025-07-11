import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { useAuth } from './hooks';
import { Layout } from './components/layout';
import { PageLoading } from './components/ui';
import { ROUTES } from './utils/constants';

// Auth pages
import { Login } from './pages/auth';

// Lazy load pages for better performance
const TripsList = React.lazy(() => import('./pages/trips/TripsList').then(m => ({ default: m.TripsList })));
const AddEditTrip = React.lazy(() => import('./pages/trips/AddEditTrip').then(m => ({ default: m.AddEditTrip })));
const ViewTrip = React.lazy(() => import('./pages/trips/ViewTrip').then(m => ({ default: m.ViewTrip })));

const BookingsList = React.lazy(() => import('./pages/bookings/BookingsList').then(m => ({ default: m.BookingsList })));

const DriversList = React.lazy(() => import('./pages/drivers/DriversList').then(m => ({ default: m.DriversList })));
const AddEditDriver = React.lazy(() => import('./pages/drivers/AddEditDriver').then(m => ({ default: m.AddEditDriver })));

const VehiclesList = React.lazy(() => import('./pages/vehicles/VehiclesList').then(m => ({ default: m.VehiclesList })));
const AddEditVehicle = React.lazy(() => import('./pages/vehicles/AddEditVehicle').then(m => ({ default: m.AddEditVehicle })));

const UsersList = React.lazy(() => import('./pages/users/UsersList').then(m => ({ default: m.UsersList })));

const VendorsList = React.lazy(() => import('./pages/vendors/VendorsList').then(m => ({ default: m.VendorsList })));
const AddEditVendor = React.lazy(() => import('./pages/vendors/AddEditVendor').then(m => ({ default: m.AddEditVendor })));

const RequestedTripsList = React.lazy(() => import('./pages/requested-trips/RequestedTripsList').then(m => ({ default: m.RequestedTripsList })));

const ChangePassword = React.lazy(() => import('./pages/settings/ChangePassword').then(m => ({ default: m.ChangePassword })));
const PrivacyPolicy = React.lazy(() => import('./pages/privacy/PrivacyPolicy'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route wrapper
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  return (
    <Layout>
      <Suspense fallback={<PageLoading />}>
        {children}
      </Suspense>
    </Layout>
  );
};

// Public Route wrapper (for login page)
interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  
  return <>{children}</>;
};

// Main App Routes Component
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      
      <Route
        path={ROUTES.PRIVACY_POLICY}
        element={
          <Suspense fallback={<PageLoading />}>
            <PrivacyPolicy />
          </Suspense>
        }
      />

      {/* Protected Routes */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <TripsList />
          </ProtectedRoute>
        }
      />

      {/* Trips Routes */}
      <Route
        path={ROUTES.TRIPS}
        element={
          <ProtectedRoute>
            <TripsList />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADD_TRIP}
        element={
          <ProtectedRoute>
            <AddEditTrip />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${ROUTES.EDIT_TRIP}/:id`}
        element={
          <ProtectedRoute>
            <AddEditTrip />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${ROUTES.VIEW_TRIP}/:id`}
        element={
          <ProtectedRoute>
            <ViewTrip />
          </ProtectedRoute>
        }
      />

      {/* Bookings Routes */}
      <Route
        path={ROUTES.BOOKINGS}
        element={
          <ProtectedRoute>
            <BookingsList />
          </ProtectedRoute>
        }
      />

      {/* Drivers Routes */}
      <Route
        path={ROUTES.DRIVERS}
        element={
          <ProtectedRoute>
            <DriversList />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADD_DRIVER}
        element={
          <ProtectedRoute>
            <AddEditDriver />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${ROUTES.EDIT_DRIVER}/:id`}
        element={
          <ProtectedRoute>
            <AddEditDriver />
          </ProtectedRoute>
        }
      />

      {/* Vehicles Routes */}
      <Route
        path={ROUTES.VEHICLES}
        element={
          <ProtectedRoute>
            <VehiclesList />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADD_VEHICLE}
        element={
          <ProtectedRoute>
            <AddEditVehicle />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${ROUTES.EDIT_VEHICLE}/:id`}
        element={
          <ProtectedRoute>
            <AddEditVehicle />
          </ProtectedRoute>
        }
      />

      {/* Users Routes */}
      <Route
        path={ROUTES.USERS}
        element={
          <ProtectedRoute>
            <UsersList />
          </ProtectedRoute>
        }
      />

      {/* Vendors Routes */}
      <Route
        path={ROUTES.VENDORS}
        element={
          <ProtectedRoute>
            <VendorsList />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADD_VENDOR}
        element={
          <ProtectedRoute>
            <AddEditVendor />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${ROUTES.EDIT_VENDOR}/:id`}
        element={
          <ProtectedRoute>
            <AddEditVendor />
          </ProtectedRoute>
        }
      />

      {/* Requested Trips Routes */}
      <Route
        path={ROUTES.REQUESTED_TRIPS}
        element={
          <ProtectedRoute>
            <RequestedTripsList />
          </ProtectedRoute>
        }
      />

      {/* Settings Routes */}
      <Route
        path={ROUTES.CHANGE_PASSWORD}
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to dashboard */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  style: {
                    background: '#10b981',
                  },
                },
                error: {
                  duration: 5000,
                  style: {
                    background: '#ef4444',
                  },
                },
              }}
            />
          </div>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;