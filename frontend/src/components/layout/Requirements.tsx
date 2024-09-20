import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useAuth } from '../../context/AuthContext';
import { calculatePercentage, calculateCalorieChange, calculateMacroGoal } from '../../utils/nutritionCalculations';
import { useEffect, useState } from 'react';
import { User } from '../../models/User';
import { calculateCalorieRequirement, CalorieRequirement } from '../../models/CaloriesRequirement';
import { Macros } from '../../models/CaloriesConsumed';

interface RequirementsProps { 
  caloriesBurned: number;
  caloriesConsumed: Macros;
}

function NutritionCard({ title, data, color }: { title: string; data: any; color: string }) {
  return (
    <motion.div
      className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">{data.icono}</div>
        <motion.div 
          className="w-14 h-14"
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}


          transition={{ duration: 1, delay: 0.5 }}
        >
          <CircularProgressbar
            value={data.porcentaje}
            text={`${data.porcentaje}%`}
            styles={buildStyles({
              textSize: '20px',
              pathColor: color,
              textColor: '#ffffff',
              trailColor: '#374151',
            })}
          />
        </motion.div>
      </div>
      <h3 className="text-xl font-bold mb-0.5">{title}</h3>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">{data.actual.toFixed(0)}</span>
        <span className="text-gray-400">/ {data.objetivo.toFixed(0)}</span>
      </div>
      <motion.div 
        className={`mt-2 text-sm ${data.cambio >= 0 ? 'text-green-400' : 'text-red-400'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {data.cambio >= 0 ? '↑' : '↓'} {Math.abs(data.cambio).toFixed(2)}%
      </motion.div>
    </motion.div>
  );
}

export default function Requirements({ caloriesBurned, caloriesConsumed }: RequirementsProps) {
  const { user, getUserData } = useAuth();
  const [userData, setUserData] = useState<User | null>(user);
  const [calorieRequirement, setCalorieRequirement] = useState<CalorieRequirement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        await getUserData();
      } else {
        setUserData(user);
        if (user.weight && user.height && user.age && user.gender && user.activityLevel && user.goal) {
          const requirement = calculateCalorieRequirement(user);
          setCalorieRequirement(requirement);
        }
      }
    };

    fetchUserData();
  }, [user, getUserData]);

  if (!userData || !calorieRequirement) {
    return <div>Cargando requerimientos...</div>;
  }

  const nutritionData = {
    calorias: { 
      actual: caloriesConsumed.calories - caloriesBurned, 
      objetivo: calorieRequirement.goal, 
      porcentaje: calculatePercentage(caloriesConsumed.calories - caloriesBurned, calorieRequirement.goal), 
      cambio: calculateCalorieChange(caloriesConsumed.calories, caloriesBurned, calorieRequirement.goal), 
      icono: '🔥' 
    },
    carbohidratos: { 
      actual: caloriesConsumed.carbohydrates, 
      objetivo: calculateMacroGoal(calorieRequirement.goal, 0.5, 4),
      porcentaje: calculatePercentage(caloriesConsumed.carbohydrates, calculateMacroGoal(calorieRequirement.goal, 0.5, 4)), 
      cambio: 0, 
      icono: '🍞' 
    },
    proteinas: { 
      actual: caloriesConsumed.protein, 
      objetivo: calculateMacroGoal(calorieRequirement.goal, 0.3, 4), // 30% de proteínas, 4 cal/g
      porcentaje: calculatePercentage(caloriesConsumed.protein, calculateMacroGoal(calorieRequirement.goal, 0.3, 4)), 
      cambio: 0, 
      icono: '🥩' 

    },
    grasas: { 
      actual: caloriesConsumed.fat, 
      objetivo: calculateMacroGoal(calorieRequirement.goal, 0.2, 9), // 20% de grasas, 9 cal/g
      porcentaje: calculatePercentage(caloriesConsumed.fat, calculateMacroGoal(calorieRequirement.goal, 0.2, 9)), 
      cambio: 0, 
      icono: '🥑' 

    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-900">
      <NutritionCard title="Calorías" data={nutritionData.calorias} color="#10B981" />
      <NutritionCard title="Carbohidratos" data={nutritionData.carbohidratos} color="#3B82F6" />
      <NutritionCard title="Proteínas" data={nutritionData.proteinas} color="#EF4444" />
      <NutritionCard title="Grasas" data={nutritionData.grasas} color="#F59E0B" />
    </div>
  );
}