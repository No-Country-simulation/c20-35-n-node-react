import { Coffee, Moon, Plus, Search, Sun } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface FoodItem {
  name: string
  quantity: string
  calories: number
  icon: React.ReactNode
}

const foodItems: FoodItem[] = [
  { name: "Avena", quantity: "1 tazón", calories: 150, icon: <Coffee className="h-5 w-5" /> },
  { name: "Pollo a la parrilla", quantity: "150g", calories: 250, icon: <Sun className="h-5 w-5" /> },
  { name: "Salmón", quantity: "200g", calories: 300, icon: <Moon className="h-5 w-5" /> },
]
const meals = ["Desayuno", "Almuerzo", "Cena"]

function Foods() {
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState('')

  return (
    <div>
      <h3 className="text-lg mb-4">Comidas</h3>
      <div className="bg-card-bg rounded-xl shadow-lg overflow-hidden">
        {meals.map((meal, mealIndex) => (
          <div key={meal} className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium">{meal}</h4>
              <button 
                className="bg-card-muted hover:bg-gray-200 text-text/70 rounded-full p-1"
                onClick={() => {
                  setSelectedMeal(meal)
                  setIsModalOpen(true)
                }}
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
                    <div className="bg-card-bg p-2 rounded-full text-secondary">{item.icon}</div>
                    <div>
                      <p className="text-md font-light">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                      <div className="text-xs font-medium flex flex-col items-center">
                      {item.calories} 
                      <span className="text-xs font-light text-blue">kcal</span>
                    </div>
                    <div className="text-xs font-medium flex flex-col items-center">
                      {item.calories} 
                      <span className="text-xs font-light text-yellow">grasas</span>
                    </div>
                    <div className="text-xs font-medium flex flex-col items-center">
                      {item.calories} 
                      <span className="text-xs font-light text-green">proteinas</span>
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
            {mealIndex < meals.length - 1 && <hr className="mt-6 border-bordes/50" />}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card-bg p-6 rounded-xl lg:w-[450px] lg:h-[250px]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4">Agregar alimento a {selectedMeal}</h2>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Buscar alimento..."
                  className="w-full p-2 pl-10 rounded-lg bg-card-muted"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition-colors duration-200"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Foods