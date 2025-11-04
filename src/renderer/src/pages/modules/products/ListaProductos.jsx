import React, { useEffect, useState } from "react";
import ModalCreateProd from "./components/modals/modalCreateProducts";
import { RiSearchLine, RiFilterLine } from "react-icons/ri";
import TablaProductos from "./components/table/TablaProductos";
import Header from "./components/header/HeaderListaProductos";
import Paginacion1 from "../../../core/components/pagination/Paginacion1";
import { useListData } from "../../../core/hooks/useListData";

const ListaProductos = () => {
  const { fetchListData, listData } = useListData();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [products, setProducts] = useState([
    {
      id: "PRD-001",
      nombre: "Laptop HP EliteBook",
      categoria: "Tecnología",
      status: "In Stock",
      stock: 15,
      price: 1250.99,
      image:
        "https://images.unsplash.com/photo-1496181133205-80b16596d4a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    },
    {
      id: "PRD-002",
      nombre: "Smartphone Samsung S21",
      categoria: "Tecnología",
      status: "Low Stock",
      stock: 3,
      price: 899.99,
      image:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    },
    {
      id: "PRD-003",
      nombre: "Audífonos Sony WH-1000XM4",
      categoria: "Audio",
      status: "In Stock",
      stock: 22,
      price: 349.99,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4e9c593b69e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    },
    {
      id: "PRD-004",
      nombre: "Cámara Canon EOS R5",
      categoria: "Fotografía",
      status: "Out of Stock",
      stock: 0,
      price: 3899.99,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    },
    {
      id: "PRD-005",
      nombre: 'Tablet iPad Pro 12.9"',
      categoria: "Tecnología",
      status: "In Stock",
      stock: 8,
      price: 1099.99,
      image:
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-amber-100 text-amber-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filters = ["All", "In Stock", "Low Stock", "Out of Stock"];

//   useEffect(() => {
//     fetchListData("productos");
//     if (listData) {
//       setProducts(listData?.dataResponse);
//     }
//   }, [fetchListData]);

  return (
    <>
      <div className="space-y-8">
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <Header setIsModalOpen={setIsModalOpen} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 rounded-3xl bg-gray-50 border border-gray-100 p-2">
            {summaryData.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-center mb-2">
                  <span className={`text-${item.color}-600 mr-2 text-lg`}>
                    {item.icon}
                  </span>
                  <span className="text-gray-600">{item.label}</span>
                </div>
                <div className="text-3xl font-bold mb-1">{item.value}</div>
                <div className="text-xs text-gray-500">{item.lastUpdate}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between gap-3">
              <div className="flex space-x-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedFilter === filter
                        ? "bg-blue-500 text-white"
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
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                getStatusColor={getStatusColor}
              />
            </div>

            <Paginacion1 data={products} />
          </div>
        </div>
      </div>
      <ModalCreateProd
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ListaProductos;
