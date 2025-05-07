import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiArrowLeftSLine } from 'react-icons/ri';
import CartItem from './CartItem';
import PaymentModal from './modals/PaymentModal'

const OrderSidebar = ({ cartItems, orderSummary, onUpdateNote }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const sidebarVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    }
  };

  const customerInfo = {
    name: "Ariel Hikmat",
    orderNumber: "001-001-0000456",
    type: "Dine In",
    date: "Wed, July 12, 2023 • 06:12 PM",
    table: "A4"
  };

  const orderItems = cartItems.map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity
  }));

  return (
    <>

      <motion.div
        className="w-1/3 p-4 overflow-y-auto"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white rounded-xl p-6 shadow-sm h-full flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold">{customerInfo.name}</h2>
              <p className="text-gray-500 text-sm">Order {customerInfo.orderNumber} / {customerInfo.type}</p>
              <p className="text-gray-500 text-sm">{customerInfo.date}</p>
            </div>
            <button className="bg-blue-500 text-white h-10 w-10 rounded-md flex items-center justify-center">
              {customerInfo.table}
            </button>
          </div>

          <h3 className="text-lg font-semibold mb-4">Detalle de Orden</h3>
          <div className="flex-grow overflow-y-auto mb-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateNote={onUpdateNote}
              />
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Items ({orderSummary.itemCount})</span>
              <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">I.V.A (5%)</span>
              <span className="font-medium">${orderSummary.tax.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full py-3 bg-blue-400 hover:bg-blue-500 text-blue-100 rounded-lg font-semibold flex items-center justify-between" onClick={() => setIsPaymentModalOpen(true)}>
            <span className="ml-4">${orderSummary.total.toFixed(2)}</span>
            <span className="flex items-center mr-4">
              Confirmar Orden
              <RiArrowLeftSLine className="w-5 h-5 ml-1 transform rotate-180" />
            </span>
          </button>
        </div>
      </motion.div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        customerInfo={customerInfo}
        orderItems={orderItems}
        orderSummary={orderSummary}
      />
    </>
  );
};

export default OrderSidebar;