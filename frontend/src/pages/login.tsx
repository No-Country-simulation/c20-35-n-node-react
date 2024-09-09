import React from 'react';
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Carrusel from '../components/common/Carrusel';

function Login() {
  const styles = {
    container: 'min-h-screen lg:grid lg:min-h-screen lg:grid-cols-12',
    section: 'relative hidden lg:flex h-96 items-end bg-primary bg-opacity-50 backdrop-blur-sm lg:col-span-5 lg:h-full xl:col-span-6',
    main: 'relative flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 min-h-screen',
    form_container: 'relative z-10 max-w-xl md:max-w-5xl',
    input: 'pl-10 pr-4 py-3 mt-1 w-full rounded-md border-gray-200 text-sm text-text shadow-sm bg-card-muted focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200',
    error: 'text-red-500 text-xs mt-1',
    button: 'inline-block rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-text transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  };

  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Simulando respuesta exitosa:
      const response = { success: Math.random() > 0.5 };

      if (response.success) {
        navigate('/dashboard');
      } else {
        setError('auth', { type: 'manual', message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('auth', { type: 'manual', message: 'Error al iniciar sesión. Intente nuevamente.' });
    }
  };

  return (
    <div className="bg-primary min-h-screen">
      <div className={styles.container}>
        <main className={`${styles.main} bg-[url('../src/assets/images/imagen2.jpg')] md:bg-primary`}>
          <div className="absolute inset-0 md:hidden bg-primary bg-opacity-50 backdrop-blur-sm"></div>

          <div className={styles.form_container}>
            <motion.img
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src="../src/assets/logo-white.png"
              alt=""
              className='object-cover w-36 mx-auto mb-7'
            />

            <div className='w-full py-4 flex justify-center gap-6'>
              <Link to='/login' className="text-lg text-text border-b-2 border-secondary">Iniciar sesión</Link>
              <Link to='/register' className="text-lg text-gray-600 hover:border-b-2 border-secondary transition duration-200">Crear cuenta</Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-2 grid grid-cols-6 gap-6">
              <div className="relative col-span-6">
                <AtSymbolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email"
                  id="Email"
                  className={styles.input}
                  {...register('email', {
                    required: 'El email es obligatorio',
                    pattern: { value: /^\S+@\S+$/i, message: 'El formato de email no es válido' }
                  })}
                />
                {errors.email && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.error}>{errors.email.message}</motion.p>}
              </div>

              <div className="relative col-span-6">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  id="password"
                  className={styles.input}
                  {...register('password', { required: 'La contraseña es obligatoria' })}
                />
                {errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.error}>{errors.password.message}</motion.p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="RememberMe" className="flex gap-4 items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="RememberMe"
                    className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                    {...register('remember_me')}
                  />
                  <span className="text-sm text-text">Recordar sesión</span>
                </label>
              </div>

              {errors.auth && (
                <div className="col-span-6">
                  <Alert variant="destructive">
                    <AlertDescription>{errors.auth.message}</AlertDescription>
                  </Alert>
                </div>
              )}

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.button}
                  type="submit"
                >
                  Iniciar sesión
                </motion.button>
              </div>

              <div className="col-span-6">
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  ¿No tienes una cuenta?
                  <Link to="/register" className="text-secondary underline ml-2 hover:text-blue-700 transition duration-200">Regístrate</Link>.
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

export default Login;