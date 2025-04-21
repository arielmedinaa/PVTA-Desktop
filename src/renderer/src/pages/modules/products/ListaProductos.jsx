import React, { useState } from 'react';
import ModalCreateProd from "./components/modals/modalCreateProducts"
import {
    RiSearchLine,
    RiFilterLine,
    RiFileTextLine,
    RiMore2Line,
    RiArrowRightLine,
    RiArrowLeftLine,
    RiDownload2Line,
    RiUpload2Line,
    RiAddLine
} from 'react-icons/ri';

const ListaProductos = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const summaryData = [
        { label: 'In Stock', value: '$2,307.40', color: 'green', icon: '↑', lastUpdate: 'Last update: Jan 24' },
        { label: 'Total Sold', value: '$34,307.40', color: 'blue', icon: '→', lastUpdate: 'Last update: Jan 24' },
        { label: 'Low Stock', value: '$34,307.40', color: 'amber', icon: '⚠', lastUpdate: 'Last update: Jan 24' },
        { label: 'Out of Stock', value: '$256.87', color: 'red', icon: '✕', lastUpdate: 'Last update: Jan 24' },
    ];

    // Datos de ejemplo para productos
    const products = [
        {
            id: 'P10001',
            name: 'Premium Wireless Headphones',
            category: 'Electronics',
            price: '$160.00',
            status: 'In Stock',
            stock: 24,
            image: 'https://assets.materialup.com/uploads/08c9928a-4048-47a9-aa44-9aba6244c6e0/preview.jpg'
        },
        {
            id: 'P10002',
            name: 'Ergonomic Office Chair',
            category: 'Furniture',
            price: '$267.00',
            status: 'In Stock',
            stock: 13,
            image: 'https://assets.materialup.com/uploads/752acb9f-cf4f-4612-9c5f-2817c676eef3/preview.png'
        },
        {
            id: 'P10003',
            name: 'Smartphone Case Pro',
            category: 'Accessories',
            price: '$267.18',
            status: 'Out of Stock',
            stock: 0,
            image: 'https://assets.materialup.com/uploads/c389ae0e-dcf2-4d11-87cd-b6b0ea321ba7/preview.jpg'
        },
        {
            id: 'P10004',
            name: 'Smart Watch Series X',
            category: 'Electronics',
            price: '$153.30',
            status: 'Low Stock',
            stock: 3,
            image: 'https://assets.materialup.com/uploads/e451d3e6-5e0a-49bd-bce8-5b8146c38db1/preview.jpg'
        },
        {
            id: 'P10005',
            name: 'Bluetooth Speaker',
            category: 'Electronics',
            price: '$178.45',
            status: 'In Stock',
            stock: 42,
            image: 'https://assets.materialup.com/uploads/ae671650-ed3c-4207-9f62-5f4e8b5f0c9e/preview.jpg'
        },
        {
            id: 'P10006',
            name: 'Gaming Mouse',
            category: 'Electronics',
            price: '$235.20',
            status: 'Low Stock',
            stock: 5,
            image: 'https://assets.materialup.com/uploads/08c9928a-4048-47a9-aa44-9aba6244c6e0/preview.jpg'
        },
        {
            id: 'P10007',
            name: 'External SSD 1TB',
            category: 'Electronics',
            price: '$432.12',
            status: 'In Stock',
            stock: 18,
            image: 'https://assets.materialup.com/uploads/752acb9f-cf4f-4612-9c5f-2817c676eef3/preview.png'
        },
    ];

    // Obtener el color de estado
    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock': return 'bg-green-100 text-green-800';
            case 'Low Stock': return 'bg-amber-100 text-amber-800';
            case 'Out of Stock': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Filtros de productos
    const filters = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

    return (
        <>
            <div className="space-y-8">
                <div className="bg-white rounded-3xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Lista de Productos</h1>
                        <div className="flex space-x-3">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">
                                <RiDownload2Line className="w-5 h-5" />
                                <span>Export</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">
                                <RiUpload2Line className="w-5 h-5" />
                                <span>Import</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600" onClick={() => setIsModalOpen(true)}>
                                <RiAddLine className="w-5 h-5" />
                                <span>New Product</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 rounded-3xl bg-gray-50 border border-gray-100 p-2">
                        {summaryData.map((item, index) => (
                            <div key={index} className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
                                <div className="flex items-center mb-2">
                                    <span className={`text-${item.color}-600 mr-2 text-lg`}>{item.icon}</span>
                                    <span className="text-gray-600">{item.label}</span>
                                </div>
                                <div className="text-3xl font-bold mb-1">{item.value}</div>
                                <div className="text-xs text-gray-500">{item.lastUpdate}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between gap-3">
                            <div className="flex space-x-2">
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === filter
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        onClick={() => setSelectedFilter(filter)}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            <div className="flex space-x-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <RiSearchLine className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
                                    <RiFilterLine className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 text-left">
                                    <tr>
                                        <th className="px-5 py-4">
                                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                                        </th>
                                        <th className="px-5 py-4 text-gray-600 font-medium">Product ID</th>
                                        <th className="px-5 py-4 text-gray-600 font-medium">Product</th>
                                        <th className="px-5 py-4 text-gray-600 font-medium">Category</th>
                                        <th className="px-5 py-4 text-gray-600 font-medium">Status</th>
                                        <th className="px-5 py-4 text-gray-600 font-medium">Stock</th>
                                        <th className="px-5 py-4 text-gray-600 font-medium">Price</th>
                                        <th className="px-5 py-4 text-gray-600 font-medium"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-4">
                                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <RiFileTextLine className="text-gray-400" />
                                                    <span>{product.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="font-medium">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-gray-600">{product.category}</td>
                                            <td className="px-5 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-gray-600">{product.stock}</td>
                                            <td className="px-5 py-4 font-medium">{product.price}</td>
                                            <td className="px-5 py-4 text-right">
                                                <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full">
                                                    <RiMore2Line className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-5 border-t border-gray-100 flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                Showing 1-{products.length} of 134 entries
                            </div>
                            <div className="flex space-x-2">
                                <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                    <RiArrowLeftLine className="w-4 h-4" />
                                </button>
                                <button className="w-9 h-9 flex items-center justify-center rounded border border-transparent bg-blue-500 text-white font-medium">
                                    1
                                </button>
                                <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                    2
                                </button>
                                <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                    3
                                </button>
                                <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                                    ...
                                </button>
                                <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                    12
                                </button>
                                <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                    <RiArrowRightLine className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalCreateProd 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
};

export default ListaProductos