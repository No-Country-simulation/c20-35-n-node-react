import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
// import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import Dashboard from '../pages/Dashboard';
import Nutrition from '../pages/Nutrition';
import Workouts from '../pages/Workouts';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import ProfilePage from '../pages/profile/ProfilePage';
import Login from '../pages/Login';
import PublicRoutes from './PublicRoutes';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path='/' element={<PublicRoutes />}>
          <Route path='register' element={<Register />} />
          <Route path='/login' element={<Login />}></Route>
        </Route>

        {/* RUTAS PRIVADAS */}
        <Route path='/dashboard/*' element={<PrivateRoutes />}>
          <Route index element={<Dashboard />} />{' '}
          {/* Ruta predeterminada dentro de /dashboard */}
          <Route path='nutrition' element={<Nutrition />} />
          <Route path='workouts' element={<Workouts />} />
          <Route path='chat' element={<Chat />} />
          <Route path='profile' element={<Profile />} />
          <Route path='user-profile' element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
