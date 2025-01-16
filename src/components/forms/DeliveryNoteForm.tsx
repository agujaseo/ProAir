import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { User, Service, Aroma } from '@prisma/client';

const deliveryNoteSchema = z.object({
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

type DeliveryNoteFormData = z.infer<typeof deliveryNoteSchema>;

interface DeliveryNoteFormProps {
  onSubmit: (data: DeliveryNoteFormData) => void;
  services: Service[];
  aromas: Aroma[];
  commercials: User[];
}

export function DeliveryNoteForm({ onSubmit, services, aromas, commercials }: DeliveryNoteFormProps) {
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

        {/* Client Information */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Cliente</h3>
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

        {/* Services and Aromas */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Servicios y Aromas</h3>
          
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const currentServices = watch('services');
                    if (e.target.checked) {
                      setValue('services', [...currentServices, {
                        serviceId: service.id,
                        quantity: 1,
                        price: service.price,
                        discount: 0,
                      }]);
                    } else {
                      setValue('services', currentServices.filter(s => s.serviceId !== service.id));
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-500">{service.price}€</p>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Cantidad"
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    onChange={(e) => {
                      const currentServices = watch('services');
                      const serviceIndex = currentServices.findIndex(s => s.serviceId === service.id);
                      if (serviceIndex !== -1) {
                        const updatedServices = [...currentServices];
                        updatedServices[serviceIndex].quantity = parseInt(e.target.value);
                        setValue('services', updatedServices);
                      }
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Descuento %"
                    className="w-24 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    onChange={(e) => {
                      const currentServices = watch('services');
                      const serviceIndex = currentServices.findIndex(s => s.serviceId === service.id);
                      if (serviceIndex !== -1) {
                        const updatedServices = [...currentServices];
                        updatedServices[serviceIndex].discount = parseInt(e.target.value);
                        setValue('services', updatedServices);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {aromas.map((aroma) => (
              <div key={aroma.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const currentAromas = watch('aromas');
                    if (e.target.checked) {
                      setValue('aromas', [...currentAromas, {
                        aromaId: aroma.id,
                        quantity: 1,
                      }]);
                    } else {
                      setValue('aromas', currentAromas.filter(a => a.aromaId !== aroma.id));
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <p className="font-medium">{aroma.name}</p>
                  <p className="text-sm text-gray-500">Stock: {aroma.stock}</p>
                </div>
                <input
                  type="number"
                  placeholder="Cantidad"
                  className="w-20 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  onChange={(e) => {
                    const currentAromas = watch('aromas');
                    const aromaIndex = currentAromas.findIndex(a => a.aromaId === aroma.id);
                    if (aromaIndex !== -1) {
                      const updatedAromas = [...currentAromas];
                      updatedAromas[aromaIndex].quantity = parseInt(e.target.value);
                      setValue('aromas', updatedAromas);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Notas</label>
          <textarea
            {...register('notes')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
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
