import { useQuery } from '@tanstack/react-query';
import { fetchAromas } from '../../../lib/api';

export function useAromas() {
  return useQuery({
    queryKey: ['aromas'],
    queryFn: fetchAromas,
  });
}
