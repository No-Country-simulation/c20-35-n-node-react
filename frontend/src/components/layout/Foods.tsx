import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Moon, Plus, Search, Sun, UtensilsCrossed, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import getFoodData, { FoodData } from '../../services/GetFoodData';
import SearchFood from './SearchFood';
import Modal from '../common/Modal';
import FoodInfo from './FoodInfo';

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
  {
    foodData: { foodDescription: "Pollo a la parrilla", servingSize: 150, servingUnit: "g", foodNutrients: { calories: 250, fat: 5, protein: 30, carbohydrates: 0 } },
    quantity: "150g",
    icon: <UtensilsCrossed className="h-4 w-4" />
  },
  {
    foodData: { foodDescription: "Salmón", servingSize: 150, servingUnit: "g", foodNutrients: { calories: 300, fat: 18, protein: 22, carbohydrates: 0 } },
    quantity: "200g",
    icon: <UtensilsCrossed className="h-4 w-4" />
  },
];

function Foods() {
  const { user } = useAuth();
  const [foodItems, setFoodItems] = useState<FoodItem[]>(foodItemsDefault);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedFood(null);
    }
  }, [isModalOpen]);

  const addFood = (newFood: FoodData) => {
    try {
      if (!newFood || !newFood.foodDescription || !newFood.foodNutrients) {
        throw new Error('Datos de alimento inválidos');
      }
      setFoodItems(prev => [...prev, {
        foodData: newFood,
        quantity: `${newFood.servingSize || 0}${newFood.servingUnit || 'g'}`,
        icon: <UtensilsCrossed className="h-4 w-4" />
      }]);
      setIsModalOpen(false);
      setSelectedFood(null);
      setError(null);
    } catch (err) {
      setError('Error al agregar alimento: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const removeFood = (index: number) => {
    setFoodItems(prev => prev.filter((_, i) => i !== index));
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-white">Lista de alimentos</h4>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition duration-300 ease-in-out"
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
            className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gray-600 p-1.5 rounded-full text-white">
                {item.icon}
              </div>
              <div>
                <p className="text-md font-light text-white">{item.foodData.foodDescription}</p>
                <p className="text-xs text-gray-400">{item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-xs font-medium flex flex-col items-center">
                <span className="text-white">{item.foodData.foodNutrients?.calories ?? 'N/A'}</span>
                <span className="text-blue-400">kcal</span>
              </div>
              <div className="text-xs font-medium flex flex-col items-center">
                <span className="text-white">{item.foodData.foodNutrients?.fat ?? 'N/A'}</span>
                <span className="text-yellow-400">grasas</span>
              </div>
              <div className="text-xs font-medium flex flex-col items-center">
                <span className="text-white">{item.foodData.foodNutrients?.protein ?? 'N/A'}</span>
                <span className="text-green-400">prote</span>
              </div>
              <div className="text-xs font-medium flex flex-col items-center">
                <span className="text-white">{item.foodData.foodNutrients?.carbohydrates ?? 'N/A'}</span>
                <span className="text-red-400">carbs</span>
              </div>
              <button onClick={() => removeFood(index)} className="text-red-500 hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
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
  );
}

export default Foods;