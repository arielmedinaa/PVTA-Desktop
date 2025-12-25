import { useCallback } from "react";
import ModalCreateProd from "./components/modals/modalCreateProducts";
import { RiSearchLine, RiFilterLine } from "react-icons/ri";

import TablaProductos from "./components/table/TablaProductos";
import Header from "./components/header/HeaderListaProductos";
import Paginacion1 from "../../../core/components/pagination/Paginacion1";
import SummaryProducts from "./components/summary/SummaryProducts";
import useProducts from "./hooks/useProducts";
import useSearch from "../../../core/hooks/useSearch";
import { modes } from "../../../core/constants/GlobalUtilsData";

const ListaProductos = () => {
  const {
    currentPage,
    itemsPerPage,
    total,
    selectedFilter,
    isModalOpen,
    loading,
    products,
    
    // Handlers
    setIsModalOpen,
    setSelectedFilter,
    handlePageChange,
    handlePageSizeChange,
    addProduct,
    refreshProducts,
    handleSearch
  } = useProducts(4);
  
  const summaryData = [
    {
      label: "En Stock",
      value: "$2,307.40",
      color: "green",
      icon: "↑",
      lastUpdate: "Ultima actualizacioin: Jan 24",
    },
    {
      label: "Saldo Total",
      value: "$34,307.40",
      color: "blue",
      icon: "→",
      lastUpdate: "Ultima actualizacion: Jan 24",
    },
    {
      label: "Poco Stock",
      value: "$34,307.40",
      color: "amber",
      icon: "⚠",
      lastUpdate: "Ultima actualizacion: Jan 24",
    },
    {
      label: "Sin Stock",
      value: "$256.87",
      color: "red",
      icon: "✕",
      lastUpdate: "Ultima actualizacion: Jan 24",
    },
  ];

  const filters = ["All", "In Stock", "Low Stock", "Out of Stock"];

  const {
    searchTerm,
    handleSearchChange,
    isSearching
  } = useSearch({
    onSearch: useCallback((searchParams) => {
      handleSearch(searchParams.codigo || '');
    }, [handleSearch]),
    debounceDelay: 500,
    searchField: 'codigo'
  });

  return (
    <>
      <div className="space-y-8">
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <Header setIsModalOpen={setIsModalOpen} />

          <SummaryProducts summaryData={summaryData} />

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between gap-3">
              <div className="flex space-x-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === filter
                      ? "bg-slate-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                    name="codigo"
                    placeholder="Buscar por descripción..."
                    className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={handleSearchChange}
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

            <div className="overflow-x-auto">
              <TablaProductos
                products={products}
              />
            </div>

            <Paginacion1
              currentPage={currentPage}
              totalItems={total}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </div>
      <ModalCreateProd
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={addProduct}
        mode={modes.INS}
      />
    </>
  );
};

export default ListaProductos;