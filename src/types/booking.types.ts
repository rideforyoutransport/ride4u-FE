export interface Booking {
  id: string;
  from: {
    name: string;
  };
  to: {
    name: string;
  };
  bookingDate: string;
  created: string;
  luggageTypeOpted: string;
  refreshmentsOpted: boolean;
  vehicle: {
    name: string;
  };
  user: {
    name: string;
    mobile: string;
  };
  status: string;
  totalSeatsBooked: number;
  amountPaid: number;
  amountLeft: number;
  paymentID: string;
  tipAmount: number;
  tipPaymentID: string;
  rating: number;
  review: string;
  totalAmount: number;
}
