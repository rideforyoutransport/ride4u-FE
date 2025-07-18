export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003/api/admin';
export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  TRIPS: '/trips',
  ADD_TRIP: '/trips/add',
  EDIT_TRIP: '/trips/edit',
  VIEW_TRIP: '/trips/view',
  BOOKINGS: '/bookings',
  DRIVERS: '/drivers',
  ADD_DRIVER: '/drivers/add',
  EDIT_DRIVER: '/drivers/edit',
  VIEW_DRIVER: '/drivers/view',
  VEHICLES: '/vehicles',
  ADD_VEHICLE: '/vehicles/add',
  EDIT_VEHICLE: '/vehicles/edit',
  VIEW_VEHICLE: '/vehicles/view',
  USERS: '/users',
  ADD_USER: '/users/add',
  EDIT_USER: '/users/edit',
  VENDORS: '/vendors',
  ADD_VENDOR: '/vendors/add',
  EDIT_VENDOR: '/vendors/edit',
  REQUESTED_TRIPS: '/requested-trips',
  CHANGE_PASSWORD: '/settings/change-password',
  PRIVACY_POLICY: '/privacy-policy',
} as const;

export const LUGGAGE_TYPES = [
  { value: 's', label: 'Small' },
  { value: 'm', label: 'Medium' },
  { value: 'l', label: 'Large' },
] as const;

export const GOOGLE_MAPS_RESTRICTIONS = {
  types: ['geocode'],
  componentRestrictions: { country: 'ca' },
} as const;

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy HH:mm',
  API: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  DISPLAY_WITH_DAY: "EEE, MMM dd, yyyy hh:mm a"
} as const;
