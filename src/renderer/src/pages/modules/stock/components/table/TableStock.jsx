import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import Paginacion1 from '../../../../../core/components/pagination/Paginacion1';
import { LuBeef } from 'react-icons/lu';
import { RiMore2Line } from 'react-icons/ri';

const ITEMS_PER_PAGE = 5;

const TableStock = ({ products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  //   useEffect(() => {
  //     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  //     const endIndex = startIndex + ITEMS_PER_PAGE;
  //     setPaginatedProducts(products.slice(startIndex, endIndex));
  //   }, [products, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginationData = {
    currentPage,
    totalPages,
    totalItems: products.length,
    itemsPerPage: ITEMS_PER_PAGE,
    onPageChange: handlePageChange
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((item) => {
              const product = item.productos;
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                        <LuBeef className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{product.nombre}</div>
                        <div className="text-gray-500">ID: {product.codigo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {product.categoria || 'Sin categoría'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{item.stock} unidades</div>
                    <div className="text-xs text-gray-500">Mínimo: {item.minStock} unidades</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    ${item.precio?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${item.stock <= item.minStock
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : item.stock <= item.minStock * 2
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          : 'bg-green-100 text-green-800 border border-green-200'
                      }`}>
                      {item.stock <= item.minStock ? 'Bajo stock' : item.stock <= item.minStock * 2 ? 'Stock medio' : 'En stock'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full">
                      <RiMore2Line className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Paginacion1 data={paginationData} />
    </div>
  );
};

export default TableStock;