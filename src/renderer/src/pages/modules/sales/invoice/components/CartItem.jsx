import React from 'react';
import { FiFileText } from "react-icons/fi";

const CartItem = ({ item, onUpdateNote }) => {
  const { id, name, price, quantity, extras, notes } = item;

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <div className="flex items-center">
          <span className="font-medium">{name}</span>
          <span className="ml-2 text-gray-500">x{quantity}</span>
        </div>
        <span className="font-medium">${(price * quantity).toFixed(2)}</span>
      </div>
      {extras && (
        <p className="text-sm text-gray-500">Extra: {extras}</p>
      )}
      {notes && (
        <p className="text-sm text-gray-500">Note: {notes}</p>
      )}
      <div className="flex items-center mt-2 w-20 overflow-hidden bg-green-50 rounded-xl p-1">
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => onUpdateNote(id)}
        >
          <FiFileText className="w-4 h-4" />
        </button>
        <span className="text-sm text-green-800 ml-1">Notes</span>
      </div>
    </div>
  );
};

export default CartItem;