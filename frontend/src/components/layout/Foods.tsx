import { Coffee, Moon, Plus, Search, Sun, UtensilsCrossed } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import getFoodData, { FoodData } from '../../services/GetFoodData'
import SearchFood from './SearchFood'
import Modal from '../common/Modal'
import FoodInfo from './FoodInfo'

interface FoodItem {
  foodData: FoodData;
  quantity: string;
  icon: React.ReactNode;
}

const foodItemsDefault: FoodItem[] = [
  {
    foodData: { foodDescription: "Avena", servingSize: 150, servingUnit: "g", foodNutrients: { calories: 150, fat: 3, protein: 5, carbohydrates: 27 } },
    quantity: "1 tazón",
    icon: <UtensilsCrossed className="h-4 w-4" />
  },
]

function Foods() {
  const { user } = useAuth()
  const [foodItems, setFoodItems] = useState<FoodItem[]>(foodItemsDefault)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFood, setSelectedFood] = useState<FoodData | null>(null)

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedFood(null)
    }
  }, [isModalOpen])

  const addFood = (grams: number) => {
    if (selectedFood) {
      setFoodItems([...foodItems, {
        foodData: selectedFood,
        quantity: `${grams} ${selectedFood.servingUnit}`,
        icon: <UtensilsCrossed className="h-4 w-4" />
      }])

      setIsModalOpen(false)
      setSelectedFood(null)
    }
  }

  return (
    <div>
      <div className="bg-card-bg rounded-xl shadow-lg overflow-hidden lg:min-h-[250px] p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-medium">Lista de alimentos</h4>
          <button
            className="bg-card-muted hover:bg-gray-200 text-text/70 rounded-full p-1"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-5 w-5" />
            <span className="sr-only">Agregar alimento</span>
          </button>
        </div>
        <div className="space-y-3">
          {foodItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between bg-card-muted p-3 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.78 }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-card-bg p-1.5 rounded-full text-text/40">
                  {item.icon}
                </div>
                <div>
                  <p className="text-md font-light">{item.foodData.foodDescription}</p>
                  <p className="text-xs text-text/40">{item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-xs font-medium flex flex-col items-center">
                  {item.foodData.foodNutrients.calories}
                  <span className="text-xs font-light text-blue">kcal</span>
                </div>
                <div className="text-xs font-medium flex flex-col items-center">
                  {item.foodData.foodNutrients.fat}
                  <span className="text-xs font-light text-yellow">grasas</span>
                </div>
                <div className="text-xs font-medium flex flex-col items-center">
                  {item.foodData.foodNutrients.protein}
                  <span className="text-xs font-light text-green">prote</span>
                </div>
                <div className="text-xs font-medium flex flex-col items-center">
                  {item.foodData.foodNutrients.carbohydrates}
                  <span className="text-xs font-light text-deadline">carbs</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedFood && (
          <Modal setIsModalOpen={setIsModalOpen} goBack={() => setSelectedFood(null)}>
            <FoodInfo food={selectedFood} addFood={addFood} />
          </Modal>
        )}

        {isModalOpen && !selectedFood && (
          <Modal setIsModalOpen={setIsModalOpen}>
            <SearchFood setSelectedFood={setSelectedFood} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Foods