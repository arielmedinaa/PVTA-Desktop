import React, { useState } from 'react';
import Paginacion1 from '../../../../../core/components/pagination/Paginacion1';
import { LuBeef } from 'react-icons/lu';
import { RiMore2Line } from 'react-icons/ri';

const ITEMS_PER_PAGE = 5;

const TableStock = ({ products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // useEffect(() => {
  //   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  //   const endIndex = startIndex + ITEMS_PER_PAGE;
  //   setPaginatedProducts(products.slice(startIndex, endIndex));
  // }, [products, currentPage]);

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
            {products.map((product) => (
              <tr key={product.id } className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                      {product.icon || <LuBeef className="h-5 w-5 text-gray-500" />}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.productos?.nombre || 'Sin nombre'}</div>
                      <div className="text-sm text-gray-500">{product.productos?.codigo || 'Sin código'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.productos?.categoria || 'Sin categoría'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.stock} unidades</div>
                  <div className="text-xs text-gray-500">Mínimo: {product.minStock || 'No definido'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.precio?.toFixed(2) || '0.00'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.stock <= (product.minStock || 0) 
                      ? 'bg-red-100 text-red-800' 
                      : product.stock <= (product.minStock * 2 || 0) 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {product.stock <= (product.minStock || 0) 
                      ? 'Bajo stock' 
                      : product.stock <= (product.minStock * 2 || 0) 
                        ? 'Stock medio' 
                        : 'En stock'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full">
                  <RiMore2Line className="w-5 h-5" />
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <Paginacion1 data={paginationData} />
      </div>
    </div>
  );
};

export default TableStock;