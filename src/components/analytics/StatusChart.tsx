import { Bar } from 'react-chartjs-2';
import type { DeliveryNote } from '@prisma/client';

interface StatusChartProps {
  deliveryNotes: DeliveryNote[];
  period: 'week' | 'month' | 'year';
}

export function StatusChart({ deliveryNotes, period }: StatusChartProps) {
  const statusCounts = deliveryNotes.reduce((acc, note) => {
    acc[note.status] = (acc[note.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Albaranes por Estado',
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(16, 185, 129, 0.5)', // emerald
          'rgba(59, 130, 246, 0.5)', // blue
          'rgba(245, 158, 11, 0.5)', // amber
          'rgba(239, 68, 68, 0.5)',  // red
          'rgba(107, 114, 128, 0.5)', // gray
        ],
      },
    ],
  };

  return (
    <div className="h-[300px]">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `Albaranes por Estado - Último ${period}`,
            },
          },
        }}
      />
    </div>
  );
}
