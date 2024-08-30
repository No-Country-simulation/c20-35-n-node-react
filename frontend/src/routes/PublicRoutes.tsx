// src/routes/PublicRoutes.tsx
import { Outlet, Navigate } from 'react-router-dom';

function PublicRoutes() {
  //Validacion para saber si el usuario está autenticado
  const isAuthenticated = false; 
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default PublicRoutes;