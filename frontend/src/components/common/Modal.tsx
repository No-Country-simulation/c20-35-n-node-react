import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';

export default function Modal({
  children,
  setIsModalOpen,
  goBack,
}: {
  children: React.ReactNode;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goBack?: () => void;
}) {
  return (
    <motion.div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='bg-card-bg p-6 rounded-xl max-w-[90%] lg:w-[650px] h-[80%] overflow-y-auto relative pt-10'
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {children}
        {goBack && (
          <button
            className='absolute top-3 left-3 text-blue-500 hover:text-blue-600 transition-colors duration-200'
            onClick={goBack}
          >
            <ArrowLeft className='h-6 w-6' />
          </button>
        )}
        <button
          className='absolute top-3 right-3 text-blue-500 hover:text-red hover:text-red-600 transition-colors duration-200'
          onClick={() => setIsModalOpen(false)}
        >
          <X className='h-6 w-6' />
        </button>
      </motion.div>
    </motion.div>
  );
}
