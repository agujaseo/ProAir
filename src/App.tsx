import { Suspense } from 'react';
import { AppRoutes } from './routes';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
