
export interface Order {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  packageName: string;
  packageCode: string;
  packageSize: string;
  pickupAddress: string;
  deliveryAddress: string;
  distance: number;
  price: number;
  isUrgent: boolean;
  deliveryTime?: string;
  notes?: string;
  status: 'new' | 'accepted' | 'in_transit' | 'delivered';
   orderId: string;
  createdAt: Date;
}

