import React from 'react';
import { motion } from 'framer-motion';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, price, originalPrice, description, image, tags } = product;

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="relative h-40 rounded-xl bg-gray-100">
        {/* {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
          />
        )} */}
        {tags && tags.map((tag, index) => (
          <span
            key={index}
            className={`absolute top-2 ${index === 0 ? 'right-2' : 'left-2'} px-2 py-1 rounded-full text-xs font-medium ${tag.includes('Disc') ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'
              }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-baseline">
            <span className="text-green-600 font-semibold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-gray-400 text-sm line-through ml-2">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center">
            <button className="p-1 rounded-full bg-gray-50 text-gray-500 mr-2">
              <RiSubtractLine />
            </button>
            <span className="text-sm font-medium">0</span>
            <button
              className="p-1 rounded-full bg-gray-50 text-gray-500 ml-2"
              onClick={() => onAddToCart(product)}
            >
              <RiAddLine />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;