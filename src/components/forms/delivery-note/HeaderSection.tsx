import type { User } from '@prisma/client';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { DeliveryNoteFormData } from './types';

interface HeaderSectionProps {
  register: UseFormRegister<DeliveryNoteFormData>;
  errors: FieldErrors<DeliveryNoteFormData>;
  commercials: User[];
}

export function HeaderSection({ register, errors, commercials }: HeaderSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Ruta</label>
        <input
          type="number"
          {...register('routeNumber', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
        {errors.routeNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.routeNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">D.D.</label>
        <input
          type="number"
          {...register('ddNumber', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
        {errors.ddNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.ddNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comercial</label>
        <select
          {...register('commercialId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        >
          <option value="">Seleccionar comercial</option>
          {commercials.map((commercial) => (
            <option key={commercial.id} value={commercial.id}>
              {commercial.name}
            </option>
          ))}
        </select>
        {errors.commercialId && (
          <p className="mt-1 text-sm text-red-600">{errors.commercialId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estado</label>
        <select
          {...register('status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        >
          <option value="pending_installation">Montar</option>
          <option value="installed">Montado</option>
          <option value="confirmed">Confirmado</option>
          <option value="to_be_fixed">Fijar</option>
          <option value="to_be_removed">Retirar</option>
          <option value="removed">Retirado</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>
    </div>
  );
}
