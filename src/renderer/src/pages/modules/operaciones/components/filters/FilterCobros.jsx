import React from 'react'
import { RiFilterLine, RiSearchLine } from 'react-icons/ri'

const FilterCobros = ({ activeTab, setActiveTab, searchQuery, setSearchQuery }) => {
    return (
        <>
            <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                    <button
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        onClick={() => setActiveTab("all")}
                    >
                        Todos
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "pending" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        onClick={() => setActiveTab("pending")}
                    >
                        Pendientes
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "partial" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        onClick={() => setActiveTab("partial")}
                    >
                        Parciales
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "completed" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        onClick={() => setActiveTab("completed")}
                    >
                        Completados
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "expired" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        onClick={() => setActiveTab("expired")}
                    >
                        Vencidos
                    </button>
                </div>

                <div className="flex space-x-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar por cliente o referencia..."
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
        </>
    )
}

export default FilterCobros