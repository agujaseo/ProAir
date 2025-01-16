import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { DeliveryNoteFormData } from './types';

interface ClientSectionProps {
  register: UseFormRegister<DeliveryNoteFormData>;
  errors: FieldErrors<DeliveryNoteFormData>;
}

export function ClientSection({ register, errors }: ClientSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Información del Cliente</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            {...register('clientName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.clientName && (
            <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre Comercial</label>
          <input
            type="text"
            {...register('commercialName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.commercialName && (
            <p className="mt-1 text-sm text-red-600">{errors.commercialName.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            {...register('address')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Código Postal</label>
          <input
            type="text"
            {...register('postalCode')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ciudad</label>
          <input
            type="text"
            {...register('city')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="text"
            {...register('phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">CIF/DNI</label>
          <input
            type="text"
            {...register('vatNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.vatNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.vatNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Forma de Pago</label>
          <input
            type="text"
            {...register('paymentMethod')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.paymentMethod && (
            <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Autorizado por</label>
          <input
            type="text"
            {...register('authorizedBy')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.authorizedBy && (
            <p className="mt-1 text-sm text-red-600">{errors.authorizedBy.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Horario</label>
          <input
            type="text"
            {...register('schedule')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.schedule && (
            <p className="mt-1 text-sm text-red-600">{errors.schedule.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Días de Cierre</label>
          <input
            type="text"
            {...register('closedDays')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.closedDays && (
            <p className="mt-1 text-sm text-red-600">{errors.closedDays.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
