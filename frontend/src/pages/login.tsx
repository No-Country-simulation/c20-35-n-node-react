import {
  AtSymbolIcon,
  LockClosedIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import Carrusel from '../components/common/Carrusel';
import axios from 'axios';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '../context/AuthContext';
import Cookie from 'js-cookie';

interface FormValues {
  email: string;
  password: string;
  remember_me: boolean;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Contexto de autenticación

  const onSubmit: SubmitHandler<FormValues> = async (data: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      console.log(data);
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true },
      );

      if (response.status === 201) {
        Cookie.set('token', response.data.token);
        // Este delay se realiza para que el cambio de pantalla no sea tan brusco
        login(response.data.token);


        setTimeout(() => {}, 1000);
        navigate('/dashboard');
      }
    } catch (error) {
      //Manejamos los posibles errores
      if (axios.isAxiosError(error) && error.status === 401) {
        setError('root', {
          type: 'manual',
          message: 'Credenciales incorrectas',
        });
      } else {
        setError('root', {
          type: 'manual',
          message: 'Error al iniciar sesión. Intente nuevamente.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-primary min-h-screen'>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className='absolute inset-0 md:hidden bg-primary bg-opacity-50 backdrop-blur-sm'></div>

          <div className={styles.form_container}>
            <motion.img
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src='../src/assets/logo-white.png'
              alt=''
              className='object-cover w-36 mx-auto mb-7'
            />

            <div className='w-full py-4 flex justify-center gap-6'>
              <Link to='/login' className={styles.link}>
                Iniciar sesión
              </Link>
              <Link to='/register' className={styles.linkInactive}>
                Crear cuenta
              </Link>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-2 grid grid-cols-6 gap-6 w-80'
            >
              <div className='relative col-span-6'>
                <AtSymbolIcon className={styles.icon} />
                <input
                  type='email'
                  placeholder='Email'
                  id='Email'
                  className={styles.input_field}
                  {...register('email', {
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'El formato de email no es válido',
                    },
                  })}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.error}
                  >
                    {errors.email.message?.toString()}
                  </motion.p>
                )}
              </div>

              <div className='relative col-span-6'>
                <LockClosedIcon className={styles.icon} />
                <input
                  type='password'
                  placeholder='Contraseña'
                  id='password'
                  className={styles.input_field}
                  {...register('password')}
                />
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.error}
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              <div className='col-span-6'>
                <label htmlFor='RememberMe' className={styles.formLabel}>
                  <input
                    type='checkbox'
                    id='RememberMe'
                    className={styles.checkbox}
                    {...register('remember_me')}
                  />
                  <span className='text-sm text-text'>Recordar sesión</span>
                </label>
              </div>

              {errors.root && (
                <div className={styles.errorContainer}>
                  <InformationCircleIcon className={styles.errorIcon} />
                  <p className='text-xs'>{errors.root.message?.toString()}</p>
                </div>
              )}

              <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
                <motion.button
                  className={
                    loading
                      ? styles.submit_button_loading
                      : styles.submit_button
                  }
                  type='submit'
                >
                  {loading ? (
                    <ClipLoader color='white' size={15} />
                  ) : (
                    'Iniciar sesión'
                  )}
                </motion.button>
              </div>

              <div className='col-span-6'>
                <p className={styles.noAccountText}>
                  ¿No tienes una cuenta?
                  <Link to='/register' className={styles.registerLink}>
                    Regístrate
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>

        <section className={styles.section}>
          <Carrusel />
        </section>
      </div>
    </div>
  );
}

const styles = {
  container: 'min-h-screen lg:grid lg:min-h-screen lg:grid-cols-12',
  section:
    'relative hidden lg:flex h-96 items-end bg-primary bg-opacity-50 backdrop-blur-sm lg:col-span-5 lg:h-full xl:col-span-6',
  main: 'relative flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 min-h-screen',
  form_container: 'relative z-10 max-w-xl md:max-w-5xl',
  input_field:
    'pl-10 pr-4 py-3 mt-1 w-full rounded-md border-gray-200 text-sm text-text shadow-sm bg-card-muted',
  error: 'text-red text-xs mt-1',
  submit_button:
    'col-span-6 w-full inline-block rounded-md border border-blue-600 px-12 py-3 text-sm font-medium text-text transition-all hover:bg-gradient-to-r from-secondary to-blue/20 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary',
  submit_button_loading:
    'col-span-6 w-full inline-block rounded-md border border-blue-600 px-12 py-3 text-sm font-medium text-text transition-all bg-gradient-to-r from-secondary to-blue/20 shadow-md shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary',
  icon: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5',
  checkbox:
    'h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500',
  errorContainer:
    'col-span-6 flex w-full rounded-lg bg-red/35 px-4 py-3 text-text/50 font-light items-center gap-2',
  errorIcon: 'h-5 w-5',
  link: 'text-lg text-text border-b-2 border-secondary',
  linkInactive:
    'text-lg text-gray-600 hover:border-b-2 border-secondary transition duration-200',
  registerLink:
    'text-secondary underline ml-2 hover:text-blue-700 transition duration-200',
  formLabel: 'flex gap-4 items-center cursor-pointer',
  noAccountText: 'mt-4 text-sm text-gray-500 sm:mt-0',
};

export default Login;
