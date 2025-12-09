import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

const FilterStock = ({ onFilterChange, activeTab, setActiveTab, searchQuery, setSearchQuery }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        onFilterChange({ search: e.target.value, type: filterType });
    };

    const handleFilterChange = (e) => {
        const type = e.target.value;
        setFilterType(type);
        onFilterChange({ search: searchTerm, type });
    };

    return (
        <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between gap-3">
            <div className="flex flex-wrap gap-2">
                <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "all" ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setActiveTab("all")}
                >
                    Todos
                </button>
                <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "pending" ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setActiveTab("pending")}
                >
                    Pendientes
                </button>
                <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "partial" ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setActiveTab("partial")}
                >
                    Parciales
                </button>
                <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "completed" ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setActiveTab("completed")}
                >
                    Completados
                </button>
                <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "expired" ? "bg-red-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setActiveTab("expired")}
                >
                    Vencidos
                </button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-slate-600" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-full focus:outline-none"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className="w-full md:w-auto">
                    <div className="relative">
                        <select
                            className="appearance-none bg-white border border-gray-300 rounded-full pl-4 pr-10 py-2 w-full focus:outline-none text-gray-400"
                            value={filterType}
                            onChange={handleFilterChange}
                        >
                            <option value="all">Todos los productos</option>
                            <option value="low">Stock bajo</option>
                            <option value="medium">Stock medio</option>
                            <option value="high">Stock alto</option>
                            <option value="no_control">Sin controlar</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <FiFilter className="text-slate-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterStock;