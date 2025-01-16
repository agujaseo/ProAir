import { useQuery } from '@tanstack/react-query';
import { fetchDeliveryNotes } from '../lib/api';

export function useDeliveryNotes() {
  return useQuery({
    queryKey: ['deliveryNotes'],
    queryFn: fetchDeliveryNotes,
  });
