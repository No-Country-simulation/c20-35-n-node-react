import axios from 'axios';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const GetActivities = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/activities',
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setData(null);
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div>
      {isLoading && <ClipLoader size={20} color='white' />}
      {!isLoading && data && (
        <div>
          {data.map((item, index) => {
            return <div>{item.name}</div>;
          })}
        </div>
      )}
      {!isLoading && !data && <p>Hubo un error con obtener los ejercicios</p>}
    </div>
  );
};

export default GetActivities;
