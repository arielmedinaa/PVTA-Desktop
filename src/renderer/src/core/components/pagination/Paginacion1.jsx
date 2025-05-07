import React from 'react'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'

const Paginacion1 = ({data}) => {
    return (
        <div className="p-5 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm text-gray-600">
                Showing 1-{data.length} of 134 entries
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
    )
}

export default Paginacion1