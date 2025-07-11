export interface Driver {
  id: string;
  email: string;
  name: string;
  number: string;
  rating: number;
  totalTrips: number;
  created: string;
  vendor?: Array<{ id: string; name: string }>;
}

export interface CreateDriverData {
  name: string;
  email: string;
  number: string;
  password: string;
  passwordConfirm: string;
  vendorId?: string;
}

export interface UpdateDriverData {
  name: string;
  email: string;
  number: string;
  vendorId?: string;
}
