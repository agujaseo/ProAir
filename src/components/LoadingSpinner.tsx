import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
      <span className="ml-2 text-lg font-medium text-gray-900">Cargando...</span>
    </div>
  );
}
