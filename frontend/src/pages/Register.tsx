/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserIcon, AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Carrusel from '../components/common/Carrusel'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

function Register() {
  const styles = {
    container: 'min-h-screen lg:grid lg:min-h-screen lg:grid-cols-12',
    section: 'relative hidden lg:flex h-96 items-end bg-primary bg-opacity-50 backdrop-blur-sm lg:col-span-5 lg:h-full xl:col-span-6',
    section_img: 'absolute inset-0 h-full w-full object-cover brightness-200',
    section_div: 'h-full relative flex flex-col justify-center items-center p-12',
    h2: 'flex gap-2 mt-6 font-bold text-text sm:text-3xl md:text-6xl',
    main: 'relative flex items-center justify-center backdrop-filter backdrop-blur-sm px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 min-h-screen',
    form_container: 'relative z-10 max-w-xl lg:max-w-4xl',
    input_container: 'relative col-span-6 sm:col-span-3',
    input_icon: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5',
    input_field: 'pl-10 pr-4 py-3 mt-1 w-full rounded-md border-gray-200 text-sm text-text shadow-sm bg-card-muted',
    submit_button: 'inline-block rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-text transition hover:bg-transparent hover:text-blue-600',
    checkbox_container: 'col-span-6 sm:flex sm:items-center sm:gap-4',
    remember_password: 'h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm',
  }

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data: unknown) => {
    console.log(data)
  }  

  return (
    <div className="bg-primary min-h-screen">
      <div className={styles.container}>
        {/* Sección visible solo en dispositivos grandes */}
        <section className={styles.section}>
          <Carrusel />
        </section>

        {/* Main con fondo dinámico */}
        <main
          className={`${styles.main} bg-[url('../src/assets/images/imagen2.jpg')] backdrop-filter backdrop-blur-sm`} // Cambia el fondo a partir de `md`
        >
          {/* Fondo con blur solo en dispositivos pequeños */}
          <div className="absolute inset-0 md:hidden bg-primary bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>

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
              <Link to='/register' className="text-lg text-text border-b-2 border-secondary">Crear cuenta</Link>
              <Link to='/login' className="text-lg text-gray-600 hover:border-b-2 border-secondary">Iniciar sesión</Link>
            </div>

            <form action="#" className="mt-2 grid grid-cols-6 gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.input_container}>
                <UserIcon className={styles.input_icon} />
                <input
                  type="text"
                  id="FirstName"
                  placeholder="Nombres"
                  className={styles.input_field}
                  {...register('firstname', { required: true })}
                />
                {errors.firstname && <span className='text-red'>El campo es requerido</span>}
              </div>

              <div className={styles.input_container}>
                <input
                  type="text"
                  placeholder="Apellidos"
                  id="LastName"
                  className="px-4 py-3 mt-1 w-full rounded-md border-gray-200 text-sm text-text shadow-sm bg-card-muted"
                  {...register('lastname')}
                />
              </div>

              <div className="relative col-span-6">
                <AtSymbolIcon className={styles.input_icon} />
                <input
                  type="email"
                  placeholder="Email"
                  id="Email"
                  className={styles.input_field}
                  {...register('email', {
                    required: "El email es obligatorio",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "El formato de email no es válido",
                    },
                  })}
                />
                {errors.email && <span className="text-red">{errors.email.message?.toString()}</span>}
              </div>

              <div className={styles.input_container}>
                <LockClosedIcon className={styles.input_icon} />
                <input
                  type="password"
                  placeholder="Contraseña"
                  id="password"
                  className={styles.input_field}
                  {...register('password', { required: true })}
                />
                {errors.password && <span className="text-red">{errors.password.message?.toString()}</span>}
              </div>

              <div className={styles.input_container}>
                <LockClosedIcon className={styles.input_icon} />
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  id="PasswordConfirmation"
                  className={styles.input_field}
                  {...register('password_confirmation', { required: "La confirmación es requerida" })}
                />
                {errors.password_confirmation && <span className='text-red'>{errors.password_confirmation.message?.toString()}</span>}
              </div>  {/* Cierre del div agregado aquí */}

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    className={styles.remember_password}
                  />
                  <span className="text-sm text-text">Recordar contraseña</span>
                </label>
              </div>

              <div className={styles.checkbox_container}>
                <button className={styles.submit_button} type="submit">
                  Crear cuenta
                </button>
              </div>

              <div className="col-span-6">
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  ¿Ya tienes una cuenta?
                  <a href="#" className="text-secondary underline ml-2">Login</a>.
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
