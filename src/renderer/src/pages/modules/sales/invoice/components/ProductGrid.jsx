import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onAddToCart, activeCategory }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={activeCategory}
    >
      {products.map((product, index) => (
        <motion.div 
          key={product.id} 
          variants={itemVariants}
          custom={index}
        >
          <ProductCard 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;