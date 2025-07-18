// import React, { useEffect, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Button, Input, Select } from '../../components/ui';
// import { Card, CardContent, CardHeader } from '../../components/ui';
// import { Vehicle, Driver, Vendor } from '../../types';
// import { X, MapPin, Plus, Calendar, Car, User, Package, Coffee, RotateCcw, Copy } from 'lucide-react';
// import dayjs from 'dayjs';
// import { GoogleAutocomplete } from '../common/GoogleAutocomplete';

// const tripSchema = z.object({
//   tripDescription: z.string().min(1, 'Trip description is required'),
//   tripDate: z.string().min(1, 'Trip date is required'),
//   vehicle: z.string().min(1, 'Vehicle selection is required'),
//   driver: z.string().min(1, 'Driver selection is required'),
//   luggage: z.array(z.string()).min(1, 'At least one luggage type must be selected'),
//   refreshments: z.boolean(),
//   bookingAmount: z.number().min(1, 'Booking amount must be at least 1'),
//   returnTrip: z.boolean(),
//   returnTripDate: z.string().optional(),
// });

// type TripFormData = z.infer<typeof tripSchema>;

// interface TripFormProps {
//   initialData?: any;
//   vehicles: Vehicle[];
//   drivers: Driver[];
//   vendor: Vendor;
//   trips?: any[]; // Add trips prop for copy functionality
//   onSubmit: (data: any) => Promise<void>;
//   loading?: boolean;
//   isEdit?: boolean;
//   setDateAuto?: boolean;
// }

// export const TripForm: React.FC<TripFormProps> = ({
//   initialData,
//   vehicles,
//   drivers,
//   vendor,
//   setDateAuto,
//   trips = [],
//   onSubmit,
//   loading = false,
//   isEdit = false,
// }) => {
//   // State from original logic
//   const [from, setFrom] = useState<any>({});
//   const [to, setTo] = useState<any>({});
//   const [stops, setStops] = useState<any[]>([]);
//   const [fromReturn, setFromReturn] = useState<any>({});
//   const [toReturn, setToReturn] = useState<any>({});
//   const [stopsReturn, setStopsReturn] = useState<any[]>([]);
//   const [allPossibleFares, setAllPossibleFares] = useState<any[]>([]);
//   const [allPossibleFaresReturn, setAllPossibleFaresReturn] = useState<any[]>([]);
//   const [stopInputValue, setStopInputValue] = useState('');
//   const [selectedTrip, setSelectedTrip] = useState<any>({});

//   // Input states for location fields
//   const [fromInput, setFromInput] = useState('');
//   const [toInput, setToInput] = useState('');

//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     reset,
//   } = useForm<TripFormData>({
//     resolver: zodResolver(tripSchema),
//     defaultValues: {
//       refreshments: false,
//       returnTrip: false,
//       luggage: [],
//       bookingAmount: 1,
//       tripDescription: '',
//       tripDate: '',
//       vehicle: '',
//       driver: '',
//     },
//   });

//   const watchReturnTrip = watch('returnTrip');

//   // Copy values from previous trip function
// const setValues = (trip: any, vehicles: any[], drivers: any[], vendors: any[]) => {
//   console.log('Copying values from trip:', trip);

//   // Add comprehensive null checks
//   if (!trip) {
//     console.warn('Trip data is null, skipping setValues');
//     return;
//   }

//   // Set form values with safe property access
//   reset({
//     tripDescription: trip.tripDescription || '',
//     tripDate: setDateAuto ? (trip.tripDate || '') : '',
//     vehicle: trip.vehicle?.id || '',
//     driver: trip.driver?.id || '',
//     luggage: trip.luggage || [],
//     refreshments: trip.refreshments || false,
//     bookingAmount: trip.bookingAmount || trip.bookingMinimumAmount || 1,
//     returnTrip: !!trip.returnTrip,
//     // Fix: Add null check for returnTrip before accessing tripDate
//     returnTripDate: setDateAuto ? (trip.returnTrip?.tripDate || '') : '',
//   });

//   // Set locations for main trip with null checks
//   if (trip.from) {
//     const fromData = {
//       ...trip.from,
//       lat: trip.from.geoLocation?.lat || trip.from.lat,
//       lng: trip.from.geoLocation?.lng || trip.from.lng,
//       place_name: trip.from.name,
//       place_id: trip.from.place_id || trip.from.id,
//     };
//     setFrom(fromData);
//     setFromInput(fromData.place_name || fromData.name || '');
//   }

//   if (trip.to) {
//     const toData = {
//       ...trip.to,
//       lat: trip.to.geoLocation?.lat || trip.to.lat,
//       lng: trip.to.geoLocation?.lng || trip.to.lng,
//       place_name: trip.to.name,
//       place_id: trip.to.place_id || trip.to.id,
//     };
//     setTo(toData);
//     setToInput(toData.place_name || toData.name || '');
//   }

//   // Set stops with null check
//   if (trip.stops && Array.isArray(trip.stops)) {
//     const stopsData = trip.stops.map((stop: any) => ({
//       ...stop,
//       lat: stop.geoLocation?.lat || stop.lat,
//       lng: stop.geoLocation?.lng || stop.lng,
//       place_name: stop.name,
//       place_id: stop.place_id || stop.id,
//     }));
//     setStops(stopsData);
//   }

//   // Set fares with null checks
//   if (trip.fares?.fares && Array.isArray(trip.fares.fares)) {
//     console.log(trip.fares.fares);
//     setAllPossibleFares([...trip.fares.fares]);
//   }

//   // Set return trip data if exists - with comprehensive null checks
//   if (trip.returnTrip && typeof trip.returnTrip === 'object') {
//     // Check if returnTrip.from exists
//     if (trip.returnTrip.from) {
//       const returnFromData = {
//         ...trip.returnTrip.from,
//         lat: trip.returnTrip.from.geoLocation?.lat,
//         lng: trip.returnTrip.from.geoLocation?.lng,
//         place_name: trip.returnTrip.from.name,
//         place_id: trip.returnTrip.from.place_id || trip.returnTrip.from.id,
//       };
//       setFromReturn(returnFromData);
//     }

//     // Check if returnTrip.to exists
//     if (trip.returnTrip.to) {
//       const returnToData = {
//         ...trip.returnTrip.to,
//         lat: trip.returnTrip.to.geoLocation?.lat,
//         lng: trip.returnTrip.to.geoLocation?.lng,
//         place_name: trip.returnTrip.to.name,
//         place_id: trip.returnTrip.to.place_id || trip.returnTrip.to.id,
//       };
//       setToReturn(returnToData);
//     }

//     // Set return stops with null checks
//     if (trip.returnTrip.stops && Array.isArray(trip.returnTrip.stops)) {
//       const returnStopsData = trip.returnTrip.stops.map((stop: any) => ({
//         ...stop,
//         lat: stop.geoLocation?.lat,
//         lng: stop.geoLocation?.lng,
//         place_name: stop.name,
//         place_id: stop.place_id || stop.id,
//       }));
//       setStopsReturn(returnStopsData);
//     }

