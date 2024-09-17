import { useEffect, useState, useCallback, useRef } from 'react';
import { FormData, questions } from '../const/profile-params';
import { ClipLoader } from 'react-spinners';
import { motion, AnimatePresence } from 'framer-motion';
import CardSelect from '../components/common/CardSelect';
import axios, { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [name, setName] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState(0); // Controlamos la pregunta actual
  const [direction, setDirection] = useState(0); // Controlamos la dirección de la animación
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    weight: '',
    height: '',
    goal: '',
    activityLevel: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputRef = useRef<HTMLInputElement | null>(null); // Referencia al input de tipo number

  const navigate = useNavigate();

  const validateCurrentStep = useCallback(() => {
    const currentQuestion = questions[step];
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (currentQuestion.type === 'number') {
      if (!formData[currentQuestion.id as keyof FormData]) {
        newErrors[currentQuestion.id] = 'Este campo es obligatorio';
        isValid = false;
      }
    } else if (currentQuestion.type === 'select') {
      if (!formData[currentQuestion.id as keyof FormData]) {
        newErrors[currentQuestion.id] = 'Este campo es obligatorio';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [step, formData]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.patch('/auth/profile', formData, {
        baseURL: 'http://localhost:3000/api/v1',
        headers: { Authorization: `Bearer ${Cookies.get('auth')}` },
      });
      navigate('/dashboard');
    } catch (error) {
      if (isAxiosError(error)) {
        setErrors({ root: 'Error del servidor' });
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, navigate]);

  const handleBack = () => {
    setDirection(-1);
    setStep((prevStep) => prevStep - 1);
  };

  const handleNext = useCallback(async () => {
    const isValid = validateCurrentStep();
    if (isValid) {
      if (step === questions.length - 1) {
        // Si estamos en el último paso, solo enviar el formulario
        await onSubmit();
      } else {
        // De lo contrario, avanzar al siguiente paso
        setDirection(1);
        setStep((prevStep) => prevStep + 1);
      }
    }
  }, [validateCurrentStep, onSubmit, step]);

  const handleChange = (id: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const getName = async () => {
      try {
        const response = await axios.get('/auth/profile', {
          baseURL: 'http://localhost:3000/api/v1',
          headers: { Authorization: `Bearer ${Cookies.get('auth')}` },
        });

        setName(response.data.name);
      } catch {
        navigate('/login');
      }
    };
    getName();
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const isValid = validateCurrentStep();

        if (isValid) {
          if (step < questions.length - 1) {
            handleNext();
          } else {
            onSubmit();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [step, formData, isLoading, validateCurrentStep, handleNext, onSubmit]);

  useEffect(() => {
    // Enfocar el input de tipo number cuando cambie la pregunta
    if (questions[step].type === 'number' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  return (
    <main className='flex h-screen items-center justify-center p-4 bg-welcome-gradient'>
      <div className='relative w-4/5 md:w-3/5 lg:w-1/2 h-[90%] flex justify-center'>
        <div className='w-full h-full bg-white shadow-box rounded-lg p-14 z-10 relative flex flex-col items-center justify-center'>
          <div className='flex flex-col gap text-center'>
            <h3 className='text-md text-gray-400 font-light'>
              Te damos la bienvenida
            </h3>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>{name}</h1>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step === questions.length - 1) {
                onSubmit();
              }
            }}
            className='h-full w-full flex flex-col justify-end items-center relative'
            noValidate
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='absolute w-full top-0'
              >
                {questions[step].type === 'number' && (
                  <div className='pt-16 flex flex-col items-center h-full w-full'>
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
                        ref={inputRef} // Asignar la referencia
                        disabled={isLoading}
                        value={
                          formData[questions[step].id as keyof FormData] || ''
                        }
                        onChange={(e) =>
                          handleChange(
                            questions[step].id as keyof FormData,
                            e.target.value,
                          )
                        }
                        placeholder={questions[step].placeholder}
                        className='text-4xl w-16 text-center py-1 placeholder-slate-300 border-b-2 rounded-md border-slate-400'
                      />
                      <p className='w-1/2'>
                        {questions[step].text && questions[step].text}
                      </p>
                    </div>
                    {errors[questions[step].id] && (
                      <p className='px-1 text-xs text-red'>
                        {errors[questions[step].id]}
                      </p>
                    )}
                  </div>
                )}
                {questions[step].type === 'select' &&
                  questions[step].options && (
                    <div className='h-full flex flex-col gap-10'>
                      <p className='text-lg font-light text-center text-gray-500 mt-1'>
                        {questions[step].label}
                      </p>
                      <CardSelect
                        options={questions[step].options || []}
                        value={
                          formData[questions[step].id as keyof FormData] || ''
                        }
                        onChange={(value) =>
                          handleChange(
                            questions[step].id as keyof FormData,
                            value,
                          )
                        }
                      />
                      {errors[questions[step].id] && (
                        <p className='px-1 text-xs text-red'>
                          {errors[questions[step].id]}
                        </p>
                      )}
                    </div>
                  )}
              </motion.div>
            </AnimatePresence>

            <div className='flex justify-between items-center h-10'>
              {step > 0 && (
                <button
                  type='button'
                  onClick={handleBack}
                  disabled={isLoading}
                  className='group hover:bg-purple-900 transition-all duration-200 h-10 w-10 px-2 rounded-md  text-white flex justify-center items-center m-2'
                >
                  <img
                    src='/arrowLeft.svg'
                    alt=''
                    width={20}
                    height={20}
                    className='group-hover:invert'
                  />
                </button>
              )}
              {step < questions.length - 1 ? (
                <button
                  type='button'
                  onClick={() => handleNext()}
                  disabled={isLoading}
                  className='group hover:bg-purple-900 transition-all duration-200 h-10 w-10 px-2 rounded-md  text-white flex justify-center items-center m-2'
                >
                  <img
                    src='/arrowRight.svg'
                    alt=''
                    width={20}
                    className='group-hover:invert'
                  />
                </button>
              ) : (
                <button
                  type='button'
                  onClick={handleNext}
                  disabled={isLoading}
                  className='bg-purple-900 px-4 py-2 rounded-full text-white'
                >
                  {isLoading ? (
                    <ClipLoader size={24} color='white' />
                  ) : (
                    'Confirmar'
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
