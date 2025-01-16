import type { User, Service, Aroma, DeliveryNote } from '../types';

// Mock data for development
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'developer'
  }
];

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Basic Installation',
    description: 'Standard aroma device installation',
    price: 99.99
  }
];

const mockAromas: Aroma[] = [
  {
    id: '1',
    name: 'Vanilla',
    description: 'Sweet vanilla fragrance',
    stock: 100
  }
];

const mockDeliveryNotes: DeliveryNote[] = [];

export async function fetchUsers(): Promise<User[]> {
  return mockUsers;
}

export async function fetchServices(): Promise<Service[]> {
  return mockServices;
}

export async function fetchAromas(): Promise<Aroma[]> {
  return mockAromas;
}

export async function fetchDeliveryNotes(): Promise<DeliveryNote[]> {
  return mockDeliveryNotes;
}
