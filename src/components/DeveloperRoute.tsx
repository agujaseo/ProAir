import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ReactNode } from 'react';

interface DeveloperRouteProps {
  children: ReactNode;
}

export function DeveloperRoute({ children }: DeveloperRouteProps) {
  const { user } = useAuthStore();
  if (!user || user.role !== 'developer') return <Navigate to="/" />;
  return <>{children}</>;
}
