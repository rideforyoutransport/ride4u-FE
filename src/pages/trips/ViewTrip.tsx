import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, MapPin, Calendar, Car, User, Building } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Badge } from '../../components/ui';
import { useTrips } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import { formatDate, formatCurrency } from '../../utils/formatters';
import type { Trip } from '../../types';

export const ViewTrip: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrip } = useTrips();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrip = async () => {
      if (id) {
        try {
          const tripData = await getTrip(id);
          setTrip(tripData);
        } catch (error) {
          console.error('Error loading trip:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadTrip();
  }, [id, getTrip]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900">Trip not found</h2>
        <Button
          variant="primary"
          onClick={() => navigate(ROUTES.TRIPS)}
          className="mt-4"
        >
          Back to Trips
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            icon={ArrowLeft}
            onClick={() => navigate(ROUTES.TRIPS)}
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trip #{trip.id}</h1>
            <p className="text-gray-600">{trip.tripDescription}</p>
          </div>
        </div>
        <Button
          variant="primary"
          icon={Edit}
          onClick={() => navigate(`${ROUTES.EDIT_TRIP}/${trip.id}`)}
        >
          Edit Trip
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Route Information
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">From:</span>
              <p className="text-gray-900">{trip.from?.name || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">To:</span>
              <p className="text-gray-900">{trip.to?.name || 'N/A'}</p>
            </div>
            {trip.stops && trip.stops.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-500">Stops:</span>
                <div className="space-y-1">
                  {trip.stops.map((stop, index) => (
                    <p key={index} className="text-gray-900 text-sm">
                      {index + 1}. {stop.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Trip Details
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Date & Time:</span>
              <p className="text-gray-900">{formatDate(trip.tripDate)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Total Amount:</span>
              <p className="text-gray-900 font-semibold text-lg">
                {formatCurrency(trip.totalTripAmount || 0)}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Booking Minimum:</span>
              <p className="text-gray-900">{formatCurrency(trip.bookingMinimumAmount || 0)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Total Seats:</span>
              <p className="text-gray-900">{trip.totalSeats}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {trip.refreshments && (
                <Badge variant="success">Refreshments Included</Badge>
              )}
              {trip.returnTrip && (
                <Badge variant="info">Return Trip</Badge>
              )}
              {trip.luggage?.map((luggage, index) => (
                <Badge key={index} variant="default">{luggage} Luggage</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {trip.vehicle && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Vehicle Information
              </h2>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-900 font-medium">{trip.vehicle.name}</p>
              <p className="text-gray-600">Total Seats: {trip.vehicle.totalSeats}</p>
            </CardContent>
          </Card>
        )}

        {trip.driver && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center">
                <User className="w-5 h-5 mr-2" />
                Driver Information
              </h2>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-900 font-medium">{trip.driver.name}</p>
              <p className="text-gray-600">Phone: {trip.driver.number}</p>
              <p className="text-gray-600">Rating: {trip.driver.rating}/5</p>
            </CardContent>
          </Card>
        )}
      </div>

      {trip.returnTrip && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Return Trip Information</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Return Date:</span>
                <p className="text-gray-900">{formatDate(trip.returnTrip.tripDate)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Return Route:</span>
                <p className="text-gray-900">
                  {trip.returnTrip.from?.name} → {trip.returnTrip.to?.name}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};