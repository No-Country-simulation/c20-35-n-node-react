import axios from 'axios';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Activity, DifficultyLevel } from '../../../models/Activity';
import { Plus } from 'lucide-react';

const GetActivities = ({
  setSelectedActivity,
  colorDifficult,
}: {
  setSelectedActivity: (activity: Activity) => void;
  colorDifficult: (difficult: DifficultyLevel) => string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Activity[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/activities',
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setData([]);
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className='h-full w-full overflow-y-auto'>
      {isLoading && (
        <div className='flex justify-center items-center h-full'>
          <ClipLoader size={40} color='white' />
        </div>
      )}
      {!isLoading && data.length !== 0 && (
        <div>
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className='shadow-sm bg-card-muted my-2 px-4 py-2 rounded-md w-full flex'
              >
                <div className='flex items-center gap-2 w-[90%]'>
                  <h3>{item.name}</h3>
                  <p className='text-sm rounded-full bg-slate-500 px-2'>
                    {item.calories_burned_per_hour} kcal/hora
                  </p>
                  <p className={colorDifficult(item.difficulty_level)}>
                    {item.difficulty_level}
                  </p>
                </div>

                <div>
                  <button
                    className='text-white hover:text-secondary'
                    onClick={() => setSelectedActivity(item)}
                  >
                    <Plus fill='' />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!isLoading && data.length === 0 && (
        <div className='flex justify-center items-center h-full'>
          <p className='bg-rose-400 bg-opacity-30 text-rose-950 rounded-md px-4 py-2'>
            Hubo un error con obtener los ejercicios
          </p>
        </div>
      )}
    </div>
  );
};

export default GetActivities;
