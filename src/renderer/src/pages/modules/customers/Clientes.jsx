import { useState } from "react";
import HeaderClientes from "./components/header/HeaderClientes"
import CardsClientes from "./components/cards/CardsClientes";
import TablaClientes from "./components/table/TablaClientes";

const Clientes = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const summaryData = [
        { label: 'Total Clientes', value: '$2,307.40', color: 'green', icon: '↑', lastUpdate: 'Last update: Jan 24' },
        { label: 'Total No Contribuyentes', value: '$34,307.40', color: 'blue', icon: '→', lastUpdate: 'Last update: Jan 24' },
    ];

    const clientes = [
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock': return 'bg-green-100 text-green-800';
            case 'Low Stock': return 'bg-amber-100 text-amber-800';
            case 'Out of Stock': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filters = ['Contribuyentes', 'No Contribuyentes'];
    return (

        <div className='space-y-8'>
            <div className='bg-white rounded-3xl shadow-sm p-6'>
                <HeaderClientes />

                <CardsClientes summaryData={summaryData} />

                <div className='bg-white rounded-xl border border-gray-100 overflow-hidden'>
                    <TablaClientes clientes={clientes} getStatusColor={getStatusColor} filters={filters} />
                </div>
            </div>
        </div>
    )
}

export default Clientes