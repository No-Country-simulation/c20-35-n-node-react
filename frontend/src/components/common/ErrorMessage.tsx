import { motion, AnimatePresence } from 'framer-motion'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

type ErrorProps = {
  message: string | undefined
  type: 'field' | 'form'
}

const ErrorMessage: React.FC<ErrorProps> = ({ message, type }) => {
  if (!message) return null

  return (
    <AnimatePresence>
      <motion.div
        className={`text-red font-light ${type === 'field' ? 'flex items-center gap-1 mt-1' : 'col-span-6 flex gap-1 w-full rounded-lg bg-red/35 px-4 py-3 text-text/50'}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <InformationCircleIcon className='w-4 h-4' />
        <p className='text-sm'>{message}</p>
      </motion.div>
    </AnimatePresence>
  )
}

export default ErrorMessage