//     // Set return fares with null checks
//     if (trip.returnTrip.fares?.fares && Array.isArray(trip.returnTrip.fares.fares)) {
//       console.log(trip.returnTrip.fares?.fares);
//       setAllPossibleFaresReturn([...trip.returnTrip.fares.fares]);
//     }
//   }
// };
//   // Handle trip selection for copying
//   const handleTripSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     event.preventDefault();
//     if (event.target.value !== '') {
//       const trip = trips.find((trip) => trip.id === event.target.value);
//       if (trip) {
//         setSelectedTrip(trip);
//         setValues(trip, vehicles, drivers, [vendor]);
//       } else {
//         console.warn('Selected trip not found');
//       }
//     }
//   };

//   // Load initial data
// useEffect(() => {
//   if (initialData) {
//     console.log('Loading initial data:', initialData);
//     setValues(initialData, vehicles, drivers, [vendor]);
//   }
// }, [initialData, reset]);

//   // Generate fares when route changes (original logic)
//   useEffect(() => {
//     if (from.place_id && to.place_id && !isEdit) {
//       generateFares();
//     }
//   }, [stops, from, to, isEdit]);

//   // Set return stops when return trip is enabled
//   // useEffect(() => {
//   //   if (watchReturnTrip && from.place_id && to.place_id) {
//   //     setStopsReturn([...stops].reverse());
//   //     setFromReturn(to);
//   //     setToReturn(from);

//   //     // Generate return fares immediately
//   //     if (!isEdit) {
//   //       setTimeout(() => generateReturnFares(), 100);
//   //     }
//   //   }
//   // }, [watchReturnTrip, from, to, stops]);

// useEffect(() => {
//   if (watchReturnTrip && from.place_id && to.place_id) {
//     // Set return trip data immediately
//     const reversedStops = [...stops].reverse();
    
//     setStopsReturn(reversedStops);
//     setFromReturn(to);
//     setToReturn(from);

//     // Generate return fares in next tick to ensure state is updated
//     if (!isEdit) {
//       // Use a promise to ensure state updates are complete
//       Promise.resolve().then(() => {
//         setTimeout(() => {          
//           // Call generateReturnFares with the updated values directly
//           generateReturnFaresWithValues(to, from, reversedStops);
//         }, 150);
//       });
//     }
//   } else if (!watchReturnTrip) {
//     // Clear return trip data when disabled
//     setStopsReturn([]);
//     setFromReturn({});
//     setToReturn({});
//     setAllPossibleFaresReturn([]);
//   }
// }, [watchReturnTrip, from, to, stops, isEdit]);


// const generateReturnFaresWithValues = (fromRet: any, toRet: any, stopsRet: any[]) => {

//   // Validate that we have the required data
//   if (!fromRet?.place_id || !toRet?.place_id) {
//     console.warn('⚠️ Missing return trip locations, skipping fare generation');
//     return;
//   }

//   let tempFareObj: any[] = [];
//   let stopsCurr = [fromRet, ...stopsRet, toRet];

//   for (let index = 0; index < stopsCurr.length; index++) {
//     for (let j = index + 1; j < stopsCurr.length; j++) {
//       let element;
//       if (stopsCurr[index].place_id === fromRet.place_id && stopsCurr[j].place_id === toRet.place_id) {
//         element = {
//           from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
//           to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
//           fare: "1",
//           hidden: false,
//           master: true
//         };
//       } else {
//         element = {
//           from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
//           to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
//           fare: "0",
//           hidden: false,
//           master: false
//         };
//       }
//       tempFareObj.push(element);
//     }
//   }

//   setAllPossibleFaresReturn(tempFareObj);
// };

//   const generateFares = () => {
//     let tempFareObj: any[] = [];
//     let stopsCurr = [from, ...stops, to];

//     for (let index = 0; index < stopsCurr.length; index++) {
//       for (let j = index + 1; j < stopsCurr.length; j++) {
//         let element;
//         if (stopsCurr[index].place_id === from.place_id && stopsCurr[j].place_id === to.place_id) {
//           element = {
//             from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
//             to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
//             fare: "1",
//             hidden: false,
//             master: true
//           };
//         } else {
//           element = {
//             from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
//             to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
//             fare: "0",
//             hidden: false,
//             master: false
//           };
//         }
//         tempFareObj.push(element);
//       }
//     }
//     setAllPossibleFares(tempFareObj);
//   };

//   const generateReturnFares = () => {
//     let tempFareObj: any[] = [];
//     let stopsCurr = [fromReturn, ...stopsReturn, toReturn];

//     for (let index = 0; index < stopsCurr.length; index++) {
//       for (let j = index + 1; j < stopsCurr.length; j++) {
//         let element;
//         if (stopsCurr[index].place_id === fromReturn.place_id && stopsCurr[j].place_id === toReturn.place_id) {
//           element = {
//             from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
//             to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
//             fare: "1",
//             hidden: false,
//             master: true
//           };
//         } else {
//           element = {
//             from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
//             to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
//             fare: "0",
//             hidden: false,
//             master: false
//           };
//         }
//         tempFareObj.push(element);
//       }
//     }
//     setAllPossibleFaresReturn(tempFareObj);
//   };

//   const removeFromStops = (stopToRemove: any) => {
//     setStops(stops.filter(stop => stop !== stopToRemove));
//   };

//   const setFare = (event: any, idx: number) => {
//     let allPossibleFaresTemp = [...allPossibleFares];
//     allPossibleFaresTemp[idx].fare = event.target.value.toString();
//     setAllPossibleFares(allPossibleFaresTemp);
//   };

//   const setFareReturn = (event: any, idx: number) => {
//     let allPossibleFaresTemp = [...allPossibleFaresReturn];
//     allPossibleFaresTemp[idx].fare = event.target.value.toString();
//     setAllPossibleFaresReturn(allPossibleFaresTemp);
//   };

//   const updateHiddenFares = (idx: number, isReturn: boolean) => {
//     if (isReturn) {
//       let allPossibleFaresTemp = [...allPossibleFaresReturn];
//       allPossibleFaresTemp[idx].hidden = !allPossibleFaresTemp[idx].hidden;
//       setAllPossibleFaresReturn(allPossibleFaresTemp);
//     } else {
//       let allPossibleFaresTemp = [...allPossibleFares];
//       allPossibleFaresTemp[idx].hidden = !allPossibleFaresTemp[idx].hidden;
//       setAllPossibleFares(allPossibleFaresTemp);
//     }
//   };

//   const onSubmitForm = async (data: TripFormData) => {
//     if (!from.place_id || !to.place_id) {
//       alert('Please select origin and destination');
//       return;
//     }

