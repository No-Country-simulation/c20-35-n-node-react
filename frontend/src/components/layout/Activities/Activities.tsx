import { Dumbbell, Plus } from 'lucide-react';
import Modal from '../../common/Modal';
import GetActivities from './GetActivities';
import { useEffect, useState } from 'react';
import { Activity, DifficultyLevel } from '../../../models/Activity';
import ActivityInfo from './ActivityInfo';
import { AnimatePresence, motion } from 'framer-motion';

const colorDifficult = (difficult: DifficultyLevel): string => {
  if (difficult === DifficultyLevel.beginner) {
    return 'bg-green px-2 py-1 rounded-full text-slate-800';
  } else if (difficult === DifficultyLevel.intermediate) {
    return 'bg-yellow px-2 py-1 rounded-full text-slate-800';
  } else {
    return 'bg-orange-500 px-2 py-1 rounded-full text-slate-800';
  }
};

const activitiesItemsDefault = [
  {
    activityData: {
      id: 1,
      name: 'Correr',
      description: 'Ejercicio cardiovascular de alta intensidad',
      calories_burned_per_hour: 600,
      difficulty_level: DifficultyLevel.intermediate,
      muscles_targeted: 'Piernas, Core',
      equipment_needed: 'Zapatillas deportivas',
    },
    quantity: 60,
    icon: <Dumbbell className='w-4 h-4' />,
  },
  {
    activityData: {
      id: 2,
      name: 'Nadar',
      description: 'Entrenamiento completo del cuerpo en el agua',
      calories_burned_per_hour: 500,
      difficulty_level: DifficultyLevel.advanced,
      muscles_targeted: 'Todo el cuerpo',
      equipment_needed: 'Piscina',
    },
    quantity: 20,
    icon: <Dumbbell className='w-4 h-4' />,
  },
  {
    activityData: {
      id: 3,
      name: 'Ciclismo',
      description: 'Ejercicio aeróbico sobre ruedas',
      calories_burned_per_hour: 400,
      difficulty_level: DifficultyLevel.beginner,
      muscles_targeted: 'Piernas',
      equipment_needed: 'Bicicleta',
    },
    quantity: 40,
    icon: <Dumbbell className='w-4 h-4' />,
  },
];

export default function Activities() {
  const [activities, setActivities] = useState(activitiesItemsDefault);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );

  const addActivity = (quantity: number) => {
    if (selectedActivity) {
      setActivities([
        ...activities,
        {
          activityData: selectedActivity,
          quantity,
          icon: <Dumbbell className='h-4 w-4' />,
        },
      ]);
      setIsModalOpen(false);
      setSelectedActivity(null);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedActivity(null);
    }
  }, [isModalOpen]);

  return (
    <div className='bg-card-bg p-4 rounded-xl min-h-80'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg'>Actividad física</h3>
        <button onClick={() => setIsModalOpen(true)}>
          <Plus />
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedActivity && (
          <Modal
            setIsModalOpen={setIsModalOpen}
            goBack={() => setSelectedActivity(null)}
          >
            <ActivityInfo
              activity={selectedActivity}
              addActivity={addActivity}
              color={colorDifficult(selectedActivity.difficulty_level)}
            />
          </Modal>
        )}
        {isModalOpen && !selectedActivity && (
          <Modal setIsModalOpen={setIsModalOpen}>
            <GetActivities
              setSelectedActivity={setSelectedActivity}
              colorDifficult={colorDifficult}
            />
          </Modal>
        )}
      </AnimatePresence>

      <div className=''>
        <div className='space-y-3'>
          {activities.map((item, index) => (
            <motion.div
              key={index}
              className='flex items-center justify-between bg-card-muted p-3 rounded-lg'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.78 }}
            >
              <div className='flex gap-2'>
                <div className='bg-card-bg p-1.5 w-10 h-10 rounded-full text-text/40 flex items-center justify-center'>
                  {item.icon}
                </div>
                <div>
                  <p>{item.activityData.name}</p>
                  <p className='text-xs text-text/40'>
                    {item.quantity} minutes
                  </p>
                </div>
              </div>

              <div>
                <p>
                  Calories burned:{' '}
                  {Math.floor(
                    item.activityData.calories_burned_per_hour *
                      (item.quantity / 60),
                  )}{' '}
                  kcal
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
