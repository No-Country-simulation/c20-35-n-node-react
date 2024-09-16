import {
  UserIcon,
  AtSymbolIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import Carrusel from '../components/common/Carrusel';
import ErrorMessage from '../components/common/ErrorMessage';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
}

function Register() {
  const styles = {
    container: 'min-h-screen lg:grid lg:min-h-screen lg:grid-cols-12',
    section:
      'relative hidden lg:flex h-96 items-end bg-primary bg-opacity-50 backdrop-blur-sm lg:col-span-5 lg:h-full xl:col-span-6',
    section_img: 'absolute inset-0 h-full w-full object-cover brightness-200',
    section_div:
      'h-full relative flex flex-col justify-center items-center p-12',
    h2: 'flex gap-2 mt-6 font-bold text-text sm:text-3xl md:text-6xl',
    main: 'relative flex items-center justify-center backdrop-filter backdrop-blur-sm px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 min-h-screen',
    form_container: 'relative z-10 max-w-xl lg:max-w-4xl',
    input_container: 'relative col-span-6 sm:col-span-3',
    input_icon:
      'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none', // fixed
    hide_icon:
      'absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer hover:text-text', // fixed
    input_field:
      'pl-10 pr-4 py-3 mt-1 w-full rounded-md border-gray-200 text-sm text-text shadow-sm bg-card-muted',
    submit_button:
      'col-span-6 w-full inline-block rounded-md border border-blue-600 px-12 py-3 text-sm font-medium text-text transition-all hover:bg-gradient-to-r from-secondary to-blue/20 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary',
    submit_button_loading:
      'col-span-6 w-full inline-block rounded-md border border-blue-600 px-12 py-3 text-sm font-medium text-text transition-all bg-gradient-to-r from-secondary to-blue/20 shadow-md shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary',
    checkbox_container: 'col-span-6 sm:flex sm:items-center sm:gap-4',
    remember_password: 'h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm',
    error_icon: 'w-5 h-5 text-red',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const password = watch('password');

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:3000/api/v1/auth/register',
        {
          name: `${data.firstname} ${data.lastname}`,
          email: data.email,
          password: data.password,
        },
        { withCredentials: true },
      );

      try {
        const login = await axios.post(
          'http://localhost:3000/api/v1/auth/login',
          {
            email: data.email,
            password: data.password,
          },
        );

        const authCookie = Cookies.set('auth', login.data.token);
        console.log(authCookie);
      } catch (error) {
        if (isAxiosError(error)) {
          setError('root', {
            type: 'manual',
            message: 'Hubo en error en el servidor, intenta de nuevo',
          });
        } else {
          setError('root', {
            type: 'manual',
            message: 'Hubo en error en el cliente, intenta de nuevo',
          });
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const errorData = error.response?.data;

        if (status === 400 && errorData?.message === 'User already exists') {
          setError('email', {
            type: 'manual',
            message: 'Este correo electrónico ya está registrado',
          });
        } else {
          setError('root', { type: 'manual', message: status?.toString() });
        }
      } else {
        setError('root', {
          type: 'manual',
          message:
            'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.',
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='bg-primary min-h-screen'>
      <div className={styles.container}>
        {/* Sección visible solo en dispositivos grandes */}
        <section className={styles.section}>
          <Carrusel />
        </section>

        {/* Main con fondo dinámico */}
        <main
          className={`${styles.main} bg-[url('../src/assets/images/imagen2.jpg')] backdrop-filter backdrop-blur-sm`}
        >
          <div className='absolute inset-0 md:hidden bg-primary bg-opacity-50 backdrop-filter backdrop-blur-sm'></div>

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
              <Link
                to='/register'
                className='text-lg text-text border-b-2 border-secondary'
              >
                Crear cuenta
              </Link>
              <Link
                to='/login'
                className='text-lg text-gray-600 hover:border-b-2 border-secondary'
              >
                Iniciar sesión
              </Link>
            </div>

            <form
              action='#'
              className='mt-2 grid grid-cols-6 gap-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.input_container}>
                <div className='relative'>
                  <UserIcon className={styles.input_icon} />
                  <input
                    type='text'
                    id='FirstName'
                    placeholder='Nombres'
                    className={styles.input_field}
                    {...register('firstname', {
                      required: 'El nombre es requerido',
                    })}
                  />
                </div>

                <ErrorMessage
                  message={errors.firstname?.message?.toString()}
                  type='field'
                />
              </div>

              <div className={styles.input_container}>
                <input
                  type='text'
                  placeholder='Apellidos'
                  id='LastName'
                  className={styles.input_field}
                  {...register('lastname')}
                />
              </div>

              <div className='relative col-span-6'>
                <div className='relative'>
                  <AtSymbolIcon className={styles.input_icon} />
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
                </div>
                <ErrorMessage
                  message={errors.email?.message?.toString()}
                  type='field'
                />
              </div>

              <div className={styles.input_container}>
                <div className='relative'>
                  <LockClosedIcon className={styles.input_icon} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Contraseña'
                    id='password'
                    className={styles.input_field}
                    {...register('password', {
                      required: 'La contraseña es requerida',
                      minLength: {
                        value: 6,
                        message:
                          'La contraseña debe tener al menos 6 caracteres',
                      },
                    })}
                  />
                  {showPassword ? (
                    <EyeSlashIcon
                      onClick={togglePasswordVisibility}
                      className={styles.hide_icon}
                    />
                  ) : (
                    <EyeIcon
                      onClick={togglePasswordVisibility}
                      className={styles.hide_icon}
                    />
                  )}
                </div>
                <ErrorMessage
                  message={errors.password?.message?.toString()}
                  type='field'
                />
              </div>

              <div className={styles.input_container}>
                <div className='relative'>
                  <LockClosedIcon className={styles.input_icon} />
                  <input
                    type='password'
                    placeholder='Confirmar contraseña'
                    className={styles.input_field}
                    {...register('password_confirmation', {
                      validate: (value) =>
                        value === password || 'Las contraseñas no coinciden',
                    })}
                  />
                </div>
                <ErrorMessage
                  message={errors.password_confirmation?.message?.toString()}
                  type='field'
                />
              </div>

              <div className='col-span-6'>
                <label htmlFor='MarketingAccept' className='flex gap-4'>
                  <input
                    type='checkbox'
                    id='MarketingAccept'
                    className={styles.remember_password}
                  />
                  <span className='text-sm text-text'>Recordar contraseña</span>
                </label>
              </div>

              <ErrorMessage
                message={errors.root?.message?.toString()}
                type='form'
              />

              <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
                <motion.button
                  className={
                    Loading
                      ? styles.submit_button_loading
                      : styles.submit_button
                  }
                  type='submit'
                >
                  {Loading ? (
                    <ClipLoader color='white' size={15} />
                  ) : (
                    'Crear cuenta'
                  )}
                </motion.button>
              </div>

              <div className='col-span-6'>
                <p className='mt-4 text-sm text-gray-500 sm:mt-0'>
                  ¿Ya tienes una cuenta?
                  <a href='#' className='text-secondary underline ml-2'>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;
