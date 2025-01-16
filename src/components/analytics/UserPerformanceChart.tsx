import { Line } from 'react-chartjs-2';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import type { DeliveryNote, User } from '@prisma/client';

interface UserPerformanceChartProps {
  deliveryNotes: DeliveryNote[];
  users: User[];
  days: number;
}

export function UserPerformanceChart({ deliveryNotes, users, days }: UserPerformanceChartProps) {
  const dateRange = eachDayOfInterval({
    start: subDays(new Date(), days - 1),
    end: new Date(),
  });

  const datasets = users.map(user => {
    const userNotes = deliveryNotes.filter(note => note.commercialId === user.id);
    const data = dateRange.map(date => {
      return userNotes.filter(note => 
        format(new Date(note.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      ).length;
    });

    return {
      label: user.name,
      data,
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      tension: 0.1,
    };
  });

  const data = {
    labels: dateRange.map(date => format(date, 'dd/MM')),
    datasets,
  };

  return (
    <div className="h-[300px]">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Rendimiento por Usuario',
            },
          },
        }}
      />
    </div>
  );
}
