import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path='/' element={<PublicRoutes />}>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>

        {/* RUTAS PRIVADAS */}
        <Route path='/dashboard/*' element={<PrivateRoutes />}>
          <Route path='*' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
