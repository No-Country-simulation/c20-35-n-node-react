import { Bell, Settings } from 'lucide-react'
import Requirements from '../components/layout/Requirements'
import Activities from '../components/layout/Activities/Activities'
import Foods from '../components/layout/Foods'
import { useState } from 'react'
import { Macros } from '../models/CaloriesConsumed'

function Home() {
  const [caloriesBurned, setCaloriesBurned] = useState<number>(300)
  const [caloriesConsumed, setCaloriesConsumed] = useState<Macros>({
    calories: 1500,
    protein: 75,
    carbohydrates: 180,
    fat: 50
  })

  const addExercise = (calories: number) => setCaloriesBurned(prev => prev + calories);
  const removeExercise = (calories: number) => setCaloriesBurned(prev => prev - calories);

  const addMeal = (macros: Macros) => {
    setCaloriesConsumed(prev => ({
      calories: prev.calories + macros.calories,
      protein: prev.protein + macros.protein,
      carbohydrates: prev.carbohydrates + macros.carbohydrates,
      fat: prev.fat + macros.fat
    }));
  };

  const removeMeal = (macros: Macros) => {
    setCaloriesConsumed(prev => ({
      calories: prev.calories - macros.calories,
      protein: prev.protein - macros.protein,
      carbohydrates: prev.carbohydrates - macros.carbohydrates,
      fat: prev.fat - macros.fat
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
        <Foods addMeal={addMeal} removeMeal={removeMeal} />
        <Activities addExercise={addExercise} removeExercise={removeExercise} />
      </div>

    </main>
  );
}

export default Home