//     const tripData = {
//       vendor: vendor.id,
//       from,
//       to,
//       duration: 0,
//       tripDate: data.tripDate,
//       vehicle: data.vehicle,
//       driver: data.driver,
//       luggage: data.luggage,
//       stops,
//       tripDescription: data.tripDescription,
//       totalTripAmount: 0,
//       refreshments: data.refreshments,
//       bookingAmount: data.bookingAmount,
//       returnTrip: data.returnTrip ? {
//         isReturnTrip: true,
//         vendor: vendor.id,
//         from: fromReturn,
//         to: toReturn,
//         duration: 0,
//         tripDate: data.returnTripDate || data.tripDate,
//         vehicle: data.vehicle,
//         driver: data.driver,
//         luggage: data.luggage,
//         stops: stopsReturn,
//         tripDescription: data.tripDescription,
//         totalTripAmount: 0,
//         refreshments: data.refreshments,
//         bookingAmount: data.bookingAmount,
//         fares: allPossibleFaresReturn,
//       } : null,
//       fares: allPossibleFares,
//     };

//     await onSubmit(tripData);
//   };

//   const vehicleOptions = vehicles.map(vehicle => ({
//     value: vehicle.id,
//     label: `${vehicle.name} (${vehicle.totalSeats} seats)`,
//   }));

//   const driverOptions = drivers.map(driver => ({
//     value: driver.id,
//     label: driver.name,
//   }));

//   const luggageOptions = [
//     { value: 's', label: 'Small' },
//     { value: 'm', label: 'Medium' },
//     { value: 'l', label: 'Large' },
//   ];

//   // Prepare trips for select dropdown
//   const tripOptions = trips.map(trip => {
//     const tripName = trip.returnTrip
//       ? `${trip.from?.name} - ${trip.to?.name} - ${trip.from?.name}`
//       : `${trip.from?.name} - ${trip.to?.name}`;

//     return {
//       value: trip.id,
//       label: tripName || `Trip ${trip.id}`,
//     };
//   });

//   return (
//     <div className="max-w-6xl mx-auto">
//       <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
//         {/* Copy Previous Trip Card - Only show when not editing */}
//         {!isEdit && trips.length > 0 && (
//           <Card className="shadow-lg border-0 bg-white">
//             <CardHeader className="bg-white text-black rounded-t-lg">
//               <h2 className="text-xl font-bold flex items-center">
//                 <Copy className="w-6 h-6 mr-3" />
//                 Copy from Previous Trip
//               </h2>
//             </CardHeader>
//             <CardContent className="p-8">
//               <div className="max-w-md">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Select a trip to copy values from
//                 </label>
//                 <Select
//                   value={selectedTrip.id || ''}
//                   onChange={handleTripSelect}
//                   options={[{ value: '', label: 'Select Previous Trip' }, ...tripOptions]}
//                   className="text-lg"
//                 />
//                 <p className="text-sm text-gray-600 mt-2">
//                   This will copy all trip details including locations, vehicle, driver and fare.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Route Information Card */}
//         <Card className="shadow-lg border-0 bg-white">
//           <CardHeader className="bg-white text-black rounded-t-lg">
//             <h2 className="text-xl font-bold flex items-center">
//               <MapPin className="w-6 h-6 mr-3" />
//               Route Information
//             </h2>
//           </CardHeader>
//           <CardContent className="p-8 space-y-6">
//             {/* Origin and Destination */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <MapPin className="w-4 h-4 inline mr-2 text-green-600" />
//                   Origin <span className="text-red-500">*</span>
//                 </label>
//                 <GoogleAutocomplete
//                   value={fromInput}
//                   onChange={(value) => setFromInput(value)}
//                   onPlaceSelected={(place) => {
//                     const fromData = {
//                       lat: place.lat,
//                       lng: place.lng,
//                       place_id: place.place_id,
//                       place_name: place.place_name,
//                       name: place.name
//                     };
//                     setFrom(fromData);
//                     setFromInput(place.place_name);
//                   }}
//                   placeholder="Enter origin location"
//                   className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 {from.place_name && (
//                   <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-green-800">
//                     <MapPin className="w-4 h-4 inline mr-2" />
//                     {from.place_name}
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <MapPin className="w-4 h-4 inline mr-2 text-green-600" />
//                   Destination <span className="text-red-500">*</span>
//                 </label>
//                 <GoogleAutocomplete
//                   value={toInput}
//                   onChange={(value) => setToInput(value)}
//                   onPlaceSelected={(place) => {
//                     const toData = {
//                       lat: place.lat,
//                       lng: place.lng,
//                       place_id: place.place_id,
//                       place_name: place.place_name,
//                       name: place.name
//                     };
//                     setTo(toData);
//                     setToInput(place.place_name);
//                   }}
//                   placeholder="Enter destination location"
//                   className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 {to.place_name && (
//                   <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-green-800">
//                     <MapPin className="w-4 h-4 inline mr-2" />
//                     {to.place_name}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Stops */}
//             <div className="space-y-4">
//               <label className="block text-sm font-semibold text-gray-700">
//                 <Plus className="w-4 h-4 inline mr-2 text-blue-600" />
//                 Stops (Optional)
//               </label>

//               {stops.length > 0 && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                   {stops.map((stop: any, index: number) => (
//                     <div key={index} className="flex items-center justify-between bg-blue-100 border border-blue-300 rounded-lg p-3">
//                       <div className="flex items-center">
//                         <MapPin className="w-4 h-4 mr-2 text-blue-600" />
//                         <span className="text-sm font-medium text-blue-800">{stop.place_name}</span>
//                       </div>
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => removeFromStops(stop)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <X className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <GoogleAutocomplete
//                 value={stopInputValue}
//                 onChange={(value) => setStopInputValue(value)}
//                 onPlaceSelected={(place) => {

//                   const stopData = {
//                     lat: place.lat,
//                     lng: place.lng,
//                     place_id: place.place_id,
//                     place_name: place.place_name,
//                     name: place.name
//                   };

//                   // Check if stop already exists
//                   const exists = stops.some(stop => stop.place_id === stopData.place_id);
//                   if (!exists) {
//                     setStops(prev => [...prev, stopData]);
//                   } else {
//                     console.log('Stop already exists');
//                   }

//                   // Clear the input
//                   setStopInputValue('');
//                 }}
//                 placeholder="Add a stop location"
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Rest of the form components remain the same... */}
//         {/* Trip Details Card */}
//         <Card className="shadow-lg border-0">
//           <CardHeader className="bg-white text-black rounded-t-lg">
//             <h2 className="text-xl font-bold flex items-center">
//               <Calendar className="w-6 h-6 mr-3" />
//               Trip Details
//             </h2>
//           </CardHeader>
//           <CardContent className="p-8 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Input
//                 label="Trip Description"
//                 {...register('tripDescription')}
//                 error={errors.tripDescription?.message}
//                 className="px-4 py-3 text-lg"
//                 placeholder="Describe the trip purpose"
//               />

//               <Controller
//                 name="tripDate"
//                 control={control}
//                 render={({ field }) => (
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       <Calendar className="w-4 h-4 inline mr-2" />
//                       Trip Date <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="datetime-local"
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
//                       value={field.value ? dayjs(field.value).format('YYYY-MM-DDTHH:mm') : ''}
//                       onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
//                     />
//                     {errors.tripDate && (
//                       <p className="text-sm text-red-600 mt-1">{errors.tripDate.message}</p>
//                     )}
//                   </div>
//                 )}
//               />
//             </div>

