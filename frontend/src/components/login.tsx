import Google from '../assets/icons/google.svg'
import Facebook from '../assets/icons/facebook.svg'

function Login() {
  const styles = {
    container: 'bg-primary relative min-h-screen flex justify-center gap-[40px] items-center px-[15px] md:px-[40px] lg:px-[60px] xl:px-[120px]',
    card: 'min-w-[380px] z-10 bg-primary/40 py-12 px-8 drop-shadow-md rounded-2xl text-text border-[1px] border-bordes backdrop-blur-md bg-gradient-r from-[#BFBFBF] via-[#595959] via-[50%] to-[#000000]',
    inputs: 'border border-slate-100'
  }

  return (
    <div className={styles.container}>
      <div className='hidden md:flex justify-start w-full'>
        <h1 className='text-text text-[36px]'>Bienvenido a la plataforma fitness</h1>
      </div>
      <div className={styles.card}>
        <h2 className='text-text text-2xl font-medium'>Iniciar Sesión</h2>
        <p className='font-extralight text-sm'>Gracias por volver</p>
        
        <form className='flex flex-col gap-4 w-full mt-4'>
          <input className='w-full p-2 text-md bg-primary/0 border-[1px] border-bordes font-light rounded-lg' type="text" placeholder='Nombre' />
          <input className='w-full p-2 text-md bg-primary/0 border-[1px] border-bordes font-light rounded-lg' type="password" placeholder='Contraseña'/>
          <div className='flex items-center pl-3'>
            <input className='mr-2' type="checkbox" />
            <span className='text-text font-extralight text-sm'>Recuérdame</span>
          </div>

          <button className='bg-primary text-white p-2 rounded-lg mt-4 bg-gradient-to-r from-[#628EFF] via-[#8740CD] to-[#580475]'>Iniciar Sesión</button>
          <a className='decoration-none mx-auto text-sm font-extralight text-[#628EFF]/'>¿Olvidaste la constraseña?</a>

          <div className='flex items-center text-text font-extralight '>
            <hr className="w-full"/>
            <span className='ml-3 mr-3'>o</span>
            <hr className="w-full"/>
          </div>

          <div className='mx-auto flex gap-4'>
            <img src={Google} className='w-8 h-8'/>
            <img src={Facebook} className='w-8 h-8'/>
          </div>
        </form>

        <div className='w-full h-[1px] bg-slate-200 mt-5'></div>
      </div>
      <div className='absolute -z-0 top-[60px] right-[65%] md:right-[350px] xl:right-[400px] w-[162px] h-[162px] md:w-[182px] md:h-[182px]  rounded-full bg-gradient-to-r from-[#530061] to-[#0D0A30]'></div>
      <div className='absolute -z-0 bottom-[-20px] right-[25%] md:right-[50px] xl:right-[10px] w-[162px] h-[162px] md:w-[182px] md:h-[182px] rounded-full bg-gradient-to-r from-[#530061] to-[#0D0A30]'></div>

    </div>
  )
}

export default Login