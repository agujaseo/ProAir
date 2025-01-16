import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import type { User } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

interface AnalyticsProps {
  users: User[];
}

export function Analytics({ users }: AnalyticsProps) {
  // Example data - in a real app, this would come from your backend
  const trialData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Pruebas Realizadas',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };

  const conversionData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Tasa de Conversión (%)',
        data: [65, 70, 80, 75, 85, 90],
        borderColor: 'rgb(16, 185, 129)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Pruebas por Mes</h3>
        <div className="h-64">
          <Bar
            data={trialData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Tasa de Conversión</h3>
        <div className="h-64">
          <Line
            data={conversionData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Resumen de Actividad</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Pruebas
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">44</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Tasa de Conversión
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">77.5%</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Clientes Activos
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">34</dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
