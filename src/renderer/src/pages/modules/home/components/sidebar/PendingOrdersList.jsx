import { useSearch } from '../../hooks/useSearch';

const PendingOrdersList = ({ orders, setSelectedOrder }) => {
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(orders, ['orderId', 'customer']);
  const handleInvoice = (orderId) => {
    console.log('Facturar pedido', orderId);
  };

  const handleViewAll = () => {
    console.log('Ver todos los pedidos');
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="text-lg font-bold mb-3">Pedidos Pendientes</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar pedidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {filteredItems.map((order) => (
          <div
            key={order.id}
            className="p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelectedOrder(order)}
          >
            <div className="flex justify-between items-center gap-3">
              <div className="flex-1">
                <h4 className="font-medium">{order.orderId}</h4>
                <p className="text-sm text-gray-500">Cliente: {order.customer}</p>
                <div className="mt-1 flex gap-3 text-xs text-gray-500">
                  <span>{order.items} artículos</span>
                  <span>•</span>
                  <span>${order.amount.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); handleInvoice(order.orderId); }}
                className="px-4 py-1.5 bg-gray-600 hover:bg-slate-900 text-white text-xs font-medium rounded-full transition-colors whitespace-nowrap"
              >
                Facturar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 text-center border-t border-gray-100">
        <button 
          onClick={handleViewAll}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Ver todos los pedidos
        </button>
      </div>
    </div>
    </>
  );
};

export default PendingOrdersList;
