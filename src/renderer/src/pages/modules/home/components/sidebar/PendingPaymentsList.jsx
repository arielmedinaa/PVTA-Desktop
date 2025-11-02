import { useSearch } from '../../hooks/useSearch';

const PendingPaymentsList = ({ payments }) => {
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(payments, ['customer', 'dueDate']);

  const handleCollect = (customer, amount) => {
    console.log(`Cobrar pago de ${customer}`, amount);
  };

  const handleViewAll = () => {
    console.log('Ver todos los pagos');
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6 pb-4">
        <h2 className="text-lg font-bold mb-3">Pagos Pendientes</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar pagos..."
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
        {filteredItems.map((payment) => (
          <div key={payment.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-center gap-3">
              <div className="flex-1">
                <h4 className="font-medium">{payment.customer}</h4>
                <p className="text-sm text-gray-500">Vence: {payment.dueDate}</p>
                <div className="mt-1 text-xs text-green-600 font-medium">
                  ${payment.amount.toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => handleCollect(payment.customer, payment.amount)}
                className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-full transition-colors whitespace-nowrap"
              >
                Cobrar
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
          Ver todos los pagos
        </button>
      </div>
    </div>
  );
};

export default PendingPaymentsList;
