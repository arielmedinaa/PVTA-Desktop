import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RiAddLine, RiDeleteBinLine, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const PriceCarousel = ({ prices, setPrices, maxPrices = 5, disabled = false }) => {
  const [currentPriceIndex, setCurrentPriceIndex] = useState(0);
  const carouselRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const nextPrice = () => {
    if (currentPriceIndex < prices.length - 1) {
      setCurrentPriceIndex(currentPriceIndex + 1);
    }
  };

  const prevPrice = () => {
    if (currentPriceIndex > 0) {
      setCurrentPriceIndex(currentPriceIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    if (disabled) return;
    setStartX(e.touches[0].clientX);
  };

  const handleMouseDown = (e) => {
    if (disabled) return;
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (startX === null || disabled) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPriceIndex < prices.length - 1) {
        nextPrice();
      } else if (diff < 0 && currentPriceIndex > 0) {
        prevPrice();
      }
      setStartX(null);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || startX === null || disabled) return;

    const currentX = e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPriceIndex < prices.length - 1) {
        nextPrice();
      } else if (diff < 0 && currentPriceIndex > 0) {
        prevPrice();
      }
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartX(null);
  };

  useEffect(() => {
    if (currentPriceIndex >= prices.length && prices.length > 0) {
      setCurrentPriceIndex(prices.length - 1);
    }
  }, [prices.length, currentPriceIndex]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, startX, currentPriceIndex, prices.length]);

  const addPriceItem = () => {
    if (disabled) return;
    const newPrices = [...prices, {
      tipoPrecio: '',
      precio: '',
      iva: 10,
      moneda: 'PYG',
      linea: prices.length + 1,
      activo: false
    }];
    setPrices(newPrices);
    setCurrentPriceIndex(newPrices.length - 1);
  };

  const removePriceItem = (index) => {
    if (disabled) return;
    const newPrices = [...prices];
    newPrices.splice(index, 1);
    const reindexedPrices = newPrices.map((price, idx) => ({
      ...price,
      linea: idx + 1
    }));

    setPrices(reindexedPrices);
    if (currentPriceIndex >= reindexedPrices.length && reindexedPrices.length > 0) {
      setCurrentPriceIndex(reindexedPrices.length - 1);
    }
  };

  const updatePriceItem = (index, field, value) => {
    if (disabled) return;
    const newPrices = [...prices];
    newPrices[index] = {
      ...newPrices[index],
      [field]: value
    };
    setPrices(newPrices);
  };

  const formatPriceInput = (value) => {
    // Permitir solo números y punto decimal
    const cleaned = value.replace(/[^\d.]/g, '');

    // Asegurar solo un punto decimal
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }

    return cleaned;
  };

  return (
    <div className='bg-white rounded-2xl shadow-md p-4'>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Lista de Precios</h3>
        <div className="text-sm text-gray-500">
          {currentPriceIndex + 1}/{prices.length} (max {maxPrices})
        </div>
      </div>

      <div className="flex justify-between items-center mb-2 rounded-2xl">
        <button
          type="button"
          onClick={prevPrice}
          disabled={currentPriceIndex === 0 || disabled}
          className={`p-2 rounded-full ${currentPriceIndex === 0 || disabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          <RiArrowLeftSLine className="w-6 h-6" />
        </button>

        <div className="flex space-x-1">
          {prices.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => !disabled && setCurrentPriceIndex(index)}
              className={`w-2 h-2 rounded-full ${currentPriceIndex === index ? 'bg-slate-800' : 'bg-gray-300'
                } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={`Go to price ${index + 1}`}
              disabled={disabled}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextPrice}
          disabled={currentPriceIndex === prices.length - 1 || disabled}
          className={`p-2 rounded-full ${currentPriceIndex === prices.length - 1 || disabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          <RiArrowRightSLine className="w-6 h-6" />
        </button>
      </div>

      <div
        ref={carouselRef}
        className="relative w-full h-64 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        style={{ cursor: disabled ? 'default' : (isDragging ? 'grabbing' : 'grab') }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{ x: `-${currentPriceIndex * 100}%` }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
        >
          {prices.map((price, index) => (
            <div
              key={index}
              className="absolute w-full h-full px-4"
              style={{ left: `${index * 100}%` }}
            >
              <div className="border border-gray-200 rounded-md p-4 bg-white h-full">
                <div className="flex justify-between mb-3">
                  <h4 className="font-medium">Precio {index + 1}</h4>
                  {prices.length > 1 && !disabled && (
                    <button
                      type="button"
                      onClick={() => removePriceItem(index)}
                      className="text-red-500 hover:text-red-700"
                      title="Eliminar precio"
                    >
                      <RiDeleteBinLine className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Tipo de Precio <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-2xl"
                      value={price.tipoPrecio}
                      onChange={(e) => updatePriceItem(index, 'tipoPrecio', e.target.value)}
                      disabled={disabled}
                    >
                      <option value="Todos">Todos</option>
                      <option value="Mayorista">Mayorista</option>
                      <option value="Minorista">Minorista</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Monto <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      className="w-full p-2 border border-gray-300 rounded-2xl"
                      placeholder="0.00"
                      value={price.precio}
                      onChange={(e) => {
                        const formatted = formatPriceInput(e.target.value);
                        updatePriceItem(index, 'precio', formatted);
                      }}
                      disabled={disabled}
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      IVA (%)
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-2xl"
                      value={price.iva}
                      onChange={(e) => updatePriceItem(index, 'iva', Number(e.target.value))}
                      disabled={disabled}
                    >
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                      <option value="21">21%</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Moneda
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none"
                      value={price.moneda}
                      onChange={(e) => updatePriceItem(index, 'moneda', e.target.value)}
                      disabled={disabled}
                    >
                      <option value="PYG">PYG - Guaraní</option>
                      <option value="USD">USD - Dólar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="ARS">ARS - Peso Argentino</option>
                      <option value="BRL">BRL - Real</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Línea: {price.linea}</span>
                    <span className={`px-2 py-1 rounded-full ${price.activo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                      {price.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  {price.precio && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Total con IVA:</span>{' '}
                      {(parseFloat(price.precio) * (1 + price.iva / 100)).toFixed(2)} {price.moneda}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {prices.length < maxPrices && !disabled && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={addPriceItem}
            className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <RiAddLine className="w-5 h-5 mr-1" />
            Agregar otro precio
          </button>
        </div>
      )}

      {prices.length >= maxPrices && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Límite máximo de precios alcanzado ({maxPrices})
        </div>
      )}
    </div>
  );
};

export default PriceCarousel;