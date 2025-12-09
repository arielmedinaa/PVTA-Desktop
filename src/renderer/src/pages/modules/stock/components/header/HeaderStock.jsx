import React, { useMemo } from 'react';
import { listStock } from '../../const/dataStock';
import { 
  RiArrowRightDownLine, 
  RiArrowRightUpLine, 
  RiBox3Line, 
  RiAlertLine,
  RiMoneyDollarCircleLine,
  RiStore2Line
} from 'react-icons/ri';

const HeaderStock = ({ setShowAddModal }) => {
  const stats = useMemo(() => {
    const totalProducts = listStock.length;
    const totalStock = listStock.reduce((sum, item) => sum + item.stock, 0);
    const totalValue = listStock.reduce((sum, item) => sum + (item.stock * item.precio), 0);
    const lowStockItems = listStock.filter(item => item.stock <= item.minStock).length;
    const outOfStockItems = listStock.filter(item => item.stock === 0).length;
    const averageStock = totalStock / totalProducts;

    return {
      totalProducts,
      totalStock,
      totalValue,
      lowStockItems,
      outOfStockItems,
      averageStock: Math.round(averageStock * 100) / 100
    };
  }, []);

  const statCards = [
    {
      id: 1,
      title: 'Total en Stock',
      value: stats.totalStock,
      description: 'Unidades totales',
      icon: <RiBox3Line className="w-5 h-5 text-blue-500" />,
      trend: 'up',
      trendValue: '12%',
    },
    {
      id: 2,
      title: 'Valor Total',
      value: `$${stats.totalValue.toLocaleString()}`,
      description: 'Valor total del inventario',
      icon: <RiMoneyDollarCircleLine className="w-5 h-5 text-green-500" />,
      trend: 'up',
      trendValue: '8%',
    },
    {
      id: 3,
      title: 'Productos',
      value: stats.totalProducts,
      description: 'Productos diferentes',
      icon: <RiStore2Line className="w-5 h-5 text-purple-500" />,
      trend: 'up',
      trendValue: '5%',
    },
    {
      id: 4,
      title: 'Stock Bajo',
      value: stats.lowStockItems,
      description: 'Necesitan reposición',
      icon: <RiAlertLine className="w-5 h-5 text-amber-500" />,
      trend: stats.lowStockItems > 0 ? 'alert' : 'stable',
      trendValue: stats.lowStockItems > 0 ? '¡Atención!' : 'Estable',
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventario</h1>
          <p className="text-gray-500">
            Gestiona tu inventario y controla las entradas y salidas
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-slate-800 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-slate-900 transition-colors text-sm"
          >
            <RiArrowRightUpLine className="text-emerald-400" /> Entrada
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors text-sm"
          >
            <RiArrowRightDownLine className="text-rose-400" /> Salida
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-200">
        {statCards.map((stat) => (
          <div
            key={stat.id}
            className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.id === 4 && stat.trend === 'alert' 
                  ? 'bg-amber-50 text-amber-600' 
                  : 'bg-blue-50 text-blue-600'
              }`}>
                {stat.icon}
              </div>
            </div>
            <div className={`mt-3 text-xs font-medium flex items-center ${
              stat.trend === 'up' 
                ? 'text-green-600' 
                : stat.trend === 'alert' 
                  ? 'text-amber-600' 
                  : 'text-gray-500'
            }`}>
              {stat.trend === 'up' && (
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              )}
              {stat.trendValue}
            </div>
          </div>
        ))}
      </div>
        </>
    )
}

export default HeaderStock