import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deliveryNoteSchema } from './schema';
import { ClientSection } from './ClientSection';
import { ServicesSection } from './ServicesSection';
import { AromasSection } from './AromasSection';
import { HeaderSection } from './HeaderSection';
import type { DeliveryNoteFormData } from './types';
import type { Service, Aroma, User } from '@prisma/client';

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
      <HeaderSection 
        register={register} 
        errors={errors}
        commercials={commercials}
      />

      <ClientSection 
        register={register} 
        errors={errors}
      />

      <ServicesSection
        services={services}
        register={register}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />

      <AromasSection
        aromas={aromas}
        register={register}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Notas</label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
        )}
      </div>

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
