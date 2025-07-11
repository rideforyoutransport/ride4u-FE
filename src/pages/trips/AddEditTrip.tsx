import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui';
import { TripForm } from '../../components/forms';
import { useTrips, useVehicles, useDrivers, useVendors } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import type { CreateTripData } from '../../types';

export const AddEditTrip: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const { createTrip, updateTrip, getTrip, loading } = useTrips();
  const { vehicles } = useVehicles();
  const { drivers } = useDrivers();
  const { vendors } = useVendors();
  
  const [initialData, setInitialData] = useState<Partial<CreateTripData>>();

  useEffect(() => {
    if (isEdit && id) {
      const loadTrip = async () => {
        const trip = await getTrip(id);
        if (trip) {
          setInitialData({
            tripDescription: trip.tripDescription,
            tripDate: trip.tripDate,
            vehicle: trip.vehicle?.id,
            driver: trip.driver?.id,
            luggage: trip.luggage,
            refreshments: trip.refreshments,
            bookingAmount: trip.bookingMinimumAmount,
            totalTripAmount: trip.totalTripAmount,
            from: trip.from,
            to: trip.to,
            stops: trip.stops,
            returnTrip: trip.returnTrip ? {
              isReturnTrip: trip.returnTrip.isReturnTrip,
              vendor: vendors[0]?.id || '',
              from: trip.returnTrip.from,
              to: trip.returnTrip.to,
              duration: 0,
              tripDate: trip.returnTrip.tripDate,
              vehicle: trip.vehicle?.id || '',
              driver: trip.driver?.id || '',
              luggage: trip.luggage,
              stops: trip.returnTrip.stops,
              tripDescription: trip.tripDescription,
              totalTripAmount: trip.totalTripAmount,
              refreshments: trip.refreshments,
              bookingAmount: trip.bookingMinimumAmount,
              fares: trip.returnTrip.fares.fares,
            } : undefined,
          });
        }
      };
      loadTrip();
    }
  }, [isEdit, id, getTrip]);

  const handleSubmit = async (data: CreateTripData) => {
    try {
      if (isEdit && id) {
        await updateTrip(id, data);
      } else {
        await createTrip(data);
      }
      navigate(ROUTES.TRIPS);
    } catch (error) {
      console.error('Error saving trip:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate(ROUTES.TRIPS)}
        />
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Trip' : 'Add New Trip'}
        </h1>
      </div>

      <TripForm
        initialData={initialData}
        vehicles={vehicles}
        drivers={drivers}
        vendors={vendors}
        onSubmit={handleSubmit}
        loading={loading}
        isEdit={isEdit}
      />
    </div>
  );
};