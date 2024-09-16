import { useEffect, useState } from 'react'
import { Bell, Settings, Dumbbell,Home, Apple, MessageCircle, User, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getAvatarImg } from '../services/GetAvatarImg'
import ClipLoader from 'react-spinners/ClipLoader'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { logout, user } = useAuth()
  const [avatarImg, setAvatarImg] = useState<string | null>(null)
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(true)

  useEffect( () => {
    const fetchAvatar = async () => {
      setIsLoadingAvatar(true);
      if (localStorage.getItem('avatarImg')) {
        setAvatarImg(localStorage.getItem('avatarImg') || '');
        setIsLoadingAvatar(false);
      }
      if (user) {
        const avatarUrl = await getAvatarImg(user);
        setAvatarImg(avatarUrl);
        localStorage.setItem('avatarImg', avatarUrl || '');
        setIsLoadingAvatar(false);
      }
    };
    
    fetchAvatar();
  }, [user]);

  return (
    <div className="flex h-screen bg-primary text-text">
      {/* Barra lateral */}
      <aside className="w-64 bg-card-bg p-6 flex flex-col">
        <motion.img
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src="../src/assets/logo-white.png"
          alt=""
          className='object-cover w-28 mx-auto mb-4'
        />
        <div className="flex flex-col items-center mb-4">
          {
            avatarImg != null && !isLoadingAvatar ? 
            <img src={avatarImg} alt="Usuario" className="w-16 h-16 rounded-full mb-2" /> : 
            <ClipLoader color='white' size={20} />
          }
          <h2 className="text-sm font-semibold">{user?.name}</h2>
          <p className="text-xs text-dead"><b>Peso:</b> {user?.weight} kg</p>
          <p className="text-xs text-dead"><b>Altura:</b> {user?.height} cm</p>
          <p className="text-xs text-dead"><b>Edad:</b> {user?.age} años</p>
        </div>
        <nav className="flex-grow border-t  pt-4 border-bordes/50">
          <ul className="space-y-4 text-base font-light">
            <li><Link to="/dashboard" className="flex items-center space-x-2 text-secondary"><Home size={20} /><span>Dashboard</span></Link></li>
            <li><a href="" className="flex items-center space-x-2"><Apple size={20} /><span>Nutricion</span></a></li>
            <li><a href="#" className="flex items-center space-x-2"><Dumbbell size={20} /><span>Entrenamiento</span></a></li>
            <li><a href="#" className="flex items-center space-x-2"><MessageCircle size={20} /><span>Chat de nutricion</span></a></li>
            <li><a href="#" className="flex items-center space-x-2"><MessageCircle size={20} /><span>Chat de entrenamiento</span></a></li>
            <li><a href="#" className="flex items-center space-x-2"><User size={20} /><span>Mi perfil</span></a></li>
          </ul>
        </nav>
        <ul>
          <li><a href="/login" onClick={logout} className="flex items-center space-x-2"><LogOut size={20} /><span>Cerrar sesion</span></a></li>
        </ul>

      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-secondary/10 to-primary">
        <header className="flex justify-end items-center mb-4">
          <div className="flex items-center space-x-4">
            <Bell size={25} />

            <Settings size={25} />
          </div>
        </header>

        <div className="grid grid-cols-4 gap-4 mb-6 h-max">
          <div>
            <h3 className="text-lg mb-4">Calorias</h3>
            <div className="bg-card-bg/80 backdrop-blur-sm p-4 rounded-xl min-h-40">
        
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4">Carbohidratos</h3>
            <div className="bg-card-bg p-4 rounded-xl min-h-40">

            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4">Proteinas</h3>
            <div className="bg-card-bg p-4 rounded-xl min-h-40">

            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4">Grasas</h3>
              <div className="bg-card-bg p-4 rounded-xl min-h-40">

            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-lg mb-4">Comidas</h3>
            <div className="bg-card-bg p-4 rounded-xl min-h-80">
              {/* Contenido para Tus Objetivos */}
            </div>

          </div>

          <div>
            <h3 className="text-lg mb-4">Actividad física</h3>
            <div className="bg-card-bg p-4 rounded-xl min-h-80">
              <div className="flex justify-between items-center mb-4">
                <select className="bg-card-muted text-text rounded-md px-2 py-1">
                  <option>Semanal</option>
                  <option>Mensual</option>
                  <option>Anual</option>
                </select>
              </div>
              <div className="h-48 bg-card-muted rounded-xl"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}