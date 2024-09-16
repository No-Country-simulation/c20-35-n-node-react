// TODO: presionar enter para darle a siguiente y no para enviar el form
import { useState } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormData,
  userProfileSchema,
  GOALS,
  ACTIVITY_LEVELS,
} from '../const/profile-params';

import { ClipLoader } from 'react-spinners';
import { motion, AnimatePresence } from 'framer-motion';
import CardSelect from '../components/common/CardSelect';
import { Option } from '../types/types';
import axios, { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState(0); // Controlamos la pregunta actual
  const [direction, setDirection] = useState(0); // Controlamos la dirección de la animación

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userProfileSchema),
  });

  type Question = {
    id: 'age' | 'gender' | 'weight' | 'height' | 'goal' | 'activityLevel';
    label: string;
    type: 'number' | 'select';
    placeholder?: string; // Opcional para 'number' y necesario para 'select'
    text?: string; // Opcional, solo para 'number'
    options?: Option[]; // Opcional, solo para 'select'
    error?: FieldError; // Opcional para mostrar el error
  };

  // Ejemplo de uso
  const questions: Question[] = [
    {
      id: 'age',
      label: '¿Cuántos años tienes?',
      type: 'number',
      text: 'Años',
      placeholder: '30',
      error: errors.age,
    },
    {
      id: 'weight',
      label: '¿Cuál es tu peso?',
      type: 'number',
      placeholder: '80',
      text: 'kg',
      error: errors.weight,
    },
    {
      id: 'height',
      label: '¿Cuál es tu altura?',
      type: 'number',
      placeholder: '165',
      text: 'cm',
      error: errors.height,
    },
    {
      id: 'gender',
      label:
        '¿Con qué sexo debemos hacer los cálculos de necesidades calóricas?',
      type: 'select',
      options: [
        { value: 'male', label: 'Masculino', icon: 'male.svg' },
        { value: 'female', label: 'Femenino', icon: 'female.svg' },
      ],
      error: errors.gender,
    },
    {
      id: 'goal',
      label: 'Objetivos de fitness',
      type: 'select',
      options: GOALS,
      placeholder: 'Selecciona tus objetivos',
      error: errors.goal,
    },
    {
      id: 'activityLevel',
      label: 'Nivel de Actividad',
      type: 'select',
      options: ACTIVITY_LEVELS,
      placeholder: 'Selecciona tu nivel de actividad',
      error: errors.activityLevel,
    },
  ];
  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      await axios.patch('/auth/profile', data, {
        baseURL: 'http://localhost:3000/api/v1', //aqui debe ir una constante de base url para usar en todas las peticiones
        headers: { Authorization: `Bearer ${Cookies.get('auth')}` },
      });

      navigate('/dashboard');
    } catch (error) {
      if (isAxiosError(error)) {
        setError('root.badrequest', {
          type: 'manual',
          message: 'Error del servidor',
        });
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleNext = () => {
    setDirection(1); // Direccion derecha (ir al siguiente)
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setDirection(-1); // Direccion izquierda (ir al anterior)
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <main className='flex h-screen items-center justify-center p-4 bg-welcome-gradient'>
      <div className='relative min-w-[50%] h-[90%] flex justify-center'>
        <div className='w-full h-full bg-white shadow-box rounded-lg p-14 z-10 relative flex flex-col items-center justify-center'>
          <div className='flex flex-col gap text-center'>
            <h3 className='text-md text-gray-400 font-light'>
              Te damos la bienvenida
            </h3>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Claus</h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='h-full w-full flex flex-col justify-end items-center relative'
            noValidate
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }} // Movimiento solo para el que entra
                animate={{ opacity: 1, x: 0 }} // El que entra se mueve al centro
                exit={{ opacity: 0 }} // El que sale solo desaparece
                transition={{ duration: 0.5 }}
                className='absolute w-full top-0'
              >
                {questions[step].type === 'number' && (
                  <div className='pt-16 flex flex-col items-center h-full w-full '>
                    <label
                      htmlFor={questions[step].id}
                      className='text-lg font-light text-gray-500 mt-1'
                    >
                      {questions[step].label}
                    </label>
                    <div className='flex w-24 items-end gap-2'>
                      <input
                        id={questions[step].id}
                        type={questions[step].type}
                        disabled={isLoading}
                        {...register(questions[step].id as keyof FormData)}
                        placeholder={questions[step].placeholder}
                        className='text-4xl w-14 text-center py-1 placeholder-slate-300 border-b-2 rounded-md border-slate-400'
                      />
                      <p className='w-1/2'>
                        {questions[step].text && questions[step].text}
                      </p>
                    </div>
                    {questions[step].error && (
                      <p className='px-1 text-xs text-red'>
                        {questions[step].error.message}
                      </p>
                    )}
                  </div>
                )}

                {questions[step].type === 'select' &&
                  questions[step].options && (
                    <div className='h-full flex flex-col gap-4'>
                      <p className='text-lg font-light text-center text-gray-500 mt-1'>
                        {questions[step].label}
                      </p>
                      <Controller
                        name={questions[step].id}
                        control={control}
                        render={({ field }) => (
                          <CardSelect
                            options={questions[step].options || []}
                            value={field.value || ''}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {questions[step].error && (
                        <p className='px-1 text-xs text-red'>
                          {questions[step].error.message}
                        </p>
                      )}
                    </div>
                  )}
              </motion.div>
            </AnimatePresence>

            <div className='flex justify-between h-10'>
              {step > 0 && (
                <button
                  type='button'
                  onClick={handleBack}
                  disabled={isLoading}
                  className='bg-purple-900 px-4 py-2 rounded-full text-white'
                >
                  Anterior
                </button>
              )}
              {step < questions.length - 1 ? (
                <button
                  type='button'
                  onClick={handleNext}
                  disabled={isLoading}
                  className='bg-purple-900 px-4 py-2 rounded-full text-white'
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type='submit'
                  disabled={isLoading}
                  className='bg-purple-900 px-4 py-2 rounded-full text-white'
                >
                  {isLoading ? (
                    <ClipLoader size={24} color='white' />
                  ) : (
                    'Enviar'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
