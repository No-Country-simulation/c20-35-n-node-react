import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ActivityLevel, Gender, Goal, User } from '../models/User';
import Cookie from 'js-cookie';
import { CalorieRequirement } from '../models/CaloriesRequirement';
import { FoodItem } from '../models/FoodItem';
import { Activity } from '../models/Activity';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  calorieRequirement: CalorieRequirement | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (updatedUserData: User) => Promise<User>;
  getUserData: () => Promise<void>;
  meals: FoodItem[];
  activities: Activity[];
  addOrUpdateMeal: (meal: FoodItem) => void;
  removeMeal: (mealId: number) => void;
  addOrUpdateActivity: (activity: Activity) => void;
  removeActivity: (activityId: number) => void;
  getInitialCaloriesConsumed: () => { calories: number; protein: number; carbohydrates: number; fat: number };
  getInitialCaloriesBurned: () => number;
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
  activityLevel: ActivityLevel.ModeratelyActive,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>('example-token');
  const [user, setUser] = useState<User | null>(exampleUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [calorieRequirement, setCalorieRequirement] = useState<CalorieRequirement | null>(null);
  const [meals, setMeals] = useState<FoodItem[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

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

    const storedMeals = Cookie.get('meals');
    const storedActivities = Cookie.get('activities');
    if (storedMeals) setMeals(JSON.parse(storedMeals));
    if (storedActivities) setActivities(JSON.parse(storedActivities));

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
    setIsAuthenticated(false);
    setUser(null); // Limpia el estado del usuario
    
    Cookie.remove('token');
    Cookie.remove('avatarImg');

    console.log('Cerrando sesión', isAuthenticated, user)
  };

  const getUserData = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setUser(response.data)
  }

  const updateUser = async (updatedUserData: Partial<User>): Promise<User> => {
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    try {
      console.log('Datos enviados a la API:', updatedUserData);
      await axios.patch('http://localhost:3000/api/v1/auth/profile', updatedUserData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Después de actualizar, obtenemos los datos actualizados del usuario
      const response = await axios.get('http://localhost:3000/api/v1/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Respuesta completa de la API:', response);
      
      if (response.data) {
        const updatedUser = response.data as User;
        setUser(updatedUser);
        return updatedUser;
      } else {
        console.error('Respuesta inesperada de la API:', response.data);
        throw new Error('No se recibió una respuesta válida del servidor');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error);
      throw error;
    }
  };

  const addOrUpdateMeal = (meal: FoodItem) => {
    const updatedMeals = meals.some(m => m.id === meal.id)
      ? meals.map(m => m.id === meal.id ? meal : m)
      : [...meals, meal];
    setMeals(updatedMeals);
    Cookie.set('meals', JSON.stringify(updatedMeals));
  };

  const removeMeal = (mealId: number) => {
    const updatedMeals = meals.filter(m => m.id !== mealId);
    setMeals(updatedMeals);
    Cookie.set('meals', JSON.stringify(updatedMeals));
  };

  const addOrUpdateActivity = (activity: Activity) => {
    const updatedActivities = activities.some(a => a.id === activity.id)
      ? activities.map(a => a.id === activity.id ? activity : a)
      : [...activities, activity];
    setActivities(updatedActivities);
    Cookie.set('activities', JSON.stringify(updatedActivities));
  };

  const removeActivity = (activityId: number) => {
    const updatedActivities = activities.filter(a => a.id !== activityId);
    setActivities(updatedActivities);
    Cookie.set('activities', JSON.stringify(updatedActivities));
  };


  const getInitialCaloriesConsumed = () => {
    return meals.reduce((acc, meal) => ({
      calories: acc.calories + meal.macros.calories,
      protein: acc.protein + meal.macros.protein,
      carbohydrates: acc.carbohydrates + meal.macros.carbohydrates,
      fat: acc.fat + meal.macros.fat
    }), { calories: 0, protein: 0, carbohydrates: 0, fat: 0 });
  };

  const getInitialCaloriesBurned = () => {
    return activities.reduce((acc, activity) => acc + activity.calories_burned_per_hour, 0);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      token,
      user,
      login,
      logout,
      isLoading,
      updateUser,
      getUserData,
      calorieRequirement,
      meals,
      activities,
      addOrUpdateMeal,
      removeMeal,
      addOrUpdateActivity,
      removeActivity,
      getInitialCaloriesConsumed,
      getInitialCaloriesBurned
    }}>
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