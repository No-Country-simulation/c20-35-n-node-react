import { Bell, Settings } from 'lucide-react'
import Requirements from '../components/layout/Requirements'
import Activities from '../components/layout/Activities/Activities'
import Foods from '../components/layout/Foods'
import { useState } from 'react'
import { CaloriesConsumed } from '../models/CaloriesConsumed'

function Home() {
  const [caloriesBurned, setCaloriesBurned] = useState<number>(300)
  const [caloriesConsumed, setCaloriesConsumed] = useState<CaloriesConsumed>({
    calories: 1500,
    protein: 75,
    carbohydrates: 180,
    fat: 50
  })

  const addExercise = () => {
    const exerciseCalories = Math.floor(Math.random() * 100) + 50; // Random entre 50 y 150 calorías
    setCaloriesBurned(prev => prev + exerciseCalories);
  };

  const addMeal = () => {
    const mealCalories = Math.floor(Math.random() * 300) + 200; // Random entre 200 y 500 calorías
    const protein = Math.floor(mealCalories * 0.3 / 4); // 30% proteínas
    const carbs = Math.floor(mealCalories * 0.5 / 4); // 50% carbohidratos
    const fat = Math.floor(mealCalories * 0.2 / 9); // 20% grasas

    setCaloriesConsumed(prev => ({
      calories: prev.calories + mealCalories,
      protein: prev.protein + protein,
      carbohydrates: prev.carbohydrates + carbs,
      fat: prev.fat + fat
    }));
  };

  return (
    <main className="flex-grow h-screen p-8 overflow-auto bg-gray-900 text-white">
      <header className="flex justify-end items-center mb-4">
        <div className="flex items-center space-x-4">
          <Bell size={25} className="text-gray-400 hover:text-white cursor-pointer" />
          <Settings size={25} className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </header>
  
      <Requirements caloriesBurned={caloriesBurned} caloriesConsumed={caloriesConsumed} />
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Foods />
        <Activities />
      </div>
    </main>
  )
}

export default Home