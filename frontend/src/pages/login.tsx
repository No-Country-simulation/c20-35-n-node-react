import React from 'react';
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Carrusel from '../components/common/Carrusel';

function Login() {
  const styles = {
    container: 'min-h-screen lg:grid lg:min-h-screen lg:grid-cols-12',
    section: 'relative hidden lg:flex h-96 items-end bg-primary bg-opacity-50 backdrop-blur-sm lg:col-span-5 lg:h-full xl:col-span-6',
    main: 'relative flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 min-h-screen',
    form_container: 'relative z-10 max-w-xl lg:max-w-5xl',
  };

  return (
    <div className="bg-primary min-h-screen">
      <div className={styles.container}>

        {/* Main with dynamic background */}
        <main
          className={`${styles.main} bg-[url('../src/assets/images/imagen2.jpg')] md:bg-primary`}
        >
          {/* Background with blur only on small devices */}
          <div className="absolute inset-0 md:hidden bg-primary bg-opacity-50 backdrop-blur-sm"></div>

          <div className={styles.form_container}>
            <img src="../src/assets/logo-white.png" alt="" className='object-cover w-36 mx-auto mb-7' />

            <div className='w-full py-4 flex justify-center gap-6'>
              <Link to='/login' className="text-lg text-text border-b-2 border-secondary">Iniciar sesión</Link>
              <Link to='/register' className="text-lg text-gray-600 hover:border-b-2 border-secondary">Crear cuenta</Link>
            </div>
            <form action="#" className="mt-2 grid grid-cols-6 gap-6">
              <div className="relative col-span-6">
                <AtSymbolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email"
                  id="Email"
                  name="email"
                  className="pl-10 pr-4 py-3 mt-1 w-full rounded-md border-gray-200 text-sm text-text shadow-sm bg-card-muted"
                />
              </div>

              <div className="relative col-span-6">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  className="pl-10 pr-4 py-3 mt-1 w-full rounded-md border-gray-200 text-sm text-text shadow-sm bg-card-muted"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="RememberMe" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="RememberMe"
                    name="remember_me"
                    className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />
                  <span className="text-sm text-text">Recordar sesión</span>
                </label>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-text transition hover:bg-transparent hover:text-blue-600">
                  Iniciar sesión
                </button>
              </div>

              <div className="col-span-6">
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  ¿No tienes una cuenta?
                  <Link to="/register" className="text-secondary underline ml-2">Regístrate</Link>.
                </p>
              </div>
            </form>
          </div>
        </main>

        {/* Section visible only on large devices, now on the right */}
        <section className={styles.section}>
          <Carrusel />
        </section>
      </div>
    </div>
  );
}



export default Login;