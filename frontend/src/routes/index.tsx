import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/Register';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import Dashboard from '../pages/Dashboard';
import Nutrition from '../pages/Nutrition';
import Workouts from '../pages/Workouts';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import ProfilePage from '../pages/profile/ProfilePage';
import Welcome from '../pages/Welcome';

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
          <Route path='*' element={<Dashboard />} />{' '}
          {/* Ruta predeterminada dentro de /dashboard */}
          <Route path='welcome' element={<Welcome />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
