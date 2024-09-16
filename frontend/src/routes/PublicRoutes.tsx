// src/routes/PublicRoutes.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PublicRoutes() {
  //Validacion para saber si el usuario está autenticado
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" /> : < Outlet />;
}

export default PublicRoutes;