import React from 'react'
import { RiArrowLeftLine, RiArrowRightLine, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

const Paginacion1 = ({ 
    currentPage, 
    totalItems, 
    itemsPerPage, 
    onPageChange,
    onPageSizeChange 
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const startItem = totalItems > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);
            
            if (currentPage <= 3) {
                endPage = 4;
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }
            
            if (startPage > 2) {
                pages.push('...');
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    return (
        <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
                Mostrando {startItem}-{endItem} de {totalItems} registros
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex space-x-1">
                    <button 
                        onClick={() => handlePageChange(1)} 
                        disabled={currentPage === 1}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Primera página"
                    >
                        <RiArrowLeftLine className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Página anterior"
                    >
                        <RiArrowLeftSLine className="w-5 h-5" />
                    </button>
                    
                    {getPageNumbers().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span 
                                    key={`ellipsis-${index}`} 
                                    className="w-9 h-9 flex items-center justify-center text-gray-500"
                                >
                                    ...
                                </span>
                            );
                        }
                        
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-9 h-9 flex items-center justify-center rounded-full border ${
                                    currentPage === page
                                        ? 'bg-slate-800 text-white border-slate-800'
                                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                                aria-current={currentPage === page ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        );
                    })}
                    
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Siguiente página"
                    >
                        <RiArrowRightSLine className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => handlePageChange(totalPages)} 
                        disabled={currentPage === totalPages}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Última página"
                    >
                        <RiArrowRightLine className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Paginacion1