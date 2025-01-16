import { z } from 'zod';
import { deliveryNoteSchema } from './schemas';

export type DeliveryNoteFormData = z.infer<typeof deliveryNoteSchema>;
