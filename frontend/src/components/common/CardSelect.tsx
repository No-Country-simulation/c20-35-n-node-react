import React from 'react';
import { Option } from '../../types/types'; // Ajusta la ruta según tu estructura

interface CardSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const CardSelect: React.FC<CardSelectProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className='flex flex-col md:flex-row gap-4 h-3/4 justify-center'>
      {options.map((option, index) => (
        <div
          onClick={() => onChange(option.value)}
          key={index}
          className={
            value === option.value
              ? 'border-2 rounded-lg shadow-lg w-40 border-slate-100 bg-purple-900 text-white flex flex-col justify-around items-center px-2 py-2 cursor-pointer transition-all duration-300'
              : 'border-2 rounded-lg shadow-lg w-40 border-slate-100 flex flex-col justify-around text-black px-2 py-2 items-center cursor-pointer transition-all duration-300'
          }
        >
          <img
            src={'/' + option.icon}
            alt=''
            width={100}
            className={value === option.value ? 'invert' : 'opacity-70'}
          />
          <p className='text-center'>{option.label}</p>
        </div>
      ))}
    </div>
  );
};

export default CardSelect;
