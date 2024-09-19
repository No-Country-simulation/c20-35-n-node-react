import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../models/User';
import Cookie from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
  updateUser: (updatedUserData: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = Cookie.get('token');
      if (storedToken) {
        try {
          await login(storedToken);
        } catch (error) {
          console.error('Error al inicializar la autenticación:', error);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (token: string) => {
    setToken(token)
    setIsAuthenticated(true)
    Cookie.set('token', token)

    try {
      //Obtener perfil del usuario desde la api apartir del token
      const response = await axios.get('http://localhost:3000/api/v1/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data)
      setUser(response.data)
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error)
      logout()
    }
  }

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setUser(null); // Limpia el estado del usuario
    
    Cookie.remove('token');
    Cookie.remove('avatarImg');
  };

  const updateUser = async (updatedUserData: User) => {
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    try {
      const response = await axios.patch('http://localhost:3000/api/v1/auth/profile', updatedUserData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(response.data as User);
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout, isLoading, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};