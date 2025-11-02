import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const CreditDetailsModal = ({ onBack, onConfirm }) => {
  const [installments, setInstallments] = useState(1);
  const [firstDueDate, setFirstDueDate] = useState('');

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFirstDueDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg w-full max-w-md shadow-lg overflow-hidden"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
      >
        <div className="p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 mr-4"
            >
              <FaArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold">Detalles de Crédito</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Cuotas
              </label>
              <input
                type="number"
                min="1"
                value={installments}
                onChange={(e) => setInstallments(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Primer Vencimiento
              </label>
              <input
                type="date"
                value={firstDueDate}
                onChange={(e) => setFirstDueDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Volver
            </button>
            <button
              onClick={() => onConfirm({ installments, firstDueDate })}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirmar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreditDetailsModal;
