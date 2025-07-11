import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Select } from '../../components/ui';
import { Card, CardContent, CardHeader } from '../../components/ui';
import { GoogleAutocomplete, DateTimePicker } from '../../components/common';
import { CreateTripData, Location, Fare, Vehicle, Driver, Vendor } from '../../types';
import { LUGGAGE_TYPES } from '../../utils/constants';
import { X, MapPin } from 'lucide-react';

const tripSchema = z.object({
  tripDescription: z.string().min(1, 'Trip description is required'),
  tripDate: z.string().min(1, 'Trip date is required'),
  vehicle: z.string().min(1, 'Vehicle selection is required'),
  driver: z.string().min(1, 'Driver selection is required'),
  luggage: z.array(z.string()).min(1, 'At least one luggage type must be selected'),
  refreshments: z.boolean(),
  totalTripAmount: z.number().min(0, 'Amount must be positive'),
  bookingAmount: z.number().min(1, 'Booking amount must be at least 1'),
  returnTrip: z.boolean(),
  returnTripDate: z.string().optional(),
});

type TripFormData = z.infer<typeof tripSchema>;

interface TripFormProps {
  initialData?: Partial<CreateTripData>;
  vehicles: Vehicle[];
  drivers: Driver[];
  vendors: Vendor[];
  onSubmit: (data: CreateTripData) => Promise<void>;
  loading?: boolean;
  isEdit?: boolean;
}

