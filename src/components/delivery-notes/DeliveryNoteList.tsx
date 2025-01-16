import { StatusBadge } from '../StatusBadge';
import { ClipboardList } from 'lucide-react';
import type { DeliveryNote, Client } from '@prisma/client';

interface DeliveryNoteListProps {
  deliveryNotes: (DeliveryNote & { client: Client })[];
  isLoading: boolean;
}

export function DeliveryNoteList({ deliveryNotes, isLoading }: DeliveryNoteListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <ClipboardList className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Cargando...</h3>
      </div>
    );
  }

  if (deliveryNotes.length === 0) {
    return (
      <div className="text-center py-12">
        <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No hay albaranes</h3>
        <p className="mt-1 text-sm text-gray-500">
          Comienza creando un nuevo albarán.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Fecha
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Cliente
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Ruta
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  D.D.
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deliveryNotes.map((note) => (
                <tr key={note.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    {new Date(note.date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {note.client.commercialName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {note.routeNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {note.ddNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <StatusBadge status={note.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
