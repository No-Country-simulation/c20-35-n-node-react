import { useState } from 'react';
import { Activity } from '../../../models/Activity';
import { Plus } from 'lucide-react';

const ActivityInfo = ({
  activity,
  color,
  addActivity,
}: {
  activity: Activity;
  color: string;
  addActivity: (quantity: number) => void;
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [empty, setEmpty] = useState<boolean>(false);

  const handleAdd = () => {
    if (quantity === 0) {
      setEmpty(true);
      return;
    }
    addActivity(quantity);
  };

  return (
    <div className='flex flex-col mt-5 items-center'>
      <div className='flex gap-3 p-3'>
        <h1 className='text-2xl'>{activity.name}</h1>
        <p className={color}>{activity.difficulty_level}</p>
      </div>

      <div className='text-sm text-slate-200 pb-10'>
        <p className=''>{activity.description}</p>
        <p>Equipo necesario: {activity.equipment_needed}</p>
        <p>Zonas que trabaja: {activity.muscles_targeted}</p>
      </div>

      <p className='text-xl'>¿Cuántos minutos realizaste esta actividad?</p>
      <div className='flex mt-6'>
        <input
          type='number'
          value={quantity || ''}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className='w-24 bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='0'
        />
        <label className='text-center px-8 my-auto text-2xl text-gray-400 w-5 h-5'>
          minutes
        </label>
      </div>
      {empty && <p className='text-rose-500'>Completa la cantidad</p>}
      <div className='bg-gray-800 p-4 rounded-md text-center mt-6'>
        <span className='text-lg font-bold'>
          Calorías quemadas por hora:{' '}
          <span className='font-light'>
            {activity.calories_burned_per_hour} kcal
          </span>
        </span>
      </div>

      <button
        onClick={handleAdd}
        className='mt-6 w-full bg-secondary hover:bg-secondary/50 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition duration-300 ease-in-out'
      >
        <Plus className='w-5 h-5 mr-2' />
        Agregar actividad
      </button>
    </div>
  );
};

export default ActivityInfo;
