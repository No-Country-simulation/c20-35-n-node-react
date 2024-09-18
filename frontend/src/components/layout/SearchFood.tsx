import { motion } from 'framer-motion'
import { Coffee, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import getFoodData, { FoodData } from '../../services/GetFoodData'
import { ClipLoader } from 'react-spinners'

export default function SearchFood({ setSelectedFood }: { setSelectedFood: (food: FoodData) => void }) {

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<FoodData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true)
      getFoodData(searchQuery, 8).then(setSearchResults).finally(() => setIsLoading(false))
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  return (
    <>
        <h2 className="text-xl font-bold mb-4">Agregar alimento</h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar alimento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 rounded-lg bg-card-muted"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex justify-between flex-col flex-grow h-40 gap-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <ClipLoader color="#FFF" />
            </div>
          ) : (
            searchResults.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between bg-card-muted p-2 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.78 }}
                    onClick={() => setSelectedFood(item)}
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-sm font-light">{item.foodDescription}</p>
                        <p className="text-xs text-gray-500">{item.servingSize} {item.servingUnit}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-auto">
                  <div className="text-xs font-light flex flex-col items-center w-4">
                        {item.foodNutrients.calories}
                        <span className="text-xs font-light text-blue">KCAL</span>
                      </div>
                      <div className="text-xs font-light text-gray-500 flex flex-col items-center w-4">
                        {item.foodNutrients.fat}
                        <span className="text-xs font-light text-yellow">G</span>
                      </div>
                      <div className="text-xs font-light text-gray-500 flex flex-col items-center w-4">
                        {item.foodNutrients.protein}
                        <span className="text-xs font-light text-green">P</span>
                      </div>
                      <div className="text-xs font-light text-gray-500 flex flex-col items-center w-4">
                        {item.foodNutrients.carbohydrates}
                        <span className="text-xs font-light text-red">C</span>
                      </div>
                    </div>

                  </motion.div>
            ))
          )}
        </div>
    </>
  )
}
