import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Gender, Goal, ActivityLevel } from '../models/User';
import { CalorieRequirement, calculateCalorieRequirement } from '../models/CaloriesRequirement';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  calorieRequirement: CalorieRequirement | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const exampleUser: User = {
  id: 1,
  name: 'Usuario de Ejemplo',
  email: 'ejemplo@email.com',
  height: 170,
  weight: 70,
  age: 30,
  gender: Gender.Male,
  goal: Goal.MaintainWeight,
  activity_level: ActivityLevel.ModeratelyActive,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>('example-token');
  const [user, setUser] = useState<User | null>(exampleUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [calorieRequirement, setCalorieRequirement] = useState<CalorieRequirement | null>(null);

  useEffect(() => {
    if (user) {
      const requirement = calculateCalorieRequirement(user);
      setCalorieRequirement(requirement);
    }
  }, [user]);

  const login = async (token: string) => {
    setIsAuthenticated(true);
    setToken(token);
    // Aquí iría la lógica para obtener los datos del usuario del backend
    setUser(exampleUser);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    setCalorieRequirement(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, calorieRequirement, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};