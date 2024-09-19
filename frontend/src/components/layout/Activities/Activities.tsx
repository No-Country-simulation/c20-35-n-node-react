import { Plus } from 'lucide-react';
import Modal from '../../common/Modal';
import GetActivities from './GetActivities';
import { useState } from 'react';
import { Activity } from '../../../models/Activity';
import ActivityInfo from './ActivityInfo';

export default function Activities() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>();

  return (
    <div className='bg-card-bg p-4 rounded-xl min-h-80'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg'>Actividad física</h3>
        <button onClick={() => setIsModalOpen(true)}>
          <Plus />
        </button>
      </div>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          goBack={() => setSelectedActivity(null)}
        >
          {!selectedActivity && (
            <GetActivities setSelectedActivity={setSelectedActivity} />
          )}

          {selectedActivity && <ActivityInfo activity={selectedActivity} />}
        </Modal>
      )}

      <div className='h-48 bg-card-muted rounded-xl'></div>
    </div>
  );
}
