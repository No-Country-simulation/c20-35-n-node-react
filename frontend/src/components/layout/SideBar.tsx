import { motion } from 'framer-motion';
import { Home, Apple, Dumbbell, MessageCircle, User as UserIcon, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { User } from '../../models/User';
import { useState, useEffect } from 'react';
import { getAvatarImg } from '../../services/GetAvatarImg';

interface SideBarProps {
  location: string;
  user: User | null;
  logout: () => void;
}

function SideBar({ user, logout, location }: SideBarProps) {
  const [avatarImg, setAvatarImg] = useState<string>('../../assets/icons/default-avatar.png');
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchAvatar = async () => {
      if (user?.email) {
        try {
          setIsLoadingAvatar(true);
          const url = await getAvatarImg(user);
          if (isMounted) {
            setAvatarImg(url);
            console.log("Avatar: ", url);
          }
        } catch (error) {
          console.error("Error al cargar el avatar:", error);
        } finally {
          if (isMounted) {
            setIsLoadingAvatar(false);
          }
        }
      } else {
        setIsLoadingAvatar(false);
      }
    };

    fetchAvatar();
    return () => { isMounted = false; };
  }, [user]);

  return (


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

      <nav className="flex-grow border-t pt-4 border-bordes/50">
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-base font-light"
        >
          {[
            { to: '/dashboard', label: 'Dashboard', icon: Home },
            { to: '/dashboard/nutricion', label: 'Nutrición', icon: Apple },
            { to: '/dashboard/entrenamiento', label: 'Entrenamiento', icon: Dumbbell },
            { to: '/dashboard/chat-nutricion', label: 'Chat de Nutrición', icon: MessageCircle },
            { to: '/dashboard/chat-entrenamiento', label: 'Chat de Entrenamiento', icon: MessageCircle },
            { to: '/dashboard/perfil', label: 'Mi perfil', icon: UserIcon }
          ].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.to}
                className={`flex items-center space-x-2 hover:text-secondary transition-all duration-200 ${location === item.to ? 'text-secondary' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      <ul>
        <motion.li
          whileHover={{ scale: 1.05, x: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          <a onClick={logout} className="flex cursor-pointer items-center space-x-2">
            <LogOut size={20} />
            <span>Cerrar sesión</span>
          </a>
        </motion.li>
      </ul>
    </aside>
  );
}

export default SideBar;
