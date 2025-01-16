import { useState } from 'react';
import { DeliveryNoteMap } from './DeliveryNoteMap';
import { StatusChart } from './StatusChart';
import { UserPerformanceChart } from './UserPerformanceChart';
import { TrialExpirationCalendar } from './TrialExpirationCalendar';
import type { DeliveryNote, User, Client } from '@prisma/client';

interface AnalyticsDashboardProps {
  deliveryNotes: (DeliveryNote & { client: Client })[];
  users: User[];
}

export function AnalyticsDashboard({ deliveryNotes, users }: AnalyticsDashboardProps) {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Distribución Geográfica</h3>
          <DeliveryNoteMap deliveryNotes={deliveryNotes} />
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Estado de Albaranes</h3>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as 'week' | 'month' | 'year')}
              className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mes</option>
              <option value="year">Último Año</option>
            </select>
          </div>
          <StatusChart deliveryNotes={deliveryNotes} period={period} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Rendimiento de Usuarios</h3>
          <UserPerformanceChart 
            deliveryNotes={deliveryNotes}
            users={users}
            days={period === 'week' ? 7 : period === 'month' ? 30 : 365}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Pruebas por Expirar</h3>
          <TrialExpirationCalendar deliveryNotes={deliveryNotes} />
        </div>
      </div>
    </div>
  );
}
