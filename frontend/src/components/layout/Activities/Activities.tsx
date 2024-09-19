import { Plus } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import Modal from '../../common/Modal';
import GetActivities from './GetActivities';
import { useState } from 'react';

export default function Activities() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='bg-card-bg p-4 rounded-xl min-h-80'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg'>Actividad física</h3>
        <button onClick={() => setIsModalOpen(true)}>
          <Plus />
        </button>
      </div>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <GetActivities />
        </Modal>
      )}

      <div className='h-48 bg-card-muted rounded-xl'></div>
    </div>
  );
}
