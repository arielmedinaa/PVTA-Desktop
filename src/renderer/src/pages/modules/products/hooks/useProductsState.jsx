import { useState, useMemo } from 'react';

const useProductsState = (initialItemsPerPage = 10) => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    const [total, setTotal] = useState(0);
    
    // UI state
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Data state
    const [products, setProducts] = useState([]);
    
    // Filter state
    const [filter, setFilter] = useState({
        codigo: "",
        descripcion: "",
        categoria: "",
        marca: "",
        precioini: "",
        preciofin: "",
        limit: initialItemsPerPage,
        offset: 0,
        orden: "codigo",
        tipOrden: "ASC",
    });

    // Memoized filter to prevent unnecessary re-renders
    const initialFilter = useMemo(() => ({
        ...filter,
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage
    }), [filter, itemsPerPage, currentPage]);

    return {
        // Pagination
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        total,
        setTotal,
        
        // UI
        selectedFilter,
        setSelectedFilter,
        isModalOpen,
        setIsModalOpen,
        loading,
        setLoading,
        error,
        setError,
        
        // Data
        products,
        setProducts,
        
        // Filter
        filter,
        setFilter,
        initialFilter,
        
        // Helpers
        handlePageChange: (newPage) => {
            setCurrentPage(newPage);
        },
        
        handlePageSizeChange: (newSize) => {
            const newPageSize = Number(newSize);
            setItemsPerPage(newPageSize);
            setCurrentPage(1);
        },
        
        handleAddProduct: (newProduct) => {
            setProducts(prev => [newProduct, ...prev]);
            setTotal(prev => prev + 1);
        },
        
        handleUpdateProduct: (updatedProduct) => {
            setProducts(prev => 
                prev.map(product => 
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            );
        },
        
        handleDeleteProduct: (productId) => {
            setProducts(prev => prev.filter(product => product.id !== productId));
            setTotal(prev => prev - 1);
        },
        
        handleFilterChange: (newFilter) => {
            setFilter(prev => ({
                ...prev,
                ...newFilter,
                offset: 0, // Reset to first page on filter change
            }));
            setCurrentPage(1);
        }
    };
};

export default useProductsState;