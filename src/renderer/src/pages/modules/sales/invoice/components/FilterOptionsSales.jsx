import React, { useState } from 'react';
import { FiGrid, FiPercent, FiDollarSign, FiCreditCard } from 'react-icons/fi';

const FilterOptionsSales = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log('Opción seleccionada:', option);
    // Aquí puedes agregar la lógica para cada opción
  };

  const options = [
    { 
      id: 'discount', 
      label: 'Descuento', 
      icon: <FiPercent className="text-blue-500 mr-1" />,
    },
    { 
      id: 'retention', 
      label: 'Retención', 
      icon: <FiCreditCard className="text-blue-500 mr-1" />,
    },
    { 
      id: 'cashWithdrawal', 
      label: 'Retiro', 
      icon: <FiDollarSign className="text-blue-500 mr-1" />,
    }
  ];

  return (
    <div className="flex items-center justify-end">
      <div className={`flex items-center mr-2 space-x-2 transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className="flex items-center px-3 py-1.5 bg-white rounded-lg shadow-sm text-sm text-gray-700 hover:bg-blue-50 border border-gray-200"
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
      <button
        onClick={toggleMenu}
        className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm transition-colors ${isOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-gray-50'}`}
      >
        <FiGrid className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FilterOptionsSales;