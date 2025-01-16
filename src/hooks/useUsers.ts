import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../lib/api';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
