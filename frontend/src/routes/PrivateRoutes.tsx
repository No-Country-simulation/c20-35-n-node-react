// src/routes/PrivateRoutes.tsx
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes() {
  const isAuthenticated = true; // Aquí validas si el usuario está autenticado
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;