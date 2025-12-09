import React from 'react'
import { RiAddLine, RiDownload2Line, RiUpload2Line } from 'react-icons/ri'
import { TbReportSearch } from "react-icons/tb";

const HeaderListaProductos = ({setIsModalOpen}) => {
    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Lista de Productos</h1>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">
                        <RiDownload2Line className="w-5 h-5" />
                        <span>Exportar</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">
                        <RiUpload2Line className="w-5 h-5" />
                        <span>Importar</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-full text-white" onClick={() => setIsModalOpen(true)}>
                        <TbReportSearch className="w-5 h-5 text-amber-200" />
                        <span>Reportes</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 rounded-full text-white" onClick={() => setIsModalOpen(true)}>
                        <RiAddLine className="w-5 h-5 text-emerald-400" />
                        <span>Agregar Nuevo</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default HeaderListaProductos