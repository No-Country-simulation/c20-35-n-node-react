import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Carrusel = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      className="w-full h-full"
    >
      <SwiperSlide>
        <div className="relative h-full w-full">
          <img
            src="../src/assets/images/fitness1.jpg"
            alt="Control de Calorías"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-lg"></div>
          <div className="absolute bottom-10 left-0 right-0 text-center z-10">
            <h2 className="text-white font-bold text-2xl md:text-4xl">Control de Calorías</h2>
            <p className="text-white mt-2">Lleva un control preciso de tus calorías diarias.</p>
          </div>
        </div>
      </SwiperSlide>

      {/* ... (other SwiperSlides remain the same) ... */}
    </Swiper>
  )
}

export default Carrusel;