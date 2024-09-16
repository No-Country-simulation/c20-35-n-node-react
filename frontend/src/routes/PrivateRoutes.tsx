// src/routes/PrivateRoutes.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoutes() {
  const { isAuthenticated } = useAuth(); // Aquí validas si el usuario está autenticado
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;