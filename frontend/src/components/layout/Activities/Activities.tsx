import { Dumbbell, Plus, Trash2 } from 'lucide-react';
import Modal from '../../common/Modal';
import GetActivities from './GetActivities';
import { useEffect, useState } from 'react';
import { Activity, DifficultyLevel } from '../../../models/Activity';
import ActivityInfo from './ActivityInfo';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';

const colorDifficult = (difficult: DifficultyLevel): string => {
  if (difficult === DifficultyLevel.beginner) {
    return 'bg-green px-2 py-1 rounded-full text-slate-800';
  } else if (difficult === DifficultyLevel.intermediate) {
    return 'bg-yellow px-2 py-1 rounded-full text-slate-800';
  } else {
    return 'bg-orange-500 px-2 py-1 rounded-full text-slate-800';
  }
};

export default function Activities({changeActivities}: {changeActivities: (activities: Activity[]) => void}) {
  const { activities, addOrUpdateActivity, removeActivity } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const addActivity = (quantity: number) => {
    if (selectedActivity) {
      const newActivity: Activity = {
        ...selectedActivity,
        id: Date.now(), // Genera un ID único
      };
      addOrUpdateActivity(newActivity);
      changeActivities([...activities, newActivity]);
      setIsModalOpen(false);
      setSelectedActivity(null);
    }
  };

  const handleRemoveActivity = (id: number) => {
    removeActivity(id);
    changeActivities(activities.filter(activity => activity.id !== id));
  };

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedActivity(null);
    }
  }, [isModalOpen]);

  return (
    <div className='bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h4 className='text-xl font-bold text-white'>Lista de actividades</h4>
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition duration-300 ease-in-out'
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className='h-5 w-5' />
          <span className='sr-only'>Agregar actividad</span>
        </button>
      </div>

      <div className='space-y-3'>
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            className='flex items-center justify-between bg-gray-700 p-3 rounded-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className='flex items-center space-x-3'>
              <div className='bg-gray-600 p-1.5 rounded-full text-white'>
                <Dumbbell className='w-4 h-4' />
              </div>
              <div>
                <div className='flex items-center space-x-2'>
                  <p className='text-md font-light text-white'>{activity.name}</p>
                  <span className={`text-xs font-medium ${colorDifficult(activity.difficulty_level)}`}>
                    {activity.difficulty_level}
                  </span>
                </div>
                <p className='text-xs text-gray-400'>{activity.description}</p>
              </div>
            </div>

            <div className='flex items-center space-x-3'>
              <div className='text-sm font-medium flex flex-col items-center'>
                <span className='text-white text-lg'>
                  {activity.calories_burned_per_hour}
                </span>
                <span className='text-blue'>kcal/hora</span>
              </div>
              <button onClick={() => handleRemoveActivity(activity.id)} className="text-red-500 hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
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
    </div>
  );
}
