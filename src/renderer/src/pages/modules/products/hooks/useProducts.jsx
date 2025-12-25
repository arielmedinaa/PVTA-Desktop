import { useCallback } from 'react';
import useProductsState from "./useProductsState";
import useProductsEffects from "./useProductsEffects";

const useProducts = (initialItemsPerPage = 10) => {
  // Initialize state
  const {
    currentPage,
    itemsPerPage,
    total,
    selectedFilter,
    isModalOpen,
    loading,
    error,
    products,
    filter,
    initialFilter,
    
    setCurrentPage,
    setItemsPerPage,
    setTotal,
    setSelectedFilter,
    setIsModalOpen,
    setLoading,
    setError,
    setProducts,
    setFilter,
    
    handlePageChange,
    handlePageSizeChange,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleFilterChange
  } = useProductsState(initialItemsPerPage);

  // Initialize effects
  const { fetchProducts } = useProductsEffects({
    initialFilter,
    currentPage,
    itemsPerPage,
    setProducts,
    setTotal,
    setLoading,
    setError
  });

  return {
    currentPage,
    itemsPerPage,
    total,
    selectedFilter,
    isModalOpen,
    loading,
    error,
    products,
    filter,
    
    setCurrentPage,
    setItemsPerPage,
    setSelectedFilter,
    setIsModalOpen,
    
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    
    handlePageChange,
    handlePageChange,
    handlePageSizeChange,
    
    handleFilterChange,
    
    refreshProducts: useCallback(() => {
      return fetchProducts({
        ...filter,
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      });
    }, [fetchProducts, filter, currentPage, itemsPerPage]),
    
    // Search
    handleSearch: useCallback((searchTerm) => {
      handleFilterChange({
        ...filter,
        codigo: searchTerm,
        descripcion: searchTerm
      });
    }, [filter, handleFilterChange])
  };
};

export default useProducts;