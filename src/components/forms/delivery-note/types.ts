import { z } from 'zod';
import { deliveryNoteSchema } from './schema';

export type DeliveryNoteFormData = z.infer<typeof deliveryNoteSchema>;
