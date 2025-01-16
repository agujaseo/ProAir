import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deliveryNoteSchema } from '../schemas';
import type { DeliveryNoteFormData } from '../types';
import type { Service, Aroma, User } from '../../../types';

interface DeliveryNoteFormProps {
  onSubmit: (data: DeliveryNoteFormData) => void;
  services: Service[];
  aromas: Aroma[];
  commercials: User[];
}

export function DeliveryNoteForm({ onSubmit, services = [], aromas = [], commercials = [] }: DeliveryNoteFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<DeliveryNoteFormData>({
    resolver: zodResolver(deliveryNoteSchema),
    defaultValues: {
      services: [],
      aromas: [],
      status: 'pending_installation',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form implementation */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Crear Albarán
        </button>
      </div>
    </form>
  );
}
