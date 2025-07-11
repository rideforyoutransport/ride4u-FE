import { Location } from "./trip.types";
import { User } from "./user.types";
  
  export interface RequestedTrip {
    id: string;
    requestingUser: User;
    requestDate: string;
    origin: Location;
    destination: Location;
    totalSeats: number;
    mobile: string;
    created: string;
  }
  