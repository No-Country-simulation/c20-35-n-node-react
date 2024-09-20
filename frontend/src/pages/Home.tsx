import { Bell, Settings } from 'lucide-react'
import Requirements from '../components/layout/Requirements'
import Activities from '../components/layout/Activities/Activities'
import Foods from '../components/layout/Foods'
import { useEffect, useState } from 'react'
import { Macros } from '../models/CaloriesConsumed'
import { FoodItem } from '../models/FoodItem'
import { Activity } from '../models/Activity'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { meals, activities, getInitialCaloriesConsumed, getInitialCaloriesBurned } = useAuth();
  const [caloriesBurned, setCaloriesBurned] = useState<number>(300)
  const [caloriesConsumed, setCaloriesConsumed] = useState<Macros>({
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0
  })

  const addExercise = (calories: number) => setCaloriesBurned(prev => prev + calories);
  const removeExercise = (calories: number) => setCaloriesBurned(prev => prev - calories);

  /*
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
  };*/

  useEffect(() => {
    setCaloriesConsumed(getInitialCaloriesConsumed());
    setCaloriesBurned(getInitialCaloriesBurned());
  }, [meals, activities]);

  const changeMeals = (meals: FoodItem[]) => {
    setCaloriesConsumed(prev => ({
      calories: prev.calories + meals.reduce((acc, meal) => acc + meal.macros.calories, 0),
      protein: prev.protein + meals.reduce((acc, meal) => acc + meal.macros.protein, 0),
      carbohydrates: prev.carbohydrates + meals.reduce((acc, meal) => acc + meal.macros.carbohydrates, 0),
      fat: prev.fat + meals.reduce((acc, meal) => acc + meal.macros.fat, 0)
    }));
  };

  const changeActivities = (activities: Activity[]) => {
    setCaloriesBurned(prev => prev + activities.reduce((acc, activity) => acc + activity.calories_burned_per_hour, 0));
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
        <Foods changeMeals={changeMeals} />
        <Activities changeActivities={changeActivities} />
      </div>

    </main>
  );
}

export default Home
