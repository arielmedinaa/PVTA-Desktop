import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiCloseLine, RiAddLine, RiDeleteBinLine, RiArrowLeftLine } from 'react-icons/ri';

const CreateProductModal = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [description, setDescription] = useState('');
  const [controlStock, setControlStock] = useState(false);
  const [category, setCategory] = useState('');
  const [prices, setPrices] = useState([{ name: 'Precio estándar', amount: '', tax: 21 }]);
  
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categories, setCategories] = useState(['Electronics', 'Clothing', 'Food', 'Office Supplies']);

  const [isClosing, setIsClosing] = useState(false);
  const [isCategoryClosing, setIsCategoryClosing] = useState(false);

  const addPriceItem = () => {
    setPrices([...prices, { name: '', amount: '', tax: 21 }]);
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

  const handleCloseCategory = () => {
    setIsCategoryClosing(true);
    setTimeout(() => {
      setShowCategoryForm(false);
      setIsCategoryClosing(false);
    }, 300);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    if (showCategoryForm) {
      setShowCategoryForm(false);
    }
    
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([...categories, newCategoryName.trim()]);
      setCategory(newCategoryName.trim());
      setNewCategoryName('');
      handleCloseCategory();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: productName,
      code: productCode,
      description,
      controlStock,
      category,
      prices
    });
    handleCloseModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="flex items-start space-x-4">
        <motion.div 
          className="bg-slate-50 rounded-lg shadow-lg w-[700px] max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ y: -50, opacity: 0 }}
          animate={{ 
            y: isClosing ? -50 : 0, 
            opacity: isClosing ? 0 : 1 
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex justify-between items-center p-6 border-gray-200">
            <h2 className="text-xl font-bold">Create New Product</h2>
            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
              <RiCloseLine className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className='bg-white rounded-xl shadow-sm p-4'>
                  <h3 className="text-lg font-medium mb-4">Product details</h3>
                  
                  <div className="mb-4">
                    <label htmlFor="productName" className="block mb-1 font-medium">Name</label>
                    <input
                      type="text"
                      id="productName"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Enter product name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="productCode" className="block mb-1 font-medium">Product Code</label>
                    <input
                      type="text"
                      id="productCode"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Enter product code"
                      value={productCode}
                      onChange={(e) => setProductCode(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="category" className="block mb-1 font-medium">Category</label>
                    <div className="flex space-x-2">
                      <select
                        id="category"
                        className="flex-1 p-3 border border-gray-300 rounded-md"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setShowCategoryForm(true)}
                        className="p-3 bg-blue-500 rounded-md hover:bg-blue-600 text-white"
                      >
                        <RiAddLine className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                    <textarea
                      id="description"
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-md resize-none"
                      placeholder="Enter product description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="controlStock"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-2"
                      checked={controlStock}
                      onChange={(e) => setControlStock(e.target.checked)}
                    />
                    <label htmlFor="controlStock" className="font-medium">
                      Control stock for this product
                    </label>
                  </div>
                </div>

                <div className='bg-white rounded-xl shadow-sm p-4'>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Price List</h3>
                    <div className="text-sm text-gray-500">
                      {prices.length}/5
                    </div>
                  </div>

                  {prices.map((price, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4 mb-3">
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

                  {prices.length < 5 && (
                    <button
                      type="button"
                      onClick={addPriceItem}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <RiAddLine className="w-5 h-5 mr-1" />
                      Add another price
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={handleCloseModal}
              className="px-6 py-2 bg-red-500 text-red-200 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create new product
            </button>
          </div>
        </motion.div>

        {(showCategoryForm || isCategoryClosing) && (
          <motion.div 
            className="bg-white rounded-lg shadow-lg w-80 max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ x: 100, opacity: 0 }}
            animate={{ 
              x: isCategoryClosing ? 100 : 0, 
              opacity: isCategoryClosing ? 0 : 1 
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center p-6 border-b border-gray-200">
              <button 
                className="mr-4 text-gray-500 hover:text-gray-700"
                onClick={handleCloseCategory}
              >
                <RiArrowLeftLine className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Add Category</h2>
            </div>
            
            <div className="flex-1 p-6">
              <div className="mb-4">
                <label htmlFor="categoryName" className="block mb-1 font-medium">Category Name</label>
                <input
                  type="text"
                  id="categoryName"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCloseCategory}
                className="px-6 py-2 bg-red-500 text-red-200 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={!newCategoryName.trim()}
              >
                Add
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreateProductModal;