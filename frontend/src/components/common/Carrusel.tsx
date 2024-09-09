import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const Carrusel = () => {
  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
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
            <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 text-center z-10">
              <h2 className="text-white font-bold text-2xl md:text-4xl">Control de Calorías</h2>
              <p className="text-white mt-2 font-extralight">Lleva un control preciso de tus calorías diarias.</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="../src/assets/images/fitness1.jpg"
              alt="Control de Calorías"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-lg"></div>
            <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 text-center z-10">
              <h2 className="text-white font-bold text-2xl md:text-4xl">Control de Calorías</h2>
              <p className="text-white mt-2 font-extralight">Lleva un control preciso de tus calorías diarias.</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="../src/assets/images/imagen2.jpg"
              alt="Control de Calorías"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-lg"></div>
            <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 text-center z-10">
              <h2 className="text-white font-bold text-2xl md:text-4xl">Control de Calorías</h2>
              <p className="text-white mt-2 font-extralight">Lleva un control preciso de tus calorías diarias.</p>
            </div>
          </div>
        </SwiperSlide>
        
        <div className="absolute inset-y-0 left-0 z-10 flex items-center">
          <button className="swiper-button-prev bg-opacity-30 hover:bg-opacity-50 transition-opacity duration-300 rounded-full p-2 ml-4 focus:outline-none">
            <ChevronLeftIcon className="h-1 w-1 text-gray-600" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 z-10 flex items-center">
          <button className="swiper-button-next bg-opacity-30 hover:bg-opacity-50 transition-opacity duration-300 rounded-full p-2 mr-4 focus:outline-none">
            <ChevronRightIcon className="h-1 w-1 text-gray-600" />
          </button>
        </div>
        {/* Agrega más SwiperSlides aquí para más imágenes */}
      </Swiper>

      {/* Botones de navegación personalizados */}
      
    </div>
  );
}

export default Carrusel;