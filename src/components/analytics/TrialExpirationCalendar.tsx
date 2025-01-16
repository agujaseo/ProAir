import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import type { DeliveryNote, Client } from '@prisma/client';

interface TrialExpirationCalendarProps {
  deliveryNotes: (DeliveryNote & { client: Client })[];
}

export function TrialExpirationCalendar({ deliveryNotes }: TrialExpirationCalendarProps) {
  const trialNotes = deliveryNotes
    .filter(note => note.status === 'installed')
    .map(note => ({
      ...note,
      expirationDate: addDays(new Date(note.date), 7),
    }))
    .sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime());

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Calendario de Pruebas</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {trialNotes.map((note) => (
          <li key={note.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{note.client.commercialName}</p>
                <p className="text-sm text-gray-500">{note.client.address}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  Expira: {format(note.expirationDate, "d 'de' MMMM", { locale: es })}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(note.date), "d 'de' MMMM", { locale: es })}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
