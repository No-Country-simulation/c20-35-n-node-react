import { Activity } from '../../../models/Activity';

const ActivityInfo = ({ activity }: { activity: Activity }) => {
  return (
    <div className='flex flex-col'>
      <h1>{activity.name}</h1>
      <p>{activity.difficulty_level}</p>
      <label htmlFor='time'>¿Cuántos minutos realizaste esta actividad?</label>
      <input id='time' type='number' />
    </div>
  );
};

export default ActivityInfo;
