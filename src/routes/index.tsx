import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { DeveloperRoute } from '../components/DeveloperRoute';

const Login = lazy(() => import('../pages/Login'));
const DeliveryNotes = lazy(() => import('../pages/DeliveryNotes'));
const Clients = lazy(() => import('../pages/Clients'));
const Settings = lazy(() => import('../pages/Settings'));

export function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={<Login />} 
      />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/delivery-notes" replace />} />
        <Route 
          path="delivery-notes" 
          element={<DeliveryNotes />}
        />
        <Route 
          path="clients" 
          element={<Clients />}
        />
        <Route 
          path="settings" 
          element={
            <DeveloperRoute>
              <Settings />
            </DeveloperRoute>
          }
        />
      </Route>
    </Routes>
  );
}
