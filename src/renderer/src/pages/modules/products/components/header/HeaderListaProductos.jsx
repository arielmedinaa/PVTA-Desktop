import React from 'react'
import { RiAddLine, RiDownload2Line, RiUpload2Line } from 'react-icons/ri'

const HeaderListaProductos = ({setIsModalOpen}) => {
    return (
        <>
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
                    <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 rounded-full text-white" onClick={() => setIsModalOpen(true)}>
                        <RiAddLine className="w-5 h-5" />
                        <span>New Product</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default HeaderListaProductos