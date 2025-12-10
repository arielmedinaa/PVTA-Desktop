import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiCloseLine, RiAddLine, RiArrowLeftLine } from 'react-icons/ri';
import PriceCarousel from '../carrousel/PriceCarrousel';
import { categories } from '../../../../../core/constants/GlobalUtilsData';
import { postData } from '../../../../../core/api/api';
import DropDownError from '../../../../../core/components/dropdown/DropDownError';

const CreateProductModal = ({ isOpen, onClose }) => {
  const [categoryError, setCategoryError] = useState('');

  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [description, setDescription] = useState('');
  const [controlStock, setControlStock] = useState(false);
  const [category, setCategory] = useState('');
  const [prices, setPrices] = useState([{ name: 'Precio estándar', monto: '', impuesto: 10 }]);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState({
    nombre: '',
    subCategoriaId: 0,
  });

  const [isClosing, setIsClosing] = useState(false);
  const [isCategoryClosing, setIsCategoryClosing] = useState(false);

  const handleCloseCategory = () => {
    setIsCategoryClosing(true);
    setTimeout(() => {
      setShowCategoryForm(false);
      setIsCategoryClosing(false);
    }, 300);
  };

  const handleAddNewCategory = (e) => {
    const { value, name } = e.target;
    const prefix = 'CAT-';
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const codigo = `${prefix}${value.substring(0, 3).toUpperCase()}${randomSuffix}`;

    setNewCategoryName({
      [name]: value.toUpperCase(),
      codigo: codigo,
      activo: true,
      subCategoriaId: 0,
    });
  };

  const createCategory = async () => {
    setCategoryError('');
    const result = await postData('productos/crearCategoria', newCategoryName, false);
    if (result === false) {
      setCategoryError('Error al crear la categoría');
      return false;
    }
    return true;
  }

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

  const handleAddCategory = async () => {
    if (newCategoryName.nombre.trim()) {
      const success = await createCategory();
      if (success) {
        setCategory(newCategoryName.nombre.trim());
        setNewCategoryName({
          nombre: '',
          subCategoriaId: 0,
        });
        handleCloseCategory();
      }
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
          className="bg-white rounded-2xl shadow-lg w-[700px] max-h-[90vh] overflow-hidden flex flex-col"
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
                <div className='flex-1 bg-gray-50 rounded-3xl p-3'>
                  <div className='bg-white rounded-xl shadow-md p-4'>
                    <h3 className="text-lg font-medium mb-4">Product details</h3>

                    <div className="mb-4">
                      <label htmlFor="nombre" className="block mb-1 font-medium">Nombre</label>
                      <input
                        type="text"
                        id="productName"
                        className="w-full p-3 border border-gray-300 rounded-full"
                        placeholder="Tipee el nombre del producto..."
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
                        className="w-full p-3 border border-gray-300 rounded-full"
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
                          className="flex-1 p-3 border border-gray-300 rounded-full"
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
                          className="p-3 bg-slate-800 rounded-full hover:bg-slate-900 text-white"
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
                        className="w-full p-3 border border-gray-300 rounded-2xl resize-none"
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="controlStock"
                        className="h-4 w-4 text-blue-600 rounded-2xl border-gray-300 mr-2"
                        checked={controlStock}
                        onChange={(e) => setControlStock(e.target.checked)}
                      />
                      <label htmlFor="controlStock" className="font-medium">
                        Control stock for this product
                      </label>
                    </div>
                  </div>
                </div>
                <PriceCarousel prices={prices} setPrices={setPrices} maxPrices={5} />
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={handleCloseModal}
              className="px-6 py-2 text-slate-700 rounded-full border hover:bg-slate-50 duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-900"
            >
              Create new product
            </button>
          </div>
        </motion.div>

        {(showCategoryForm || isCategoryClosing) && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg w-80 max-h-[90vh] overflow-hidden flex flex-col"
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
                <label htmlFor="nombre" className="block mb-1 font-medium">Category Name</label>
                <input
                  type="text"
                  id="nombre"
                  name='nombre'
                  className={`w-full p-3 border ${categoryError ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none`}
                  placeholder="Enter category name"
                  value={newCategoryName.nombre}
                  onChange={handleAddNewCategory}
                  autoFocus
                />
                {categoryError && (
                  <DropDownError errorMessage={categoryError} />
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCloseCategory}
                className="px-6 py-2 text-slate-700 rounded-full border hover:bg-slate-50 duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-900"
                disabled={!newCategoryName.nombre.trim()}
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