import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Search, Check, X as XIcon, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { Calendar } from 'react-date-range';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { RiStockLine } from 'react-icons/ri';

const ModalAddStock = ({ isOpen, onClose, onSave }) => {
    const [deposito, setDeposito] = useState('');
    const [sucursal, setSucursal] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [productos, setProductos] = useState([
        { codigo: '', cantidad: 1, stockMinimo: '', costo: '', nombre: '', encontrado: false }
    ]);
    const [showSearch, setShowSearch] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const modalRef = useRef(null);
    const [productosDisponibles] = useState([
        { id: 1, codigo: 'PROD001', nombre: 'Producto 1', precio: 100 },
        { id: 2, codigo: 'PROD002', nombre: 'Producto 2', precio: 200 },
        { id: 3, codigo: 'PROD003', nombre: 'Producto 3', precio: 300 },
    ]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAddProducto = () => {
        setProductos([...productos, { codigo: '', cantidad: 1, stockMinimo: '', costo: '', nombre: '', encontrado: false }]);
    };

    const handleRemoveProducto = (index) => {
        const newProductos = [...productos];
        newProductos.splice(index, 1);
        setProductos(newProductos);
    };

    const handleProductoChange = (index, field, value) => {
        const newProductos = [...productos];
        newProductos[index][field] = value;

        if (field === 'codigo' && value.length >= 3) {
            setShowSearch(index);
            setSearchTerm(value);
        } else if (field === 'codigo' && value.length < 3) {
            newProductos[index].encontrado = false;
            newProductos[index].nombre = '';
        }

        setProductos(newProductos);
    };

    const handleSelectProducto = (index, producto) => {
        const newProductos = [...productos];
        newProductos[index] = {
            ...newProductos[index],
            codigo: producto.codigo,
            nombre: producto.nombre,
            costo: producto.precio,
            encontrado: true
        };
        setProductos(newProductos);
        setShowSearch(null);
        setSearchTerm('');
    };

    const handleIncrement = (index) => {
        const newProductos = [...productos];
        newProductos[index].cantidad += 1;
        setProductos(newProductos);
    };

    const handleDecrement = (index) => {
        const newProductos = [...productos];
        if (newProductos[index].cantidad > 1) {
            newProductos[index].cantidad -= 1;
            setProductos(newProductos);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasEmptyFields = productos.some(
            (producto) => !producto.codigo || !producto.cantidad || !producto.costo
        );

        if (!deposito || !sucursal || hasEmptyFields) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }

        const newStock = {
            id: Date.now(),
            deposito,
            sucursal,
            fecha,
            productos: productos.map(p => ({
                ...p,
                cantidad: parseInt(p.cantidad),
                stockMinimo: p.stockMinimo ? parseInt(p.stockMinimo) : 0,
                costo: parseFloat(p.costo)
            })),
            total: productos.reduce((sum, p) => sum + (parseInt(p.cantidad) * parseFloat(p.costo || 0)), 0)
        };

        onSave(newStock);
    };

    const filteredProductos = productosDisponibles.filter(
        (producto) =>
            producto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const total = productos.reduce((sum, producto) => {
        return sum + (producto.cantidad * (parseFloat(producto.costo) || 0));
    }, 0);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <motion.div
                            ref={modalRef}
                            className="flex flex-col w-full max-w-4xl bg-white rounded-3xl shadow-xl max-h-[90vh] overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-6 py-5 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                                        <div className="bg-gray-100 p-2 rounded-full">
                                            <RiStockLine className="h-5 w-5 text-gray-600" />
                                        </div>
                                        Agregar Entrada de Stock
                                    </h2>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="px-6 py-4">
                                <form onSubmit={handleSubmit} className='bg-gray-50 rounded-2xl p-2'>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-white shadow-md rounded-2xl p-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Depósito <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={deposito}
                                                    onChange={(e) => setDeposito(e.target.value)}
                                                    className="w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 rounded-2xl focus:outline-none shadow-sm appearance-none"
                                                    required
                                                >
                                                    <option value="">Seleccionar depósito</option>
                                                    <option value="Depósito Principal">Depósito Principal</option>
                                                    <option value="Depósito Secundario">Depósito Secundario</option>
                                                    <option value="Bodega">Bodega</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Sucursal <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={sucursal}
                                                    onChange={(e) => setSucursal(e.target.value)}
                                                    className="w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 rounded-2xl focus:outline-none shadow-sm appearance-none"
                                                    required
                                                >
                                                    <option value="">Seleccionar sucursal</option>
                                                    <option value="Sucursal Central">Sucursal Central</option>
                                                    <option value="Sucursal Norte">Sucursal Norte</option>
                                                    <option value="Sucursal Sur">Sucursal Sur</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Fecha <span className="text-red-500">*</span>
                                            </label>
                                            <div
                                                className="w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 rounded-2xl flex justify-between items-center cursor-pointer hover:border-gray-400 shadow-sm"
                                                onClick={() => setShowCalendar(!showCalendar)}
                                            >
                                                <span>{format(fecha, 'PPP', { locale: es })}</span>
                                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            {showCalendar && (
                                                <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg">
                                                    <Calendar
                                                        date={fecha}
                                                        onChange={(date) => {
                                                            setFecha(date);
                                                            setShowCalendar(false);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-6 bg-white shadow-md rounded-2xl p-3">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-full font-medium text-gray-900">Productos</h3>
                                            <button
                                                type="button"
                                                onClick={handleAddProducto}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-slate-800 hover:bg-slate-900"
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Agregar Producto
                                            </button>
                                        </div>

                                        <div className='w-full rounded-3xl bg-gray-50 border border-gray-100 p-2'>
                                            <div className="border border-gray-200 rounded-2xl overflow-hidden">
                                                <div className="overflow-auto max-h-[calc(4.5rem*4)]">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Mínimo</th>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo Unitario</th>
                                                                <th scope="col" className="relative px-6 py-3">
                                                                    <span className="sr-only">Acciones</span>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {productos.map((producto, index) => (
                                                                <tr key={index} className="hover:bg-gray-50">
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="relative">
                                                                            <div className="relative">
                                                                                <input
                                                                                    type="text"
                                                                                    value={producto.codigo}
                                                                                    onChange={(e) => handleProductoChange(index, 'codigo', e.target.value)}
                                                                                    className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none shadow-sm"
                                                                                    placeholder="Código o nombre"
                                                                                    required
                                                                                />
                                                                                <Search className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                                                                            </div>
                                                                            {showSearch === index && searchTerm && (
                                                                                <div className="absolute z-[999] mt-1 w-full bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-auto">
                                                                                    {filteredProductos.length > 0 ? (
                                                                                        <ul className="py-1">
                                                                                            {filteredProductos.map((prod) => (
                                                                                                <li
                                                                                                    key={prod.id}
                                                                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                                                                                                    onClick={() => handleSelectProducto(index, prod)}
                                                                                                >
                                                                                                    <div>
                                                                                                        <div className="font-medium">{prod.nombre}</div>
                                                                                                        <div className="text-sm text-gray-500">{prod.codigo}</div>
                                                                                                    </div>
                                                                                                    <div className="text-sm font-medium">${prod.precio}</div>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    ) : (
                                                                                        <div className="px-4 py-2 text-sm text-gray-500">No se encontraron productos</div>
                                                                                    )}
                                                                                </div>
                                                                            )}

                                                                            {producto.encontrado && (
                                                                                <div className="mt-1 flex items-center text-xs text-green-600">
                                                                                    <Check className="h-3 w-3 mr-1" />
                                                                                    {producto.nombre}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </td>

                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleDecrement(index)}
                                                                                className="p-2 border border-r-0 border-gray-300 rounded-l-2xl bg-gray-50 hover:bg-gray-100 focus:outline-none shadow-sm"
                                                                            >
                                                                                <Minus className="h-3 w-3 text-gray-600" />
                                                                            </button>
                                                                            <input
                                                                                type="number"
                                                                                min="1"
                                                                                value={producto.cantidad}
                                                                                onChange={(e) => handleProductoChange(index, 'cantidad', Math.max(1, parseInt(e.target.value) || 1))}
                                                                                className="w-16 h-7 text-center border-t border-b border-gray-300 py-2 text-sm focus:outline-none shadow-sm"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleIncrement(index)}
                                                                                className="p-2 border border-l-0 border-gray-300 rounded-r-2xl bg-gray-50 hover:bg-gray-100 focus:outline-none shadow-sm"
                                                                            >
                                                                                <Plus className="h-3 w-3 text-gray-600" />
                                                                            </button>
                                                                        </div>
                                                                    </td>

                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <input
                                                                            type="number"
                                                                            min="0"
                                                                            value={producto.stockMinimo}
                                                                            onChange={(e) => handleProductoChange(index, 'stockMinimo', e.target.value)}
                                                                            className="w-24 px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none shadow-sm"
                                                                            placeholder="Opcional"
                                                                        />
                                                                    </td>

                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="relative">
                                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                                <span className="text-gray-500 text-sm">$</span>
                                                                            </div>
                                                                            <input
                                                                                type="number"
                                                                                min="0"
                                                                                step="0.01"
                                                                                value={producto.costo}
                                                                                onChange={(e) => handleProductoChange(index, 'costo', e.target.value)}
                                                                                className="pl-7 w-32 px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none shadow-sm"
                                                                                placeholder="0.00"
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </td>

                                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                        {productos.length > 1 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleRemoveProducto(index)}
                                                                                className="text-red-600 hover:text-red-900"
                                                                            >
                                                                                <XIcon className="h-5 w-5" />
                                                                            </button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 px-6 py-4 rounded-2xl shadow-md flex justify-between items-center mt-6">
                                        <div>
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2.5 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none"
                                            >
                                                Guardar Entrada
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ModalAddStock;