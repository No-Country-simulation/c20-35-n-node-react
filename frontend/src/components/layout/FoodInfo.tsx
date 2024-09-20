import React, { useState, useEffect } from 'react'
import { Egg, Droplet, Candy, Scale, Plus } from 'lucide-react'
import { FoodData } from '../../services/GetFoodData'

interface MacroNutrient {
  name: string
  value: number
  color: string
  icon: React.ReactNode,
  calories: number
}

interface FoodInfoProps {
  food: FoodData
  addFood: (grams: number) => void
}

const Progress: React.FC<{ percent: number; color: string }> = ({ percent, color }) => (
  <div className="w-full bg-gray-700 rounded-full h-2.5">
    <div
      className="h-2.5 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${percent}%`, backgroundColor: color }}
    ></div>
  </div>
)

export default function FoodInfo({ food, addFood }: FoodInfoProps) {
  const [grams, setGrams] = useState(100)
  const [macros, setMacros] = useState<MacroNutrient[]>([])
  const [totalCalories, setTotalCalories] = useState(0)
  const { foodDescription, foodNutrients, servingSize, servingUnit } = food

  const calculateNutrients = (amount: number) => {
    const protein = (foodNutrients.protein * amount) / 100
    const fat = (foodNutrients.fat * amount) / 100
    const carbohydrates = (foodNutrients.carbohydrates * amount) / 100
    const calories = (foodNutrients.calories * amount) / 100

    const proteinCalories = protein * 4
    const fatCalories = fat * 9
    const carbCalories = carbohydrates * 4
    const totalMacroCalories = proteinCalories + fatCalories + carbCalories

    setMacros([
      { name: 'Proteínas', value: protein, color: '#10B981', icon: <Egg className="w-5 h-5" />, calories: proteinCalories },
      { name: 'Grasas', value: fat, color: '#3B82F6', icon: <Droplet className="w-5 h-5" />, calories: fatCalories },
      { name: 'Carbohidratos', value: carbohydrates, color: '#EC4899', icon: <Candy className="w-5 h-5" />, calories: carbCalories },
    ])
    setTotalCalories(calories)
  }

  useEffect(() => {
    calculateNutrients(grams)
  }, [grams, food])

  return (
    <div className="text-white p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">{foodDescription}</h2>

      <div className="space-y-6">
        {macros.map((macro) => (
          <div key={macro.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-gray-400">{macro.icon}</div>
                <span className="text-sm font-medium">{macro.name}</span>
              </div>
              <span className="text-sm font-medium">{macro.value.toFixed(1)} g</span>
            </div>
            <Progress percent={(macro.calories / totalCalories) * 100} color={macro.color} />
          </div>
        ))}

        <div className="flex mt-6">
          <label className="text-center px-8 my-auto text-2xl text-gray-400 w-5 h-5" >{servingUnit}</label>
          <input
            type="number"
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value))}
            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Gramos a ingerir (g)"
          />
        </div>

        <div className="bg-gray-800 p-4 rounded-md text-center mt-6">
          <span className="text-lg font-bold">
          🔥 Calorías que aporta: <span className="font-light">{totalCalories.toFixed(0)} kcal</span>
          </span>
        </div>
      </div>

      <button onClick={()=>addFood(grams)} className="mt-6 w-full bg-secondary hover:bg-secondary/50 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition duration-300 ease-in-out">
        <Plus className="w-5 h-5 mr-2" />
        Agregar alimento
      </button>
    </div>
  )
}