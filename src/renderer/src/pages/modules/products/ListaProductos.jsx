import { useCallback, useEffect, useMemo, useState } from "react";
import ModalCreateProd from "./components/modals/modalCreateProducts";
import { RiSearchLine, RiFilterLine } from "react-icons/ri";

import TablaProductos from "./components/table/TablaProductos";
import Header from "./components/header/HeaderListaProductos";
import Paginacion1 from "../../../core/components/pagination/Paginacion1";
import SummaryProducts from "./components/summary/SummaryProducts";
import { modes } from "../../../core/constants/GlobalUtilsData";

import useListProductos from "./hooks/useListProductos";
import useSearch from "../../../core/hooks/useSearch";

const ListaProductos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFilter = useMemo(() => ({
    codigo: "",
    descripcion: "",
    categoria: "",
    marca: "",
    precioini: "",
    preciofin: "",
    limit: itemsPerPage,
    offset: 0,
    orden: "codigo",
    tipOrden: "ASC",
  }), [itemsPerPage]);

  const {
    productos,
    total,
    setFilter,
    setTotal, // Asegúrate de que tu hook exponga esta función
  } = useListProductos(initialFilter, { callBack: true });

  const {
    searchTerm,
    handleSearchChange,
    isSearching
  } = useSearch({
    onSearch: useCallback((searchParams) => {
      setFilter(prev => {
        const newFilter = {
          ...prev,
          ...searchParams,
          offset: 0,
          limit: itemsPerPage
        };
        if (searchParams.codigo === undefined) {
          newFilter.codigo = "";
        } else if (searchParams.codigo === "") {
          newFilter.codigo = "";
        }
        return newFilter;
      });
      setCurrentPage(1);
    }, [setFilter, itemsPerPage]),
    debounceDelay: 500,
    searchField: 'codigo'
  });

  useEffect(() => {
    setFilter(prev => ({
      ...prev,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage
    }));
  }, [currentPage, itemsPerPage, setFilter]);

  const [products, setProducts] = useState(productos);
  
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

  useEffect(() => {
    if (productos) {
      setProducts(productos);
    }
  }, [productos]);

  // Función para manejar la adición optimista de productos
  const handleAddProduct = useCallback((newProduct) => {
    const currentOffset = (currentPage - 1) * itemsPerPage;
    const currentPageProducts = products.length;
    if (currentPageProducts < itemsPerPage) {
      setProducts(prev => [...prev, newProduct]);
    }
    
    setTotal(prevTotal => prevTotal + 1);
    
    const newTotal = total + 1;
    const newTotalPages = Math.ceil(newTotal / itemsPerPage);
    
    if (currentPageProducts >= itemsPerPage && currentPage === Math.ceil(total / itemsPerPage)) {
      setCurrentPage(newTotalPages);
    }
  }, [currentPage, itemsPerPage, products.length, total, setTotal]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    const newPageSize = Number(newSize);
    setItemsPerPage(newPageSize);
    setCurrentPage(1);
  };

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
        onAddProduct={handleAddProduct}
        mode={modes.INS}
      />
    </>
  );
};

export default ListaProductos;