//             <Input
//               label="Booking Amount ($)"
//               type="number"
//               min="1"
//               {...register('bookingAmount', { valueAsNumber: true })}
//               error={errors.bookingAmount?.message}
//               className="px-4 py-3 text-lg max-w-md"
//               placeholder="Minimum booking amount"
//             />
//           </CardContent>
//         </Card>

//         {/* Vehicle & Driver Card */}
//         {/* // Replace the Vehicle and Driver selection sections with this: */}

//         {/* Vehicle & Driver Card */}
//         <Card className="shadow-lg border-0">
//           <CardHeader className="bg-white text-black rounded-t-lg">
//             <h2 className="text-xl font-bold flex items-center">
//               <Car className="w-6 h-6 mr-3" />
//               Vehicle & Driver Assignment
//             </h2>
//           </CardHeader>
//           <CardContent className="p-8 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <Car className="w-4 h-4 inline mr-2" />
//                   Vehicle <span className="text-red-500">*</span>
//                 </label>
//                 <Controller
//                   name="vehicle"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       options={[{ value: '', label: 'Select Vehicle' }, ...vehicleOptions]}
//                       error={errors.vehicle?.message}
//                       className="text-lg"
//                     />
//                   )}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <User className="w-4 h-4 inline mr-2" />
//                   Driver <span className="text-red-500">*</span>
//                 </label>
//                 <Controller
//                   name="driver"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       options={[{ value: '', label: 'Select Driver' }, ...driverOptions]}
//                       error={errors.driver?.message}
//                       className="text-lg"
//                     />
//                   )}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Options & Preferences Card */}
//         <Card className="shadow-lg border-0">
//           <CardHeader className="bg-white text-black rounded-t-lg">
//             <h2 className="text-xl font-bold flex items-center">
//               <Package className="w-6 h-6 mr-3" />
//               Trip Options & Preferences
//             </h2>
//           </CardHeader>
//           <CardContent className="p-8 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {/* Luggage Types */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-4">
//                   <Package className="w-4 h-4 inline mr-2" />
//                   Luggage Types <span className="text-red-500">*</span>
//                 </label>
//                 <div className="space-y-3">
//                   {luggageOptions.map((option) => (
//                     <label key={option.value} className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-colors cursor-pointer">
//                       <input
//                         type="checkbox"
//                         value={option.value}
//                         {...register('luggage')}
//                         className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 mr-3"
//                       />
//                       <span className="text-sm font-medium">{option.label}</span>
//                     </label>
//                   ))}
//                 </div>
//                 {errors.luggage && (
//                   <p className="text-sm text-red-600 mt-2">{errors.luggage.message}</p>
//                 )}
//               </div>

//               {/* Additional Options */}
//               <div className="space-y-4">
//                 <label className="block text-sm font-semibold text-gray-700 mb-4">
//                   Additional Services
//                 </label>

//                 <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors cursor-pointer">
//                   <input
//                     type="checkbox"
//                     {...register('refreshments')}
//                     className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-3"
//                   />
//                   <div className="flex items-center">
//                     <Coffee className="w-5 h-5 mr-2 text-green-600" />
//                     <span className="text-sm font-medium">Refreshments Available</span>
//                   </div>
//                 </label>

