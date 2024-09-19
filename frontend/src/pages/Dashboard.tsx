import { useAuth } from '../context/AuthContext'
import SideBar from '../components/layout/SideBar'
import { useLocation } from 'react-router-dom'
import DashboardRoutes from '../routes/DashboardRoutes'
import { useEffect, useState } from 'react'
import { User } from '../models/User'
import ClipLoader from 'react-spinners/ClipLoader'

export default function Dashboard() {
  const { logout, user, getUserData, isLoading } = useAuth()
  const [userData, setUserData] = useState<User | null>(user)
  const location = useLocation()

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        await getUserData();
      } else {
        setUserData(user);
      }
    };

    fetchUserData();
  }, [user]);

  if (isLoading || !userData) {
    return <div className='flex items-center justify-center h-screen w-screen'><ClipLoader color='white' size={40} /></div>
  }

  return (
    <div className="flex h-screen bg-primary text-text overflow-y-hidden">
      {/* Barra lateral */}
      <SideBar user={userData} logout={logout} location={location.pathname} />

      <DashboardRoutes />
    </div>
  )
}
