import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';
import { FaMoneyBillWave } from 'react-icons/fa';
import { BsChevronDown } from 'react-icons/bs';
import { metodoPago } from '../../../../../../core/constants/GlobalUtilsData';

const PaymentModal = ({ isOpen, onClose, customerInfo, orderItems, orderSummary }) => {
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amountEntered, setAmountEntered] = useState('');
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAmountEntered('');
    }
  }, [isOpen]);

  const quickAmounts = [5, 10, 20, 50];
  const handleQuickAmount = (amount) => {
    setAmountEntered(prev => {
      const newAmount = parseFloat(prev || 0) + amount;
      return newAmount.toString();
    });
  };

  const handleNumberPress = (num) => {
    if (num === 'backspace') {
      setAmountEntered(prev => prev.slice(0, -1));
    } else if (num === 'decimal') {
      if (!amountEntered.includes('.')) {
        setAmountEntered(prev => prev + '.');
      }
    } else {
      setAmountEntered(prev => prev + num);
    }
  };

  const handleKeyDown = (e) => {
    if (/^\d$/.test(e.key)) {
      handleNumberPress(e.key);
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      handleNumberPress('backspace');
    } else if (e.key === '.' || e.key === ',') {
      handleNumberPress('decimal');
    }
  };

  // Enfoque al cargar para capturar teclas inmediatamente
  useState(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      variants={modalOverlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white rounded-lg w-full max-w-4xl shadow-lg overflow-hidden"
        variants={modalVariants}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Payment</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <RiCloseLine size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Customer Info</h3>
              <div className="flex items-center mb-6">
                <div className="bg-blue-400 text-white h-16 w-16 rounded-lg flex items-center justify-center text-xl font-bold">
                  {customerInfo.table}
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-lg">{customerInfo.name}</h4>
                  <p className="text-gray-600">Order #{customerInfo.orderNumber.split('-').pop()} / {customerInfo.type}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-gray-600">{customerInfo.date.split('•')[0].trim()}</p>
                  <p className="text-gray-600">{customerInfo.date.split('•')[1].trim()}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Transaction Details</h3>
                <div className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <p>{item.quantity}x</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Items ({orderSummary.itemCount})</span>
                    <span>${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span>${orderSummary.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Method & Numpad */}
            <div className="flex flex-col">
              <h3 className="text-lg font-medium mb-4">Select a payment method</h3>

              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mb-8 rounded-3xl bg-gray-50 border border-gray-100 p-2">
                {metodoPago.map((item, index) => (
                  <div key={index} className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex items-center mb-2">
                      <span className={`text-gray-600 mr-2 text-lg`}>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mb-6">
                <div
                  className="border border-gray-300 rounded-lg p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
                >
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-gray-600 mr-3" size={20} />
                    <span>{paymentMethod}</span>
                  </div>
                  <BsChevronDown className="text-gray-500" />
                </div>

                {showPaymentDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <ul>
                      <li
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setPaymentMethod('Cash');
                          setShowPaymentDropdown(false);
                        }}
                      >
                        <div className="flex items-center">
                          <FaMoneyBillWave className="text-gray-600 mr-3" size={18} />
                          <span>Cash</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center mb-6">
                <span className="text-gray-400 text-4xl">$</span>
                <span className="text-5xl font-bold">
                  {amountEntered || '0'}
                </span>
              </div>

              <div className="flex justify-between gap-2 mb-6">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleQuickAmount(amount)}
                    className="bg-green-100/25 hover:bg-green-100/35 rounded-lg py-2 px-4 text-lg text-green-800 font-medium flex-1"
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberPress(num.toString())}
                    className="bg-gray-100 hover:bg-gray-200 rounded-lg py-4 text-2xl font-medium"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => handleNumberPress('decimal')}
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg py-4 text-2xl font-medium"
                >
                  .
                </button>
                <button
                  onClick={() => handleNumberPress('0')}
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg py-4 text-2xl font-medium"
                >
                  0
                </button>
                <button
                  onClick={() => handleNumberPress('backspace')}
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg py-4 text-xl font-medium flex items-center justify-center"
                >
                  ⌫
                </button>
              </div>

              <button
                className="mt-6 bg-blue-400 hover:bg-blue-600 duration-300 text-white font-bold py-4 px-6 rounded-lg"
                onClick={() => {
                  const amountPaid = parseFloat(amountEntered) || 0;
                  if (amountPaid >= orderSummary.total) {
                    onClose();
                    // Here you would handle payment success
                  } else {
                    // Handle insufficient amount
                    alert('Please enter sufficient amount');
                  }
                }}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;