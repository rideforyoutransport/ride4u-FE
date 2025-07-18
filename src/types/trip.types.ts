export interface Location {
  lat: number;
  lng: number;
  place_id: string;
  place_name: string;
  name: string;
  id?: string;
  geoLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Fare {
  from: {
    name: string;
    place_id: string;
  };
  to: {
    name: string;
    place_id: string;
  };
  fare: string;
  hidden: boolean;
  master: boolean;
}

export interface Trip {
  id: string;
  tripDescription: string;
  tripDate: string;
  bookingMinimumAmount: number;
  from: Location;
  to: Location;
  stops: Location[];
  vehicle: {
    id: string;
    name: string;
    totalSeats: number;
  };
  driver: {
    id: string;
    name: string;
    number: string;
    rating: number;
  };
  luggage: string[];
  refreshments: boolean;
  returnTrip?: ReturnTrip;
  isReturnTrip: boolean;
  totalSeats: number;
  totalTripAmount: number;
  created: string;
  fares: {
    fares: Fare[];
  };
}

export interface ReturnTrip {
  id: string;
  isReturnTrip: boolean;
  tripDate: string;
  from: Location;
  to: Location;
  stops: Location[];
  fares: {
    fares: Fare[];
  };
}

export interface CreateTripData {
  vendor?: string;
  from: Location;
  to: Location;
  duration: number;
  tripDate: string;
  vehicle: string;
  driver: string;
  luggage: string[];
  stops: Location[];
  tripDescription: string;
  totalTripAmount: number;
  refreshments: boolean;
  bookingAmount: number;
  returnTrip?: CreateReturnTripData;
  fares: Fare[];
}

export interface CreateReturnTripData {
  isReturnTrip: boolean;
  vendor: string;
  from: Location;
  to: Location;
  duration: number;
  tripDate: string;
  vehicle: string;
  driver: string;
  luggage: string[];
  stops: Location[];
  tripDescription: string;
  totalTripAmount: number;
  refreshments: boolean;
  bookingAmount: number;
  fares: Fare[];
}
