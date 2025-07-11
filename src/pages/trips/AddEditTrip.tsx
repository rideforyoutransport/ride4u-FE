import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui';
import { TripForm } from '../../components/forms';
import { PageLoading } from '../../components/ui';
import { useTrips, useVehicles, useDrivers, useVendors } from '../../hooks';
import { ROUTES } from '../../utils/constants';

export const AddEditTrip: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  
  console.log('AddEditTrip rendered with:', { id, state, pathname: location.pathname });
  
  const { createTrip, updateTrip, getTrip, trips, loading } = useTrips();
  const { vehicles, loading: vehiclesLoading } = useVehicles();
  const { drivers, loading: driversLoading } = useDrivers();
  const { vendors, loading: vendorsLoading } = useVendors();
  
  const [initialData, setInitialData] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        setDataLoading(true);
        
        if (state) {
          // Use state data if available
          console.log('Using state data:', state);
          setInitialData(state);
          setIsReady(true);
        } else if (id) {
          // Fetch trip data
          console.log('Fetching trip with ID:', id);
          const trip = await getTrip(id);
          console.log('Fetched trip data:', trip);
          if (trip) {
            setInitialData(trip);
            setIsReady(true);
          } else {
            console.error('Trip not found');
            //navigate(ROUTES.TRIPS);
          }
        } else {
          // Add mode
          console.log('Add mode - no initial data needed');
          setInitialData({});
          setIsReady(true);
        }
      } catch (error) {
        console.error('Error loading trip:', error);
        navigate(ROUTES.TRIPS);
      } finally {
        setDataLoading(false);
      }
    };
    
    // Only load trip if we have the required data sources loaded
    if (!vehiclesLoading && !driversLoading && !vendorsLoading) {
      loadTrip();
    }
  }, [id, state, getTrip, navigate, vehiclesLoading, driversLoading, vendorsLoading]);

  const handleSubmit = async (data: any) => {
    console.log('Form submitted with data:', data);
    try {
      if (id || state?.id) {
        const tripId = id || state.id;
        console.log('Updating trip with ID:', tripId);
        await updateTrip(tripId, data);
      } else {
        console.log('Creating new trip');
        await createTrip(data);
      }
      navigate(ROUTES.TRIPS);
    } catch (error) {
      console.error('Error saving trip:', error);
    }
  };

  const getPageTitle = () => {
    if (state) return 'Edit Trip (from state)';
    if (id) return 'Edit Trip (from ID)';
    return 'Add New Trip';
  };

  // Show loading while any required data is loading
  if (vehiclesLoading || driversLoading || vendorsLoading || dataLoading || !isReady) {
    return <PageLoading />;
  }

  // Don't render until we have all required data
  if (vendors.length === 0 || vehicles.length === 0 || drivers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Missing Required Data</h2>
          <p className="text-gray-600">Unable to load vehicles, drivers, or vendors.</p>
          <Button
            variant="primary"
            onClick={() => navigate(ROUTES.TRIPS)}
            className="mt-4"
          >
            Back to Trips
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate(ROUTES.TRIPS)}
        />
        <h1 className="text-2xl font-bold text-gray-900">
          {getPageTitle()}
        </h1>
      </div>

      <TripForm
        initialData={initialData}
        trips={trips}
        vehicles={vehicles}
        drivers={drivers}
        vendor={vendors[0]}
        onSubmit={handleSubmit}
        loading={loading}
        setDateAuto={id?true:false}
        isEdit={!!id || !!state}
      />
    </div>
  );
};