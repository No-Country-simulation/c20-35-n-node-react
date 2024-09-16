import { useAuth } from '../context/AuthContext'
import SideBar from '../components/layout/SideBar'
import { useLocation } from 'react-router-dom'
import DashboardRoutes from '../routes/DashboardRoutes'

export default function Dashboard() {
  const { logout, user } = useAuth()
  const location = useLocation()

  return (
    <div className="flex h-screen bg-primary text-text">
      {/* Barra lateral */}
      <SideBar user={user} logout={logout} location={location.pathname} />

      <DashboardRoutes />
    </div>
  )
}
