import { useAuth } from '../context/AuthContext'
import SideBar from '../components/layout/SideBar'
import { useLocation } from 'react-router-dom'
import DashboardRoutes from '../routes/DashboardRoutes'
import { useEffect, useState } from 'react'
import { User } from '../models/User'
import ClipLoader from 'react-spinners/ClipLoader'

export default function Dashboard() {
  const { logout, user, isLoading } = useAuth()
  const location = useLocation()

  useEffect(() => {

    console.log("USER: ", user);
  }, [user]);

  if (isLoading) {
    return <div className='flex items-center justify-center h-screen w-screen'><ClipLoader color='white' size={40} /></div>
  }

  return (
    <div className="flex h-screen bg-primary text-text overflow-y-hidden">
      {/* Barra lateral */}
      <SideBar user={user} logout={logout} location={location.pathname} />

      <DashboardRoutes />
    </div>
  )
}
