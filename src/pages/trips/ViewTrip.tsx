import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Edit, MapPin, Calendar, Car, User } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Badge } from '../../components/ui';
import { useTrips } from '../../hooks';
import { ROUTES } from '../../utils/constants';
import dayjs from 'dayjs';

export const ViewTrip: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { getTrip } = useTrips();

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        if (state) {
          // Use state data if available
          setTrip(state);
        } else if (id) {
          // Fetch trip data
          const tripData = await getTrip(id);
          setTrip(tripData);
        }
      } catch (error) {
        console.error('Error loading trip:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTrip();
  }, [id, state, getTrip]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    return dayjs(dateString).format('MMMM D, YYYY [at] h:mm A');
  };

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
            <h1 className="text-2xl font-bold text-gray-900">
              Trip Details
            </h1>
          </div>
        </div>
        <Button
          variant="primary"
          icon={Edit}
          onClick={() => navigate(`${ROUTES.EDIT_TRIP}/${trip.id || id}`, { state: trip })}
        >
          Edit Trip
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Information */}
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
              <p className="text-gray-900">{trip.from?.name || trip.from?.place_name || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">To:</span>
              <p className="text-gray-900">{trip.to?.name || trip.to?.place_name || 'N/A'}</p>
            </div>
            {trip.stops && trip.stops.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-500">Stops:</span>
                <div className="space-y-1">
                  {trip.stops.map((stop: any, index: number) => (
                    <p key={index} className="text-gray-900 text-sm">
                      {index + 1}. {stop.name || stop.place_name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trip Details */}
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
              <p className="text-gray-900">{formatDateTime(trip.tripDate)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Booking Amount:</span>
              <p className="text-gray-900 font-semibold text-lg">
                ${trip.bookingAmount || trip.bookingMinimumAmount || 0}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Description:</span>
              <p className="text-gray-900">{trip.tripDescription || 'No description provided'}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {trip.refreshments && (
                <Badge variant="success">Refreshments Included</Badge>
              )}
              {trip.returnTrip && (
                <Badge variant="info">Return Trip</Badge>
              )}
              {trip.luggage?.map((luggage: string, index: number) => (
                <Badge key={index} variant="default">
                  {luggage === 's' ? 'Small' : luggage === 'm' ? 'Medium' : 'Large'} Luggage
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Information */}
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
              <p className="text-gray-600">License Plate: {trip.vehicle.number}</p>
              <p className="text-gray-600">Total Seats: {trip.vehicle.totalSeats}</p>
            </CardContent>
          </Card>
        )}

        {/* Driver Information */}
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
              <p className="text-gray-600">Rating: {trip.driver.rating || 'N/A'}/5</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Fare Structure */}
      {trip.fares?.fares && trip.fares.fares.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Fare Structure</h2>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        From
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        To
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fare
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {trip.fares.fares.map((fare: any, index: number) => (
                      !fare.hidden && (
                        <tr key={index} className={fare.master ? 'bg-blue-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {fare.from.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {fare.to.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${fare.fare}
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {trip.fares.fares.map((fare: any, index: number) => (
                !fare.hidden && (
                  <div key={index} className={`p-4 rounded-lg border ${fare.master ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">
                          {fare.from.name} → {fare.to.name}
                        </p>
                        <p className="text-sm text-gray-500">Fare #{index + 1}</p>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        ${fare.fare}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Return Trip Information */}
      {trip.returnTrip && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Return Trip Information</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Return Date:</span>
                <p className="text-gray-900">{formatDateTime(trip.returnTrip.tripDate)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Return Route:</span>
                <p className="text-gray-900">
                  {trip.returnTrip.from?.name || trip.returnTrip.from?.place_name} → {trip.returnTrip.to?.name || trip.returnTrip.to?.place_name}
                </p>
              </div>
            </div>

            {/* Return Trip Stops */}
            {trip.returnTrip.stops && trip.returnTrip.stops.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-500">Return Stops:</span>
                <div className="space-y-1">
                  {trip.returnTrip.stops.map((stop: any, index: number) => (
                    <p key={index} className="text-gray-900 text-sm">
                      {index + 1}. {stop.name || stop.place_name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Return Trip Fares */}
            {trip.returnTrip.fares?.fares && trip.returnTrip.fares.fares.length > 0 && (
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Return Fare Structure</h3>

                {/* Desktop Table */}
                <div className="hidden md:block">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            #
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            From
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            To
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fare
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {trip.returnTrip.fares.fares.map((fare: any, index: number) => (
                          !fare.hidden && (
                            <tr key={index} className={fare.master ? 'bg-blue-50' : ''}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {fare.from.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {fare.to.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                ${fare.fare}
                              </td>
                            </tr>
                          )
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {trip.returnTrip.fares.fares.map((fare: any, index: number) => (
                    !fare.hidden && (
                      <div key={index} className={`p-4 rounded-lg border ${fare.master ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">
                              {fare.from.name} → {fare.to.name}
                            </p>
                            <p className="text-sm text-gray-500">Return Fare #{index + 1}</p>
                          </div>
                          <div className="text-lg font-semibold text-gray-900">
                            ${fare.fare}
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};