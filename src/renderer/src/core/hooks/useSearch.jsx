import { useState, useEffect, useCallback } from 'react';

const useSearch = ({ onSearch, debounceDelay = 300, initialFilter = {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('descripcion');
  const [filters, setFilters] = useState(initialFilter);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim() !== '' || Object.values(filters).some(Boolean)) {
        setIsSearching(true);
        const searchParams = {
          ...filters,
          [searchField]: searchTerm.trim() || undefined
        };
        
        Object.keys(searchParams).forEach(key => {
          if (searchParams[key] === undefined || searchParams[key] === '') {
            delete searchParams[key];
          }
        });

        onSearch(searchParams);
        setIsSearching(false);
      }
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, searchField, filters, debounceDelay, onSearch]);

  const handleSearchChange = useCallback((e) => {
    const { value, name } = e.target;
    setSearchTerm(value);
    setSearchField(name || 'descripcion');
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const resetSearch = useCallback(() => {
    setSearchTerm('');
    setFilters(initialFilter);
  }, [initialFilter]);

  return {
    searchTerm,
    filters,
    isSearching,
    handleSearchChange,
    handleFilterChange,
    resetSearch,
    setSearchTerm,
    setFilters
  };
};

export default useSearch;