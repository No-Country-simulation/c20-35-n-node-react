import React from 'react'
import { motion } from 'framer-motion'
import { X, ArrowLeft } from 'lucide-react'

export default function Modal({ children, setIsModalOpen, goBack }: {
  children: React.ReactNode,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  goBack?: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-card-bg p-6 rounded-xl lg:w-[650px] lg:min-h-[350px] overflow-y-auto relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {children}
        {goBack && (
          <button
            className="absolute top-3 left-3 text-blue-500 hover:text-blue-600 transition-colors duration-200"
            onClick={goBack}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        )}
        <button
          className="absolute top-3 right-3 text-blue-500 hover:text-red hover:text-red-600 transition-colors duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>

      </motion.div>
    </motion.div>
  )
}