export const TripForm: React.FC<TripFormProps> = ({
  initialData,
  vehicles,
  drivers,
  vendors,
  onSubmit,
  loading = false,
  isEdit = false,
}) => {
  const [from, setFrom] = useState<Location | null>(null);
  const [to, setTo] = useState<Location | null>(null);
  const [stops, setStops] = useState<Location[]>([]);
  const [returnStops, setReturnStops] = useState<Location[]>([]);

  // Wrapper functions to handle type conversion
  const handleFromSelected = (place: any) => {
    setFrom({
      lat: place.lat,
      lng: place.lng,
      place_id: place.place_id,
      place_name: place.place_name,
      name: place.name || place.place_name,
    });
  };

  const handleToSelected = (place: any) => {
    setTo({
      lat: place.lat,
      lng: place.lng,
      place_id: place.place_id,
      place_name: place.place_name,
      name: place.name || place.place_name,
    });
  };

  const handleStopSelected = (place: any) => {
    const location: Location = {
      lat: place.lat,
      lng: place.lng,
      place_id: place.place_id,
      place_name: place.place_name,
      name: place.name || place.place_name,
    };
    addStop(location);
  };

  const handleReturnStopSelected = (place: any) => {
    const location: Location = {
      lat: place.lat,
      lng: place.lng,
      place_id: place.place_id,
      place_name: place.place_name,
      name: place.name || place.place_name,
    };
    addReturnStop(location);
  };
  const [fares, setFares] = useState<Fare[]>([]);
  const [returnFares, setReturnFares] = useState<Fare[]>([]);
  const [showReturnTrip, setShowReturnTrip] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      refreshments: false,
      returnTrip: false,
      luggage: [],
      totalTripAmount: 0,
      bookingAmount: 1,
    },
  });

  const watchReturnTrip = watch('returnTrip');

  useEffect(() => {
    setShowReturnTrip(watchReturnTrip);
    if (watchReturnTrip && from && to) {
      // Auto-populate return trip stops (reversed)
      setReturnStops([...stops].reverse());
      generateReturnFares();
    }
  }, [watchReturnTrip, from, to, stops]);

  useEffect(() => {
    if (from && to) {
      generateFares();
    }
  }, [from, to, stops]);

  useEffect(() => {
    if (initialData) {
      populateInitialData();
    }
  }, [initialData]);

  const populateInitialData = () => {
    if (!initialData) return;

    // Set form values
    if (initialData.tripDescription) setValue('tripDescription', initialData.tripDescription);
    if (initialData.tripDate) setValue('tripDate', initialData.tripDate);
    if (initialData.vehicle) setValue('vehicle', initialData.vehicle);
    if (initialData.driver) setValue('driver', initialData.driver);
    if (initialData.luggage) setValue('luggage', initialData.luggage);
    if (initialData.refreshments !== undefined) setValue('refreshments', initialData.refreshments);
    if (initialData.totalTripAmount) setValue('totalTripAmount', initialData.totalTripAmount);
    if (initialData.bookingAmount) setValue('bookingAmount', initialData.bookingAmount);
    if (initialData.returnTrip) setValue('returnTrip', !!initialData.returnTrip);

    // Set locations
    if (initialData.from) setFrom(initialData.from);
    if (initialData.to) setTo(initialData.to);
    if (initialData.stops) setStops(initialData.stops);
    if (initialData.fares) setFares(initialData.fares);
  };

  const generateFares = () => {
    if (!from || !to) return;

    const allStops = [from, ...stops, to];
    const newFares: Fare[] = [];

    for (let i = 0; i < allStops.length; i++) {
      for (let j = i + 1; j < allStops.length; j++) {
        const fare: Fare = {
          from: {
            name: allStops[i].place_name || allStops[i].name || '',
            place_id: allStops[i].place_id,
          },
          to: {
            name: allStops[j].place_name || allStops[j].name || '',
            place_id: allStops[j].place_id,
          },
          fare: i === 0 && j === allStops.length - 1 ? '1' : '0',
          hidden: false,
          master: i === 0 && j === allStops.length - 1,
        };
        newFares.push(fare);
      }
    }

    setFares(newFares);
  };

  const generateReturnFares = () => {
    if (!from || !to) return;

    const allStops = [to, ...returnStops, from];
    const newReturnFares: Fare[] = [];

    for (let i = 0; i < allStops.length; i++) {
      for (let j = i + 1; j < allStops.length; j++) {
        const fare: Fare = {
          from: {
            name: allStops[i].place_name || allStops[i].name || '',
            place_id: allStops[i].place_id,
          },
          to: {
            name: allStops[j].place_name || allStops[j].name || '',
            place_id: allStops[j].place_id,
          },
          fare: i === 0 && j === allStops.length - 1 ? '1' : '0',
          hidden: false,
          master: i === 0 && j === allStops.length - 1,
        };
        newReturnFares.push(fare);
      }
    }

    setReturnFares(newReturnFares);
  };

  const addStop = (location: Location) => {
    setStops([...stops, location]);
  };

  const removeStop = (index: number) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  const addReturnStop = (location: Location) => {
    setReturnStops([...returnStops, location]);
  };

  const removeReturnStop = (index: number) => {
    const newReturnStops = returnStops.filter((_, i) => i !== index);
    setReturnStops(newReturnStops);
  };

  const updateFare = (index: number, value: string, isReturn = false) => {
    if (isReturn) {
      const newFares = [...returnFares];
      newFares[index].fare = value;
      setReturnFares(newFares);
    } else {
      const newFares = [...fares];
      newFares[index].fare = value;
      setFares(newFares);
    }
  };

  const toggleFareVisibility = (index: number, isReturn = false) => {
    if (isReturn) {
      const newFares = [...returnFares];
      newFares[index].hidden = !newFares[index].hidden;
      setReturnFares(newFares);
    } else {
      const newFares = [...fares];
      newFares[index].hidden = !newFares[index].hidden;
      setFares(newFares);
    }
  };

  const onSubmitForm = async (data: TripFormData) => {
    if (!from || !to) {
      alert('Please select origin and destination');
      return;
    }

    const tripData: CreateTripData = {
      ...data,
      from,
      to,
      stops,
      fares,
      duration: 0,
      returnTrip: data.returnTrip ? {
        isReturnTrip: true,
        vendor: vendors[0]?.id || '',
        from: to,
        to: from,
        duration: 0,
        tripDate: data.returnTripDate || data.tripDate,
        vehicle: data.vehicle,
        driver: data.driver,
        luggage: data.luggage,
        stops: returnStops,
        tripDescription: data.tripDescription,
        totalTripAmount: data.totalTripAmount,
        refreshments: data.refreshments,
        bookingAmount: data.bookingAmount,
        fares: returnFares,
      } : undefined,
    };

    await onSubmit(tripData);
  };

  const luggageOptions = LUGGAGE_TYPES.map(type => ({
    value: type.value,
    label: type.label,
  }));

  const vehicleOptions = vehicles.map(vehicle => ({
    value: vehicle.id,
    label: `${vehicle.name} (${vehicle.totalSeats} seats)`,
  }));

  const driverOptions = drivers.map(driver => ({
    value: driver.id,
    label: `${driver.name} (Rating: ${driver.rating}/5)`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">
            {isEdit ? 'Edit Trip' : 'Create New Trip'}
          </h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Trip Description"
              {...register('tripDescription')}
              error={errors.tripDescription?.message}
            />

            <Controller
              name="tripDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label="Trip Date"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.tripDate?.message}
                />
              )}
            />
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Origin <span className="text-red-500">*</span>
              </label>
              <GoogleAutocomplete
                placeholder="Select origin location"
                value={from?.place_name || ''}
                onPlaceSelected={handleFromSelected}
                error={!from ? 'Origin is required' : ''}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination <span className="text-red-500">*</span>
              </label>
              <GoogleAutocomplete
                placeholder="Select destination location"
                value={to?.place_name || ''}
                onPlaceSelected={handleToSelected}
                error={!to ? 'Destination is required' : ''}
              />
            </div>
          </div>

          {/* Stops */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stops
            </label>
            <div className="space-y-2">
              {stops.map((stop, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="flex-1 text-sm">{stop.place_name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStop(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <GoogleAutocomplete
                placeholder="Add a stop"
                onPlaceSelected={handleStopSelected}
              />
            </div>
          </div>

          {/* Vehicle and Driver Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Vehicle"
              {...register('vehicle')}
              options={[{ value: '', label: 'Select Vehicle' }, ...vehicleOptions]}
              error={errors.vehicle?.message}
            />

            <Select
              label="Driver"
              {...register('driver')}
              options={[{ value: '', label: 'Select Driver' }, ...driverOptions]}
              error={errors.driver?.message}
            />
          </div>

          {/* Trip Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Luggage Types <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {luggageOptions.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option.value}
                      {...register('luggage')}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.luggage && (
                <p className="text-sm text-red-600 mt-1">{errors.luggage.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('refreshments')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm font-medium">Refreshments Available</span>
              </label>
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('returnTrip')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm font-medium">Return Trip</span>
              </label>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Total Trip Amount"
              type="number"
              min="0"
              step="0.01"
              {...register('totalTripAmount', { valueAsNumber: true })}
              error={errors.totalTripAmount?.message}
            />

            <Input
              label="Booking Amount"
              type="number"
              min="1"
              step="0.01"
              {...register('bookingAmount', { valueAsNumber: true })}
              error={errors.bookingAmount?.message}
            />
          </div>

          {/* Fares Table */}
          {fares.length > 0 && (
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Fare Structure</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        From
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        To
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fare ($)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fares.map((fare, index) => (
                      !fare.hidden && (
                        <tr key={index} className={fare.master ? 'bg-primary-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {fare.from.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {fare.to.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Input
                              type="number"
                              min={fare.master ? "1" : "0"}
                              step="0.01"
                              value={fare.fare}
                              onChange={(e) => updateFare(index, e.target.value)}
                              className="w-24"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {!fare.master && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleFareVisibility(index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Return Trip Section */}
      {showReturnTrip && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Return Trip Details</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <Controller
              name="returnTripDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label="Return Trip Date"
                  value={field.value || ''}
                  onChange={field.onChange}
                  error={errors.returnTripDate?.message}
                />
              )}
            />

            {/* Return Stops */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Return Trip Stops
              </label>
              <div className="space-y-2">
                {returnStops.map((stop, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="flex-1 text-sm">{stop.place_name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeReturnStop(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <GoogleAutocomplete
                  placeholder="Add a return stop"
                  onPlaceSelected={handleReturnStopSelected}
                />
              </div>
            </div>

            {/* Return Fares Table */}
            {returnFares.length > 0 && (
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Return Trip Fare Structure</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          From
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          To
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fare ($)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {returnFares.map((fare, index) => (
                        !fare.hidden && (
                          <tr key={index} className={fare.master ? 'bg-primary-50' : ''}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {fare.from.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {fare.to.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Input
                                type="number"
                                min={fare.master ? "1" : "0"}
                                step="0.01"
                                value={fare.fare}
                                onChange={(e) => updateFare(index, e.target.value, true)}
                                className="w-24"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {!fare.master && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFareVisibility(index, true)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
        >
          Reset
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          {isEdit ? 'Update Trip' : 'Create Trip'}
        </Button>
      </div>
    </form>
  );
};
