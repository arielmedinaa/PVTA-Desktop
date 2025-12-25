import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RiCloseLine, RiAddLine } from 'react-icons/ri';
import { Minus, Plus } from 'lucide-react';

import PriceCarousel from '../carrousel/PriceCarrousel';
import ModalAddCategory from './ModalAddCategory';

import { categories } from '../../../../../core/constants/GlobalUtilsData';
import { postData } from '../../../../../core/api/api';
import { validarExistenciaPorCodigo } from '../../api/api.productos';
import DropDownError from '../../../../../core/components/dropdown/DropDownError';

const CreateProductModal = ({ isOpen, onClose, onAddProduct, mode }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    stock: false,
    descripcion: '',
    unidadMedida: 'UND',
    categoriaId: 0,
    proveedor: '',
    nomenclatura: '',
    costoInicial: 0,
    cantidadInicial: 0
  });

  const [prices, setPrices] = useState([
    {
      tipoPrecio: 'Precio estándar',
      precio: '',
      iva: 10,
      moneda: 'PYG',
      linea: 1,
      activo: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isCategoryClosing, setIsCategoryClosing] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  // Estados para errores y carga
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryError, setCategoryError] = useState('')
  const [isValidatingCode, setIsValidatingCode] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState({
    nombre: '',
    subCategoriaId: 0,
  });

  const debounceTimeoutRef = useRef(null);

  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validarExistencia = async (codigo) => {
    if (!codigo.trim()) return;

    setIsValidatingCode(true);
    try {
      const response = await validarExistenciaPorCodigo(codigo);

      if (response && response.existe) {
        setErrors(prev => ({
          ...prev,
          codigo: response.mensaje
        }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.codigo;
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Error validating code:', error);
    } finally {
      setIsValidatingCode(false);
    }
  };

  const displayedCategories = showAllCategories
    ? filteredCategories
    : filteredCategories.slice(0, 3);

  const handleInputChange = async (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'codigo') {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (value.trim() !== '') {
        debounceTimeoutRef.current = setTimeout(() => {
          validarExistencia(value);
        }, 800);
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value.toUpperCase()
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'El código es requerido';
    }

    if (!formData.categoriaId || formData.categoriaId === 0) {
      newErrors.categoria = 'Debe seleccionar una categoría';
    }

    const invalidPrices = prices.some(price =>
      !price.tipoPrecio.trim() || !price.precio || parseFloat(price.precio) <= 0
    );

    if (invalidPrices) {
      newErrors.precios = 'Todos los precios deben tener nombre y monto válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const transformPricesToBackend = () => {
    return prices.map((price, index) => ({
      tipoPrecio: price.tipoPrecio,
      precio: Math.round(parseFloat(price.precio) * 100),
      iva: parseInt(price.iva),
      moneda: price.moneda,
      linea: index + 1,
      activo: price.activo ?? false
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const productData = {
        ...formData,
        categoriaId: parseInt(formData.categoriaId),
        precios: transformPricesToBackend()
      };

      const response = await postData('productos/grabar', productData, true);
      if (response && response.dataResponse) {
        resetForm();
        handleCloseModal();
        onAddProduct(response.dataResponse);
      } else {
        setErrors({ submit: 'Error al crear el producto. Intente nuevamente.' });
      }
    } catch (error) {
      console.error('Error al guardar producto:', error);
      setErrors({
        submit: error.message || 'Error al crear el producto. Intente nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      codigo: '',
      nombre: '',
      stock: false,
      descripcion: '',
      unidadMedida: 'UND',
      categoriaId: 0,
      proveedor: '',
      nomenclatura: ''
    });
    setPrices([
      {
        tipoPrecio: 'Precio estándar',
        precio: '',
        iva: 10,
        moneda: 'PYG',
        linea: 1,
        activo: true
      }
    ]);
    setSelectedCategory('');
    setSearchTerm('');
    setErrors({});
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    if (showCategoryForm) {
      setShowCategoryForm(false);
    }

    setTimeout(() => {
      onClose();
      setIsClosing(false);
      resetForm();
    }, 300);
  };

  const handleCloseCategory = () => {
    setIsCategoryClosing(true);
    setTimeout(() => {
      setShowCategoryForm(false);
      setIsCategoryClosing(false);
    }, 300);
  };

  const handleAddNewCategory = (e) => {
    const { value } = e.target;
    const prefix = 'CAT-';
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const codigo = `${prefix}${value.substring(0, 3).toUpperCase()}${randomSuffix}`;

    setNewCategoryName({
      nombre: value.toUpperCase(),
      codigo: codigo,
      activo: true,
      subCategoriaId: 0,
    });
  };

  const createCategory = async () => {
    setCategoryError('');
    try {
      const result = await postData('productos/crearCategoria', newCategoryName, false);
      if (!result || result === false) {
        setCategoryError('Error al crear la categoría');
        return null;
      }
      return result;
    } catch (error) {
      setCategoryError('Error al crear la categoría: ' + error.message);
      return null;
    }
  };

  const handleAddCategory = async () => {
    if (newCategoryName.nombre.trim()) {
      const newCategory = await createCategory();
      if (newCategory) {
        const categoryId = newCategory.id || newCategory.dataResponse?.id;

        setFormData(prev => ({
          ...prev,
          categoriaId: categoryId
        }));
        setSelectedCategory(newCategoryName.nombre.trim());
        setSearchTerm(newCategoryName.nombre.trim());
        setNewCategoryName({
          nombre: '',
          subCategoriaId: 0,
        });
        handleCloseCategory();
      }
    }
  };

  const handleCategorySelect = (cat, categoryId) => {
    setSelectedCategory(cat);
    setSearchTerm(cat);
    setFormData(prev => ({
      ...prev,
      categoriaId: categoryId
    }));
    setShowDropdown(false);
    if (errors.categoria) {
      setErrors(prev => ({ ...prev, categoria: '' }));
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="flex items-start space-x-4">
        <motion.div
          className="bg-white rounded-2xl shadow-lg w-[900px] max-h-[90vh] overflow-hidden flex flex-col p-3"
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: isClosing ? -50 : 0,
            opacity: isClosing ? 0 : 1
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex justify-between items-center p-6 border-gray-200">
            <h2 className="text-xl font-bold">Nuevo Producto</h2>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              <RiCloseLine className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div>
              <DropDownError message={errors.submit} />

              <div className="space-y-6">
                <div className='flex-1 bg-gray-50 rounded-3xl p-3'>
                  <div className='bg-white rounded-xl shadow-md p-4'>
                    <h3 className="text-lg font-medium mb-4">Detalles del Producto</h3>

                    <div className="mb-4">
                      <label htmlFor="nombre" className="block mb-1 font-medium">
                        Nombre <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className={`w-full p-3 border rounded-full ${errors.nombre ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="Ingrese el nombre del producto..."
                        value={formData.nombre}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      <div className="mt-1">
                        {errors.nombre && <DropDownError errorMessage={errors.nombre} />}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="codigo" className="block mb-1 font-medium">
                        Código de Producto <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="codigo"
                        name="codigo"
                        className={`w-full p-3 border rounded-full ${errors.codigo ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="Ingrese el código del producto"
                        value={formData.codigo}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      <div className="mt-1">
                        {errors.codigo && <DropDownError errorMessage={errors.codigo} />}
                      </div>
                    </div>

                    <div className="mb-4 relative">
                      <label htmlFor="category" className="block mb-1 font-medium">
                        Categoría <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="category"
                          className={`w-full p-3 border rounded-full pr-12 ${errors.categoria ? 'border-red-500' : 'border-gray-300'
                            }`}
                          placeholder="Buscar categoría..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onFocus={() => setShowDropdown(true)}
                          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCategoryForm(true)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                          title="Agregar nueva categoría"
                          disabled={isSubmitting}
                        >
                          <RiAddLine className="w-5 h-5" />
                        </button>
                      </div>

                      {showDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-auto">
                          {displayedCategories.length > 0 ? (
                            <>
                              <ul className="py-1">
                                {displayedCategories.map((cat, idx) => (
                                  <li
                                    key={idx}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleCategorySelect(cat, idx + 1)}
                                    title={cat}
                                  >
                                    <div className="truncate">{cat}</div>
                                  </li>
                                ))}
                              </ul>
                              {!showAllCategories && filteredCategories.length > 3 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowAllCategories(true);
                                  }}
                                  className="w-full text-center py-2 text-sm text-blue-600 hover:bg-gray-50"
                                >
                                  Mostrar más categorías
                                </button>
                              )}
                            </>
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              No se encontraron categorías
                            </div>
                          )}
                        </div>
                      )}
                      <div className='mt-1'>
                        {errors.categoria && (
                          <DropDownError errorMessage={errors.categoria} />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="unidadMedida" className="block mb-1 font-medium">
                          Unidad de Medida
                        </label>
                        <select
                          id="unidadMedida"
                          name="unidadMedida"
                          className="w-full p-3 border border-gray-300 rounded-full"
                          value={formData.unidadMedida}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        >
                          <option value="UND">Unidad</option>
                          <option value="KG">Kilogramo</option>
                          <option value="LT">Litro</option>
                          <option value="MT">Metro</option>
                          <option value="CJ">Caja</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="proveedor" className="block mb-1 font-medium">
                          Proveedor
                        </label>
                        <input
                          type="text"
                          id="proveedor"
                          name="proveedor"
                          className="w-full p-3 border border-gray-300 rounded-full"
                          placeholder="Nombre del proveedor"
                          value={formData.proveedor}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="nomenclatura" className="block mb-1 font-medium">
                        Nomenclatura
                      </label>
                      <input
                        type="text"
                        id="nomenclatura"
                        name="nomenclatura"
                        className="w-full p-3 border border-gray-300 rounded-full"
                        placeholder="Nomenclatura del producto"
                        value={formData.nomenclatura}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="descripcion" className="block mb-1 font-medium">
                        Descripción
                      </label>
                      <textarea
                        id="descripcion"
                        name="descripcion"
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-2xl resize-none"
                        placeholder="Ingrese la descripción del producto"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex items-start">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, stock: !formData.stock })}
                          className="flex items-center text-left w-full group"
                          disabled={isSubmitting}
                        >
                          <div className={`flex-shrink-0 h-5 w-5 flex items-center justify-center border rounded-md mr-3 transition-colors ${
                            formData.stock 
                              ? 'bg-blue-100 border-blue-500' 
                              : 'bg-white border-gray-300 group-hover:border-gray-400' 
                          }`}>
                            {formData.stock ? (
                              <svg className="h-3.5 w-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <div className="h-2 w-2 rounded-sm bg-transparent" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Controlar stock para este producto</div>
                            <p className="text-sm text-gray-500">
                              {formData.stock 
                                ? 'Opcional: Agrega un stock inicial y su costo' 
                                : 'Haz clic para configurar el control de stock y agregar existencias iniciales'}
                            </p>
                          </div>
                          <div className="ml-auto">
                            <svg 
                              className={`h-5 w-5 text-gray-400 transform transition-transform ${formData.stock ? 'rotate-180' : ''}`} 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </button>
                      </div>
                      {formData.stock && (
                        <div className="mt-3 ml-8 p-4 bg-gray-50 rounded-xl border border-gray-200 relative z-10 transition-all duration-200 ease-in-out">
                          <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Costo inicial
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              className="w-full p-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0.00"
                              value={formData.costoInicial || ''}
                              onChange={(e) => setFormData({
                                ...formData,
                                costoInicial: parseFloat(e.target.value) || 0
                              })}
                              disabled={isSubmitting}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cantidad inicial
                            </label>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => setFormData({
                                  ...formData,
                                  cantidadInicial: Math.max(0, (formData.cantidadInicial || 0) - 1)
                                })}
                                className="p-2 border border-r-0 border-gray-300 rounded-l-2xl bg-gray-50 hover:bg-gray-100 focus:outline-none shadow-sm"
                                disabled={isSubmitting}
                              >
                                <Minus className="h-3 w-3 text-gray-600" />
                              </button>
                              <input
                                type="number"
                                min="0"
                                value={formData.cantidadInicial || 0}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  cantidadInicial: Math.max(0, parseInt(e.target.value) || 0)
                                })}
                                className="w-16 h-7 text-center border-t border-b border-gray-300 py-2 text-sm focus:outline-none shadow-sm"
                                disabled={isSubmitting}
                              />
                              <button
                                type="button"
                                onClick={() => setFormData({
                                  ...formData,
                                  cantidadInicial: (formData.cantidadInicial || 0) + 1
                                })}
                                className="p-2 border border-l-0 border-gray-300 rounded-r-2xl bg-gray-50 hover:bg-gray-100 focus:outline-none shadow-sm"
                                disabled={isSubmitting}
                              >
                                <Plus className="h-3 w-3 text-gray-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {mode === "INS" ?
                  <div className='flex-1 bg-gray-50 rounded-3xl p-3 items-center'>
                    <PriceCarousel
                      prices={prices}
                      setPrices={setPrices}
                      maxPrices={5}
                      disabled={isSubmitting}
                    />
                    {errors.precios && (
                      <p className="mt-2 text-sm text-red-500 text-center">{errors.precios}</p>
                    )}
                  </div>
                  :
                  <></>
                }
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 px-6 pb-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 text-white bg-slate-800 rounded-full hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
            </button>
          </div>
        </motion.div>

        {(showCategoryForm || isCategoryClosing) && (
          <ModalAddCategory categoryError={categoryError} handleAddCategory={handleAddCategory} handleCloseCategory={handleCloseCategory} newCategoryName={newCategoryName} isCategoryClosing={isCategoryClosing} handleAddNewCategory={handleAddNewCategory} />
        )}
      </div>
    </div>
  );
};

export default CreateProductModal;