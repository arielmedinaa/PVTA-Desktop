// PriceCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RiAddLine, RiDeleteBinLine, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const PriceCarousel = ({ prices, setPrices, maxPrices = 5 }) => {
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
    setStartX(e.touches[0].clientX);
  };
  
  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e) => {
    if (startX === null) return;
    
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
    if (!isDragging || startX === null) return;
    
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
    const newPrices = [...prices, { name: '', amount: '', tax: 21 }];
    setPrices(newPrices);
    setCurrentPriceIndex(newPrices.length - 1);
  };

  const removePriceItem = (index) => {
    const newPrices = [...prices];
    newPrices.splice(index, 1);
    setPrices(newPrices);
  };

  const updatePriceItem = (index, field, value) => {
    const newPrices = [...prices];
    newPrices[index][field] = value;
    setPrices(newPrices);
  };

  return (
    <div className='bg-white rounded-xl shadow-md p-4'>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Price List</h3>
        <div className="text-sm text-gray-500">
          {currentPriceIndex + 1}/{prices.length} (max {maxPrices})
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <button 
          type="button"
          onClick={prevPrice}
          disabled={currentPriceIndex === 0}
          className={`p-2 rounded-full ${
            currentPriceIndex === 0 
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
              onClick={() => setCurrentPriceIndex(index)}
              className={`w-2 h-2 rounded-full ${
                currentPriceIndex === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to price ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          type="button"
          onClick={nextPrice}
          disabled={currentPriceIndex === prices.length - 1}
          className={`p-2 rounded-full ${
            currentPriceIndex === prices.length - 1 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <RiArrowRightSLine className="w-6 h-6" />
        </button>
      </div>

      <div 
        ref={carouselRef} 
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <motion.div
          className="w-full"
          animate={{ x: `-${currentPriceIndex * 100}%` }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
          style={{ 
            display: 'flex',
            width: `${prices.length * 100}%`
          }}
        >
          {prices.map((price, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4 flex-shrink-0" style={{ width: '100%' }}>
              <div className="flex justify-between mb-3">
                <h4 className="font-medium">Price {index + 1}</h4>
                {prices.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => removePriceItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBinLine className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm">Price Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Retail Price"
                    value={price.name}
                    onChange={(e) => updatePriceItem(index, 'name', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="0.00"
                    value={price.amount}
                    onChange={(e) => updatePriceItem(index, 'amount', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm">Tax Rate (%)</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={price.tax}
                    onChange={(e) => updatePriceItem(index, 'tax', Number(e.target.value))}
                  >
                    <option value="0">0%</option>
                    <option value="4">4%</option>
                    <option value="10">10%</option>
                    <option value="21">21%</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {prices.length < maxPrices && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={addPriceItem}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <RiAddLine className="w-5 h-5 mr-1" />
            Add another price
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceCarousel;