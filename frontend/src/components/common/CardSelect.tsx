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
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    optionValue: string,
  ) => {
    if (event.key === 'Enter') {
      onChange(optionValue);
    }
  };

  return (
    <div className='flex flex-col gap-4 h-3/4 items-center'>
      {options.map((option, index) => (
        <div
          tabIndex={0} // Hace que cada opción sea accesible mediante teclado
          onClick={() => onChange(option.value)}
          onKeyDown={(event) => handleKeyDown(event, option.value)} // Manejador de evento para detectar Enter
          key={index}
          className={
            value === option.value
              ? 'border-2 rounded-lg shadow-lg border-slate-100 bg-purple-900 text-white flex justify-center items-center px-2 py-2 cursor-pointer transition-all duration-300 w-1/2 min-w-fit'
              : 'border-2 rounded-lg shadow-lg  border-slate-100 flex justify-center text-black px-2 py-2 items-center cursor-pointer transition-all duration-300 w-1/2 min-w-fit'
          }
        >
          {option.icon && (
            <img
              src={'/' + option.icon}
              alt=''
              width={50}
              className={value === option.value ? 'invert' : 'opacity-70'}
            />
          )}

          <p className='text-center'>{option.label}</p>
        </div>
      ))}
    </div>
  );
};

export default CardSelect;
