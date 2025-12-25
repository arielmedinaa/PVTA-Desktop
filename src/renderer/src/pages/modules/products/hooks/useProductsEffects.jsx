import { useCallback, useEffect } from 'react';
import useListProductos from './useListProductos';

const useProductsEffects = ({
  initialFilter,
  currentPage,
  itemsPerPage,
  setProducts,
  setTotal,
  setLoading,
  setError
}) => {
  const { 
    productos, 
    loading: productosLoading, 
    error: productosError,
    total: productosTotal,
    setFilter
  } = useListProductos(initialFilter, { callBack: true });

  useEffect(() => {
    if (productos) {
      setProducts(productos);
    }
  }, [productos, setProducts]);

  useEffect(() => {
    setLoading(productosLoading);
  }, [productosLoading, setLoading]);

  useEffect(() => {
    if (productosError) {
      setError('Error al cargar los productos');
    }
  }, [productosError, setError]);

  useEffect(() => {
    setTotal(productosTotal);
  }, [productosTotal, setTotal]);

  const updateFilter = useCallback((newFilter) => {
    setFilter(prev => ({
      ...prev,
      ...newFilter,
      offset: (currentPage - 1) * itemsPerPage,
      limit: itemsPerPage
    }));
  }, [currentPage, itemsPerPage, setFilter]);

  useEffect(() => {
    updateFilter({
      offset: (currentPage - 1) * itemsPerPage,
      limit: itemsPerPage
    });
  }, [currentPage, itemsPerPage, updateFilter]);

  return {
    refreshProducts: useCallback(() => {
      return updateFilter({});
    }, [updateFilter]),
    updateFilter
  };
};

export default useProductsEffects;