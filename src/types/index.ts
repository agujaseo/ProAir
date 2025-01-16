export type Role = 'developer' | 'admin' | 'commercial' | 'technician';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Client {
  id: string;
  name: string;
  commercialName: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  status: 'trial' | 'active' | 'inactive';
  taxInfo: {
    vatNumber: string; // CIF/DNI
    paymentMethod: string;
  };
  authorizedBy: string;
  schedule: {
    openingHours: string;
    closingHours: string;
    observations?: string;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Aroma {
  id: string;
  name: string;
  description: string;
  stock: number;
}

export type DeliveryNoteStatus = 
  | 'pending_installation' // Montar
  | 'installed' // Montado
  | 'confirmed' // Confirmado
  | 'to_be_fixed' // Fijar
  | 'to_be_removed' // Retirar
  | 'removed'; // Retirado

export interface DeliveryNote {
  id: string;
  date: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  clientId: string;
  technicianId: string;
  commercialId: string;
  routeNumber: number;
  ddNumber: number;
  status: DeliveryNoteStatus;
  services: {
    serviceId: string;
    quantity: number;
    price: number;
    discount?: number;
  }[];
  aromas: {
    aromaId: string;
    quantity: number;
  }[];
  notes?: string;
  statusHistory: {
    status: DeliveryNoteStatus;
    date: string;
    userId: string;
    location?: {
      latitude: number;
      longitude: number;
    };
  }[];
}
