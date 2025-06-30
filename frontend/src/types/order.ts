
export interface Customer {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface Package {
  name: string;
  code?: string;
  size: string;
}

export interface Address {
  pickup: string;
  delivery: string;
}

export interface Order {
  id: string;
  customer: Customer;
  package: Package;
  addresses: Address;
  distance: number;
  price: number;
  isUrgent: boolean;
  deliveryTime?: string;
  notes?: string;
  status: 'new' | 'accepted' | 'in_transit' | 'delivered';
  createdAt: Date;
}
