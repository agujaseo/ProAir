import { z } from 'zod';

export const deliveryNoteSchema = z.object({
  routeNumber: z.number().min(0, 'La ruta debe ser un número positivo'),
  ddNumber: z.number().min(0, 'El D.D. debe ser un número positivo'),
  commercialId: z.string().min(1, 'Debe seleccionar un comercial'),
  status: z.enum(['pending_installation', 'installed', 'confirmed', 'to_be_fixed', 'to_be_removed', 'removed']),
  clientName: z.string().min(1, 'El nombre es requerido'),
  commercialName: z.string().min(1, 'El nombre comercial es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  postalCode: z.string().min(1, 'El código postal es requerido'),
  city: z.string().min(1, 'La ciudad es requerida'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  email: z.string().email('Email inválido'),
  vatNumber: z.string().min(1, 'El CIF/DNI es requerido'),
  paymentMethod: z.string().min(1, 'La forma de pago es requerida'),
  authorizedBy: z.string().min(1, 'Se requiere autorización'),
  schedule: z.string().min(1, 'El horario es requerido'),
  closedDays: z.string().min(1, 'Los días de cierre son requeridos'),
  services: z.array(z.object({
    serviceId: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0),
    discount: z.number().min(0).max(100).optional(),
  })),
  aromas: z.array(z.object({
    aromaId: z.string(),
    quantity: z.number().min(1),
  })),
  notes: z.string().optional(),
});
