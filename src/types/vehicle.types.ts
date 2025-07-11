export interface Vehicle {
  id: string;
  name: string;
  number: string;
  totalSeats: number;
  totalTrips: number;
  created: string;
  vendor?: Array<{ id: string; name: string }>;
}

export interface CreateVehicleData {
  name: string;
  number: string;
  totalSeats: number;
  vendor?: string;
}
