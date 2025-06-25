import React from 'react'
import { RiFileTextLine, RiFilterLine, RiMore2Line, RiSearchLine } from 'react-icons/ri'

const TablaClientes = ({
    clientes,
    getStatusColor,
    filters,
    searchQuery,
    setSearchQuery,
    selectedFilter
}) => {
    return (
        <>
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
                            placeholder="Buscar..."
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
                    {clientes.map((clients) => (
                        <tr key={clients.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-4">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                            </td>
                            <td className="px-5 py-4">
                                <div className="flex items-center space-x-2">
                                    <RiFileTextLine className="text-gray-400" />
                                    <span>{clients.id}</span>
                                </div>
                            </td>
                            <td className="px-5 py-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                        <img
                                            src={clients.image}
                                            alt={clients.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="font-medium">{clients.name}</span>
                                </div>
                            </td>
                            <td className="px-5 py-4 text-gray-600">{clients.category}</td>
                            <td className="px-5 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(clients.status)}`}>
                                    {clients.status}
                                </span>
                            </td>
                            <td className="px-5 py-4 text-gray-600">{clients.stock}</td>
                            <td className="px-5 py-4 font-medium">{clients.price}</td>
                            <td className="px-5 py-4 text-right">
                                <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full">
                                    <RiMore2Line className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TablaClientes