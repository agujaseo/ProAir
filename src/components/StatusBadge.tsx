import React from 'react';
import type { DeliveryNoteStatus } from '../types';

const statusConfig: Record<DeliveryNoteStatus, { label: string; className: string }> = {
  pending_installation: { 
    label: 'Montar',
    className: 'bg-yellow-100 text-yellow-800'
  },
  installed: {
    label: 'Montado',
    className: 'bg-green-100 text-green-800'
  },
  confirmed: {
    label: 'Confirmado',
    className: 'bg-blue-100 text-blue-800'
  },
  to_be_fixed: {
    label: 'Fijar',
    className: 'bg-purple-100 text-purple-800'
  },
  to_be_removed: {
    label: 'Retirar',
    className: 'bg-red-100 text-red-800'
  },
  removed: {
    label: 'Retirado',
    className: 'bg-gray-100 text-gray-800'
  }
};

interface StatusBadgeProps {
  status: DeliveryNoteStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
