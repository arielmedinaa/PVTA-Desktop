import { RiFileTextLine, RiMore2Line } from "react-icons/ri";
import { LuBeef } from "react-icons/lu";

import { formatNumber } from "../../../../../core/utils/formatNumber"

const TablaProductos = ({ products }) => {
  return (
    <>
      <table className="w-full">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-5 py-4">
              <input
                type="checkbox"
                className="rounded text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th className="px-5 py-4 text-gray-600 font-medium">Product ID</th>
            <th className="px-5 py-4 text-gray-600 font-medium">Product</th>
            <th className="px-5 py-4 text-gray-600 font-medium">Category</th>
            <th className="px-5 py-4 text-gray-600 font-medium">Stock</th>
            <th className="px-5 py-4 text-gray-600 font-medium">Price</th>
            <th className="px-5 py-4 text-gray-600 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr
              key={product.id}
              className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="px-5 py-4">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center space-x-2">
                  <RiFileTextLine className="text-gray-400" />
                  <span>{product.codigo}</span>
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <LuBeef className="w-6 h-6 text-gray-400" />
                  </div>
                  <span className="font-medium">{product.nombre}</span>
                </div>
              </td>
              <td className="px-5 py-4 text-gray-600">{product.familia}</td>
              <td className="px-5 py-4 text-gray-600">{product.stock}</td>
              <td className="px-5 py-4 font-medium text-emerald-600">
                {formatNumber(product?.precio?.find((p) => p.activo === true)?.precio || 0)}
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
    </>
  );
};

export default TablaProductos;
