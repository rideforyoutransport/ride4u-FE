export interface Vendor {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  created: string;
}

export interface CreateVendorData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
}

export interface UpdateVendorData {
  name: string;
  email: string;
  phoneNumber: string;
}