//                 <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
//                   <input
//                     type="checkbox"
//                     {...register('returnTrip')}
//                     className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
//                   />
//                   <div className="flex items-center">
//                     <RotateCcw className="w-5 h-5 mr-2 text-blue-600" />
//                     <span className="text-sm font-medium">Return Trip</span>
//                   </div>
//                 </label>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Fares Table */}
//         {allPossibleFares.length > 0 && (
//           <Card className="shadow-lg border-0">
//             <CardHeader className="bg-white text-black rounded-t-lg">
//               <h3 className="text-xl font-bold">💰 Fare Structure</h3>
//             </CardHeader>
//             <CardContent className="p-8">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">From</th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">To</th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Fare ($)</th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {allPossibleFares.map((fare: any, index: number) => (
//                       !fare.hidden && (
//                         <tr key={index} className={`${fare.master ? 'bg-indigo-50 border-l-4 border-indigo-500' : 'hover:bg-gray-50'} transition-colors`}>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                             {fare.master && <span className="text-indigo-600 font-bold mr-2">★</span>}
//                             {fare.from.name}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                             {fare.to.name}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <input
//                               type="number"
//                               min={fare.master ? "1" : "0"}
//                               step="0.01"
//                               className="w-32 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg font-semibold"
//                               value={fare.fare}
//                               onWheel={(e) => e.currentTarget.blur()}
//                               onChange={(e) => setFare(e, index)}
//                               placeholder="0.00"
//                             />
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {!fare.master && (
//                               <Button
//                                 type="button"
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={() => updateHiddenFares(index, false)}
//                                 className="text-red-600 hover:text-red-800 hover:bg-red-50"
//                               >
//                                 <X className="w-4 h-4 mr-1" />
//                                 Remove
//                               </Button>
//                             )}
//                             {fare.master && (
//                               <span className="text-xs text-indigo-600 font-semibold">Main Route</span>
//                             )}
//                           </td>
//                         </tr>
//                       )
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Return Trip Section */}
//         {watchReturnTrip && (
//           <Card className="shadow-lg border-0 border-l-4 border-blue-500">
//             <CardHeader className="bg-white text-black rounded-t-lg">
//               <h2 className="text-xl font-bold flex items-center">
//                 <RotateCcw className="w-6 h-6 mr-3" />
//                 Return Trip Details
//               </h2>
//             </CardHeader>
//             <CardContent className="p-8 space-y-6">
//               <Controller
//                 name="returnTripDate"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="max-w-md">
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       <Calendar className="w-4 h-4 inline mr-2" />
//                       Return Trip Date
//                     </label>
//                     <input
//                       type="datetime-local"
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
//                       value={field.value ? dayjs(field.value).format('YYYY-MM-DDTHH:mm') : ''}
//                       onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
//                     />
//                   </div>
//                 )}
//               />

//               {/* Return Route Info */}
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//                 <h4 className="text-lg font-semibold text-blue-800 mb-4">Return Route</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <span className="text-sm font-medium text-blue-600">Return From:</span>
//                     <p className="text-blue-900 font-semibold">{toReturn.place_name || to.place_name || 'Not set'}</p>
//                   </div>
//                   <div>
//                     <span className="text-sm font-medium text-blue-600">Return To:</span>
//                     <p className="text-blue-900 font-semibold">{fromReturn.place_name || from.place_name || 'Not set'}</p>
//                   </div>
//                 </div>
//                 {stopsReturn.length > 0 && (
//                   <div className="mt-4">
//                     <span className="text-sm font-medium text-blue-600">Return Stops:</span>
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {stopsReturn.map((stop: any, index: number) => (
//                         <span key={index} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                           {stop.place_name}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Return Trip Fares Table */}
//               {allPossibleFaresReturn.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     💰 Return Trip Fare Structure
//                   </h3>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
//                       <thead className="bg-blue-50">
//                         <tr>
//                           <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">From</th>
//                           <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">To</th>
//                           <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Fare ($)</th>
//                           <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {allPossibleFaresReturn.map((fare: any, index: number) => (
//                           !fare.hidden && (
//                             <tr key={index} className={`${fare.master ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'} transition-colors`}>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 {fare.master && <span className="text-blue-600 font-bold mr-2">★</span>}
//                                 {fare.from.name}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 {fare.to.name}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <input
//                                   type="number"
//                                   min={fare.master ? "1" : "0"}
//                                   step="0.01"
//                                   onWheel={(e) => e.currentTarget.blur()}
//                                   className="w-32 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
//                                   value={fare.fare}
//                                   onChange={(e) => setFareReturn(e, index)}
//                                   placeholder="0.00"
//                                 />
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 {!fare.master && (
//                                   <Button
//                                     type="button"
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => updateHiddenFares(index, true)}
//                                     className="text-red-600 hover:text-red-800 hover:bg-red-50"
//                                   >
//                                     <X className="w-4 h-4 mr-1" />
//                                     Remove
//                                   </Button>
//                                 )}
//                                 {fare.master && (
//                                   <span className="text-xs text-blue-600 font-semibold">Main Route</span>
//                                 )}
//                               </td>
//                             </tr>
//                           )
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         )}

//         {/* Form Actions */}
//         <Card className="shadow-lg border-0">
//           <CardContent className="p-8">
//             <div className="flex justify-end space-x-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => {
//                   reset();
//                   setFrom({});
//                   setTo({});
//                   setStops([]);
//                   setFromInput('');
//                   setToInput('');
//                   setStopInputValue('');
//                   setSelectedTrip({});
//                   setAllPossibleFares([]);
//                   setAllPossibleFaresReturn([]);
//                 }}
//                 className="px-8 py-3 text-lg"
//               >
//                 Reset Form
//               </Button>
//               <Button
//                 type="submit"
//                 loading={loading}
//                 className="px-8 py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
//               >
//                 {isEdit ? '✅ Update Trip' : '🚀 Create Trip'}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </form>
//     </div>
//   );
// };
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Select } from '../../components/ui';
import { Card, CardContent, CardHeader } from '../../components/ui';
import { Vehicle, Driver, Vendor } from '../../types';
import { X, MapPin, Plus, Calendar, Car, User, Package, Coffee, RotateCcw, Copy } from 'lucide-react';
import dayjs from 'dayjs';
import { GoogleAutocomplete } from '../common/GoogleAutocomplete';

const tripSchema = z.object({
  tripDescription: z.string().min(1, 'Trip description is required'),
  tripDate: z.string().min(1, 'Trip date is required'),
  vehicle: z.string().min(1, 'Vehicle selection is required'),
  driver: z.string().min(1, 'Driver selection is required'),
  luggage: z.array(z.string()).min(1, 'At least one luggage type must be selected'),
  refreshments: z.boolean(),
  bookingAmount: z.number().min(1, 'Booking amount must be at least 1'),
  returnTrip: z.boolean(),
  returnTripDate: z.string().optional(),
});

type TripFormData = z.infer<typeof tripSchema>;

interface TripFormProps {
  initialData?: any;
  vehicles: Vehicle[];
  drivers: Driver[];
  vendor: Vendor;
  trips?: any[];
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
  isEdit?: boolean;
  setDateAuto?: boolean;
}

export const TripForm: React.FC<TripFormProps> = ({
  initialData,
  vehicles,
  drivers,
  vendor,
  setDateAuto,
  trips = [],
  onSubmit,
  loading = false,
  isEdit = false,
}) => {
  // State from original logic
  const [from, setFrom] = useState<any>({});
  const [to, setTo] = useState<any>({});
  const [stops, setStops] = useState<any[]>([]);
  const [fromReturn, setFromReturn] = useState<any>({});
  const [toReturn, setToReturn] = useState<any>({});
  const [stopsReturn, setStopsReturn] = useState<any[]>([]);
  const [allPossibleFares, setAllPossibleFares] = useState<any[]>([]);
  const [allPossibleFaresReturn, setAllPossibleFaresReturn] = useState<any[]>([]);
  const [stopInputValue, setStopInputValue] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<any>({});
  
  // Add flag to prevent auto-generation when copying fares - REMOVED, using better logic
  // const [isCopyingFares, setIsCopyingFares] = useState(false);

  // Input states for location fields
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      refreshments: false,
      returnTrip: false,
      luggage: [],
      bookingAmount: 1,
      tripDescription: '',
      tripDate: '',
      vehicle: '',
      driver: '',
    },
  });

  const watchReturnTrip = watch('returnTrip');

  // Copy values from previous trip function
  const setValues = (trip: any, vehicles: any[], drivers: any[], vendors: any[]) => {
    console.log('Copying values from trip:', trip);

    // Add comprehensive null checks
    if (!trip) {
      console.warn('Trip data is null, skipping setValues');
      return;
    }

    // Set form values with safe property access
    reset({
      tripDescription: trip.tripDescription || '',
      tripDate: setDateAuto ? (trip.tripDate || '') : '',
      vehicle: trip.vehicle?.id || '',
      driver: trip.driver?.id || '',
      luggage: trip.luggage || [],
      refreshments: trip.refreshments || false,
      bookingAmount: trip.bookingAmount || trip.bookingMinimumAmount || 1,
      returnTrip: !!trip.returnTrip,
      returnTripDate: setDateAuto ? (trip.returnTrip?.tripDate || '') : '',
    });

    // Set locations for main trip with null checks
    if (trip.from) {
      const fromData = {
        ...trip.from,
        lat: trip.from.geoLocation?.lat || trip.from.lat,
        lng: trip.from.geoLocation?.lng || trip.from.lng,
        place_name: trip.from.name,
        place_id: trip.from.place_id || trip.from.id,
      };
      setFrom(fromData);
      setFromInput(fromData.place_name || fromData.name || '');
    }

    if (trip.to) {
      const toData = {
        ...trip.to,
        lat: trip.to.geoLocation?.lat || trip.to.lat,
        lng: trip.to.geoLocation?.lng || trip.to.lng,
        place_name: trip.to.name,
        place_id: trip.to.place_id || trip.to.id,
      };
      setTo(toData);
      setToInput(toData.place_name || toData.name || '');
    }

    // Set stops with null check
    if (trip.stops && Array.isArray(trip.stops)) {
      const stopsData = [];
      for (let i = 0; i < trip.stops.length; i++) {
        const stop = trip.stops[i];
        stopsData.push({
          ...stop,
          lat: stop.geoLocation?.lat || stop.lat,
          lng: stop.geoLocation?.lng || stop.lng,
          place_name: stop.name,
          place_id: stop.place_id || stop.id,
        });
      }
      setStops(stopsData);
    }

    // Set return trip data if exists - with comprehensive null checks
    if (trip.returnTrip && typeof trip.returnTrip === 'object') {
      // Check if returnTrip.from exists
      if (trip.returnTrip.from) {
        const returnFromData = {
          ...trip.returnTrip.from,
          lat: trip.returnTrip.from.geoLocation?.lat,
          lng: trip.returnTrip.from.geoLocation?.lng,
          place_name: trip.returnTrip.from.name,
          place_id: trip.returnTrip.from.place_id || trip.returnTrip.from.id,
        };
        setFromReturn(returnFromData);
      }

      // Check if returnTrip.to exists
      if (trip.returnTrip.to) {
        const returnToData = {
          ...trip.returnTrip.to,
          lat: trip.returnTrip.to.geoLocation?.lat,
          lng: trip.returnTrip.to.geoLocation?.lng,
          place_name: trip.returnTrip.to.name,
          place_id: trip.returnTrip.to.place_id || trip.returnTrip.to.id,
        };
        setToReturn(returnToData);
      }

      // Set return stops with null checks
      if (trip.returnTrip.stops && Array.isArray(trip.returnTrip.stops)) {
        const returnStopsData = [];
        for (let i = 0; i < trip.returnTrip.stops.length; i++) {
          const stop = trip.returnTrip.stops[i];
          returnStopsData.push({
            ...stop,
            lat: stop.geoLocation?.lat,
            lng: stop.geoLocation?.lng,
            place_name: stop.name,
            place_id: stop.place_id || stop.id,
          });
        }
        setStopsReturn(returnStopsData);
      }

      // Set return fares with null checks - PRESERVE ORIGINAL RETURN FARES
      if (trip.returnTrip.fares?.fares && Array.isArray(trip.returnTrip.fares.fares)) {
        console.log('💰 Setting copied return fares:', trip.returnTrip.fares.fares);
        setAllPossibleFaresReturn([...trip.returnTrip.fares.fares]);
      }
    }

    // Set fares with null checks - PRESERVE ORIGINAL FARES - DO THIS LAST
    if (trip.fares?.fares && Array.isArray(trip.fares.fares)) {
      console.log('💰 Setting copied fares (FINAL):', trip.fares.fares);
      // Use setTimeout to ensure this happens after all other state updates
      setTimeout(() => {
        setAllPossibleFares([...trip.fares.fares]);
      }, 100);
    }
  };

  // Handle trip selection for copying
  const handleTripSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if (event.target.value !== '') {
      const trip = trips.find((trip) => trip.id === event.target.value);
      if (trip) {
        setSelectedTrip(trip);
        setValues(trip, vehicles, drivers, [vendor]);
      } else {
        console.warn('Selected trip not found');
      }
    }
  };

  // Load initial data
  useEffect(() => {
    if (initialData) {
      console.log('Loading initial data:', initialData);
      setValues(initialData, vehicles, drivers, [vendor]);
    }
  }, [initialData, reset]);

  // Generate fares when route changes (original logic) - Smart detection of route changes
  useEffect(() => {
    console.log('📊 Fare generation useEffect triggered:', { 
      hasFrom: !!from.place_id, 
      hasTo: !!to.place_id, 
      isEdit, 
      stopsLength: stops.length,
      currentFaresLength: allPossibleFares.length
    });
    
    if (from.place_id && to.place_id && !isEdit) {
      // Calculate expected number of fare combinations for current route
      const totalStops = 2 + stops.length; // from + to + stops
      const expectedFares = (totalStops * (totalStops - 1)) / 2;
      
      console.log('📈 Expected vs Current fares:', { expectedFares, currentFares: allPossibleFares.length });
      
      // Generate fares if:
      // 1. No fares exist (new route)
      // 2. Number of fares doesn't match expected (route structure changed)
      if (allPossibleFares.length === 0 || allPossibleFares.length !== expectedFares) {
        console.log('✅ Generating fares - route structure changed or new route');
        generateFares();
      } else {
        console.log('❌ Skipping fare generation - fares match route structure');
      }
    }
  }, [stops, from, to, isEdit]);

  // Set return stops when return trip is enabled - Smart detection of return route changes  
  useEffect(() => {
    console.log('🔄 Return trip useEffect triggered:', { 
      watchReturnTrip, 
      hasFrom: !!from.place_id, 
      hasTo: !!to.place_id,
      stopsCount: stops.length,
      returnFaresLength: allPossibleFaresReturn.length,
      isEdit
    });

    if (watchReturnTrip && from.place_id && to.place_id) {
      // Calculate expected number of return fare combinations
      const totalReturnStops = 2 + stopsReturn.length; // fromReturn + toReturn + stopsReturn
      const expectedReturnFares = (totalReturnStops * (totalReturnStops - 1)) / 2;
      
      console.log('📈 Expected vs Current return fares:', { 
        expectedReturnFares, 
        currentReturnFares: allPossibleFaresReturn.length 
      });

      // Auto-generate return trip data if:
      // 1. No return fares exist, OR
      // 2. Return fares don't match expected structure
      if (allPossibleFaresReturn.length === 0 || allPossibleFaresReturn.length !== expectedReturnFares) {
        // Set return trip data immediately
        const reversedStops = [...stops].reverse();
        
        console.log('🚀 Setting return trip data - structure changed or new');
        setStopsReturn(reversedStops);
        setFromReturn(to);
        setToReturn(from);

        // Generate return fares in next tick to ensure state is updated
        if (!isEdit) {
          Promise.resolve().then(() => {
            setTimeout(() => {          
              generateReturnFaresWithValues(to, from, reversedStops);
            }, 150);
          });
        }
      } else {
        console.log('⏸️ Return trip structure unchanged');
      }
    } else if (!watchReturnTrip) {
      console.log('❌ Clearing return trip data');
      // Clear return trip data when disabled
      setStopsReturn([]);
      setFromReturn({});
      setToReturn({});
      setAllPossibleFaresReturn([]);
    }
  }, [watchReturnTrip, from, to, stops, isEdit]);

  const generateReturnFaresWithValues = (fromRet: any, toRet: any, stopsRet: any[]) => {
    // Validate that we have the required data
    if (!fromRet?.place_id || !toRet?.place_id) {
      console.warn('⚠️ Missing return trip locations, skipping fare generation');
      return;
    }

    let tempFareObj: any[] = [];
    let stopsCurr = [fromRet, ...stopsRet, toRet];

    for (let index = 0; index < stopsCurr.length; index++) {
      for (let j = index + 1; j < stopsCurr.length; j++) {
        let element;
        if (stopsCurr[index].place_id === fromRet.place_id && stopsCurr[j].place_id === toRet.place_id) {
          element = {
            from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
            to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
            fare: "1",
            hidden: false,
            master: true
          };
        } else {
          element = {
            from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
            to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
            fare: "0",
            hidden: false,
            master: false
          };
        }
        tempFareObj.push(element);
      }
    }

    setAllPossibleFaresReturn(tempFareObj);
  };

  const generateFares = () => {
    let tempFareObj: any[] = [];
    let stopsCurr = [from, ...stops, to];

    for (let index = 0; index < stopsCurr.length; index++) {
      for (let j = index + 1; j < stopsCurr.length; j++) {
        let element;
        if (stopsCurr[index].place_id === from.place_id && stopsCurr[j].place_id === to.place_id) {
          element = {
            from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
            to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
            fare: "1",
            hidden: false,
            master: true
          };
        } else {
          element = {
            from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
            to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
            fare: "0",
            hidden: false,
            master: false
          };
        }
        tempFareObj.push(element);
      }
    }
    setAllPossibleFares(tempFareObj);
  };

  const generateReturnFares = () => {
    let tempFareObj: any[] = [];
    let stopsCurr = [fromReturn, ...stopsReturn, toReturn];

    for (let index = 0; index < stopsCurr.length; index++) {
      for (let j = index + 1; j < stopsCurr.length; j++) {
        let element;
        if (stopsCurr[index].place_id === fromReturn.place_id && stopsCurr[j].place_id === toReturn.place_id) {
          element = {
            from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
            to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
            fare: "1",
            hidden: false,
            master: true
          };
        } else {
          element = {
            from: { name: stopsCurr[index].place_name, place_id: stopsCurr[index].place_id },
            to: { name: stopsCurr[j].place_name, place_id: stopsCurr[j].place_id },
            fare: "0",
            hidden: false,
            master: false
          };
        }
        tempFareObj.push(element);
      }
    }
    setAllPossibleFaresReturn(tempFareObj);
  };

  const removeFromStops = (stopToRemove: any) => {
    setStops(stops.filter(stop => stop !== stopToRemove));
  };

  const setFare = (event: any, idx: number) => {
    let allPossibleFaresTemp = [...allPossibleFares];
    allPossibleFaresTemp[idx].fare = event.target.value.toString();
    setAllPossibleFares(allPossibleFaresTemp);
  };

  const setFareReturn = (event: any, idx: number) => {
    let allPossibleFaresTemp = [...allPossibleFaresReturn];
    allPossibleFaresTemp[idx].fare = event.target.value.toString();
    setAllPossibleFaresReturn(allPossibleFaresTemp);
  };

  const updateHiddenFares = (idx: number, isReturn: boolean) => {
    if (isReturn) {
      let allPossibleFaresTemp = [...allPossibleFaresReturn];
      allPossibleFaresTemp[idx].hidden = !allPossibleFaresTemp[idx].hidden;
      setAllPossibleFaresReturn(allPossibleFaresTemp);
    } else {
      let allPossibleFaresTemp = [...allPossibleFares];
      allPossibleFaresTemp[idx].hidden = !allPossibleFaresTemp[idx].hidden;
      setAllPossibleFares(allPossibleFaresTemp);
    }
  };

  const onSubmitForm = async (data: TripFormData) => {
    if (!from.place_id || !to.place_id) {
      alert('Please select origin and destination');
      return;
    }

    const tripData = {
      vendor: vendor.id,
      from,
      to,
      duration: 0,
      tripDate: data.tripDate,
      vehicle: data.vehicle,
      driver: data.driver,
      luggage: data.luggage,
      stops,
      tripDescription: data.tripDescription,
      totalTripAmount: 0,
      refreshments: data.refreshments,
      bookingAmount: data.bookingAmount,
      returnTrip: data.returnTrip ? {
        isReturnTrip: true,
        vendor: vendor.id,
        from: fromReturn,
        to: toReturn,
        duration: 0,
        tripDate: data.returnTripDate || data.tripDate,
        vehicle: data.vehicle,
        driver: data.driver,
        luggage: data.luggage,
        stops: stopsReturn,
        tripDescription: data.tripDescription,
        totalTripAmount: 0,
        refreshments: data.refreshments,
        bookingAmount: data.bookingAmount,
        fares: allPossibleFaresReturn,
      } : null,
      fares: allPossibleFares,
    };

    await onSubmit(tripData);
  };

  const vehicleOptions = vehicles.map(vehicle => ({
    value: vehicle.id,
    label: `${vehicle.name} (${vehicle.totalSeats} seats)`,
  }));

  const driverOptions = drivers.map(driver => ({
    value: driver.id,
    label: driver.name,
  }));

  const luggageOptions = [
    { value: 's', label: 'Small' },
    { value: 'm', label: 'Medium' },
    { value: 'l', label: 'Large' },
  ];

  // Prepare trips for select dropdown
  const tripOptions = trips.map(trip => {
    const tripName = trip.returnTrip
      ? `${trip.from?.name} - ${trip.to?.name} - ${trip.from?.name}`
      : `${trip.from?.name} - ${trip.to?.name}`;

    return {
      value: trip.id,
      label: tripName || `Trip ${trip.id}`,
    };
  });

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
        {/* Copy Previous Trip Card - Only show when not editing */}
        {!isEdit && trips.length > 0 && (
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="bg-white text-black rounded-t-lg">
              <h2 className="text-xl font-bold flex items-center">
                <Copy className="w-6 h-6 mr-3" />
                Copy from Previous Trip
              </h2>
            </CardHeader>
            <CardContent className="p-8">
              <div className="max-w-md">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select a trip to copy values from
                </label>
                <Select
                  value={selectedTrip.id || ''}
                  onChange={handleTripSelect}
                  options={[{ value: '', label: 'Select Previous Trip' }, ...tripOptions]}
                  className="text-lg"
                />
                <p className="text-sm text-gray-600 mt-2">
                  This will copy all trip details including locations, vehicle, driver and <strong>original fare values</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Route Information Card */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-white text-black rounded-t-lg">
            <h2 className="text-xl font-bold flex items-center">
              <MapPin className="w-6 h-6 mr-3" />
              Route Information
            </h2>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* Origin and Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2 text-green-600" />
                  Origin <span className="text-red-500">*</span>
                </label>
                <GoogleAutocomplete
                  value={fromInput}
                  onChange={(value) => setFromInput(value)}
                  onPlaceSelected={(place) => {
                    const fromData = {
                      lat: place.lat,
                      lng: place.lng,
                      place_id: place.place_id,
                      place_name: place.place_name,
                      name: place.name
                    };
                    setFrom(fromData);
                    setFromInput(place.place_name);
                  }}
                  placeholder="Enter origin location"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {from.place_name && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-green-800">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    {from.place_name}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2 text-green-600" />
                  Destination <span className="text-red-500">*</span>
                </label>
                <GoogleAutocomplete
                  value={toInput}
                  onChange={(value) => setToInput(value)}
                  onPlaceSelected={(place) => {
                    const toData = {
                      lat: place.lat,
                      lng: place.lng,
                      place_id: place.place_id,
                      place_name: place.place_name,
                      name: place.name
                    };
                    setTo(toData);
                    setToInput(place.place_name);
                  }}
                  placeholder="Enter destination location"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {to.place_name && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-green-800">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    {to.place_name}
                  </div>
                )}
              </div>
            </div>

            {/* Stops */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                <Plus className="w-4 h-4 inline mr-2 text-blue-600" />
                Stops (Optional)
              </label>

              {stops.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stops.map((stop: any, index: number) => (
                    <div key={index} className="flex items-center justify-between bg-blue-100 border border-blue-300 rounded-lg p-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">{stop.place_name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromStops(stop)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <GoogleAutocomplete
                value={stopInputValue}
                onChange={(value) => setStopInputValue(value)}
                onPlaceSelected={(place) => {
                  const stopData = {
                    lat: place.lat,
                    lng: place.lng,
                    place_id: place.place_id,
                    place_name: place.place_name,
                    name: place.name
                  };

                  // Check if stop already exists
                  const exists = stops.some(stop => stop.place_id === stopData.place_id);
                  if (!exists) {
                    setStops(prev => [...prev, stopData]);
                  } else {
                    console.log('Stop already exists');
                  }

                  // Clear the input
                  setStopInputValue('');
                }}
                placeholder="Add a stop location"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        {/* Trip Details Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-white text-black rounded-t-lg">
            <h2 className="text-xl font-bold flex items-center">
              <Calendar className="w-6 h-6 mr-3" />
              Trip Details
            </h2>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Trip Description"
                {...register('tripDescription')}
                error={errors.tripDescription?.message}
                className="px-4 py-3 text-lg"
                placeholder="Describe the trip purpose"
              />

              <Controller
                name="tripDate"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Trip Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                      value={field.value ? dayjs(field.value).format('YYYY-MM-DDTHH:mm') : ''}
                      onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
                    />
                    {errors.tripDate && (
                      <p className="text-sm text-red-600 mt-1">{errors.tripDate.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <Input
              label="Booking Amount ($)"
              type="number"
              min="1"
              {...register('bookingAmount', { valueAsNumber: true })}
              error={errors.bookingAmount?.message}
              className="px-4 py-3 text-lg max-w-md"
              placeholder="Minimum booking amount"
            />
          </CardContent>
        </Card>

        {/* Vehicle & Driver Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-white text-black rounded-t-lg">
            <h2 className="text-xl font-bold flex items-center">
              <Car className="w-6 h-6 mr-3" />
              Vehicle & Driver Assignment
            </h2>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Driver <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="driver"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[{ value: '', label: 'Select Driver' }, ...driverOptions]}
                      error={errors.driver?.message}
                      className="text-lg"
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Options & Preferences Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-white text-black rounded-t-lg">
            <h2 className="text-xl font-bold flex items-center">
              <Package className="w-6 h-6 mr-3" />
              Trip Options & Preferences
            </h2>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Luggage Types */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  <Package className="w-4 h-4 inline mr-2" />
                  Luggage Types <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {luggageOptions.map((option) => (
                    <label key={option.value} className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        value={option.value}
                        {...register('luggage')}
                        className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 mr-3"
                      />
                      <span className="text-sm font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.luggage && (
                  <p className="text-sm text-red-600 mt-2">{errors.luggage.message}</p>
                )}
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Additional Services
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('refreshments')}
                    className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-3"
                  />
                  <div className="flex items-center">
                    <Coffee className="w-5 h-5 mr-2 text-green-600" />
                    <span className="text-sm font-medium">Refreshments Available</span>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('returnTrip')}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                  />
                  <div className="flex items-center">
                    <RotateCcw className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="text-sm font-medium">Return Trip</span>
                  </div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fares Table */}
        {allPossibleFares.length > 0 && (
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-white text-black rounded-t-lg">
              <h3 className="text-xl font-bold">💰 Fare Structure</h3>
            </CardHeader>
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">From</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">To</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Fare ($)</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allPossibleFares.map((fare: any, index: number) => (
                      !fare.hidden && (
                        <tr key={index} className={`${fare.master ? 'bg-indigo-50 border-l-4 border-indigo-500' : 'hover:bg-gray-50'} transition-colors`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {fare.master && <span className="text-indigo-600 font-bold mr-2">★</span>}
                            {fare.from.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {fare.to.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min={fare.master ? "1" : "0"}
                              step="0.01"
                              className="w-32 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg font-semibold"
                              value={fare.fare}
                              onWheel={(e) => e.currentTarget.blur()}
                              onChange={(e) => setFare(e, index)}
                              placeholder="0.00"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {!fare.master && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => updateHiddenFares(index, false)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                              </Button>
                            )}
                            {fare.master && (
                              <span className="text-xs text-indigo-600 font-semibold">Main Route</span>
                            )}
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Return Trip Section */}
        {watchReturnTrip && (
          <Card className="shadow-lg border-0 border-l-4 border-blue-500">
            <CardHeader className="bg-white text-black rounded-t-lg">
              <h2 className="text-xl font-bold flex items-center">
                <RotateCcw className="w-6 h-6 mr-3" />
                Return Trip Details
              </h2>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <Controller
                name="returnTripDate"
                control={control}
                render={({ field }) => (
                  <div className="max-w-md">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Return Trip Date
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      value={field.value ? dayjs(field.value).format('YYYY-MM-DDTHH:mm') : ''}
                      onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
                    />
                  </div>
                )}
              />

              {/* Return Route Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-4">Return Route</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-blue-600">Return From:</span>
                    <p className="text-blue-900 font-semibold">{toReturn.place_name || to.place_name || 'Not set'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-600">Return To:</span>
                    <p className="text-blue-900 font-semibold">{fromReturn.place_name || from.place_name || 'Not set'}</p>
                  </div>
                </div>
                {stopsReturn.length > 0 && (
                  <div className="mt-4">
                    <span className="text-sm font-medium text-blue-600">Return Stops:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {stopsReturn.map((stop: any, index: number) => (
                        <span key={index} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {stop.place_name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Return Trip Fares Table */}
              {allPossibleFaresReturn.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    💰 Return Trip Fare Structure
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">From</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">To</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Fare ($)</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allPossibleFaresReturn.map((fare: any, index: number) => (
                          !fare.hidden && (
                            <tr key={index} className={`${fare.master ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'} transition-colors`}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {fare.master && <span className="text-blue-600 font-bold mr-2">★</span>}
                                {fare.from.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {fare.to.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="number"
                                  min={fare.master ? "1" : "0"}
                                  step="0.01"
                                  onWheel={(e) => e.currentTarget.blur()}
                                  className="w-32 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                                  value={fare.fare}
                                  onChange={(e) => setFareReturn(e, index)}
                                  placeholder="0.00"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {!fare.master && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => updateHiddenFares(index, true)}
                                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                  >
                                    <X className="w-4 h-4 mr-1" />
                                    Remove
                                  </Button>
                                )}
                                {fare.master && (
                                  <span className="text-xs text-blue-600 font-semibold">Main Route</span>
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
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  setFrom({});
                  setTo({});
                  setStops([]);
                  setFromInput('');
                  setToInput('');
                  setStopInputValue('');
                  setSelectedTrip({});
                  setAllPossibleFares([]);
                  setAllPossibleFaresReturn([]);
                }}
                className="px-8 py-3 text-lg"
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                loading={loading}
                className="px-8 py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {isEdit ? '✅ Update Trip' : '🚀 Create Trip'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};