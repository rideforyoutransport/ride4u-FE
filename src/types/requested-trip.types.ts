export interface RequestedTrip {
    id: string;
    customerPhone: string;
    fromLocation: string;
    toLocation: string;
    requestedDate: string;
    estimatedCost: number;
    actualDistance?: number;
    estimatedDuration?: number;
    numberOfPassengers: number;
    created: string;
    updated?: string;
    tripId?: string; // If approved and converted to actual trip
}