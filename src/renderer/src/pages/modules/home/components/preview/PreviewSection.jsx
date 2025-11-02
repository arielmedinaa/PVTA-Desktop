import { RiUserLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import Select from '../../../../../core/components/select/SelectOptions';

const PreviewSection = ({ timeRange, setTimeRange, timeOptions, orders }) => {
  const handleInvoice = (orderId) => {
    console.log('Facturar pedido', orderId);
  };

  const handleViewDetails = (orderId) => {
    console.log('Ver detalles de', orderId);
  };
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Vista Previa</h2>
        <div className="flex items-center">
          <Select
            value={timeRange}
            onChange={setTimeRange}
            options={timeOptions}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 rounded-3xl bg-gray-50 border border-gray-100">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <RiUserLine className="w-6 h-6 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium">Clientes</h3>
          </div>

          <div className="flex items-baseline mb-1">
            <span className="text-5xl font-bold">1,293</span>
            <span className="ml-4 px-2 py-1 rounded-md bg-red-100 text-red-800 text-sm">
              ↓ 36.8%
            </span>
          </div>
          <p className="text-gray-500 text-sm">vs ultimo mes</p>
        </div>
        <div className="border border-gray-100 shadow-sm rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <RiMoneyDollarCircleLine className="w-6 h-6 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium">Balance</h3>
          </div>

          <div className="flex items-baseline mb-1">
            <span className="text-5xl font-bold">256k</span>
            <span className="ml-4 px-2 py-1 rounded-md bg-green-100 text-green-800 text-sm">
              ↑ 36.8%
            </span>
          </div>
          <p className="text-gray-500 text-sm">vs ultimo mes</p>
        </div>
      </div>
      <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium">{order.orderId}</h4>
                <p className="text-sm text-gray-500">Cliente: {order.customer}</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                Pendiente
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Artículos:</span>
                <span>{order.items}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total:</span>
                <span className="font-medium">${order.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Hora:</span>
                <span>{order.time}</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => handleInvoice(order.orderId)}
                className="flex-1 py-2 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
              >
                Facturar
              </button>
              <button 
                onClick={() => handleViewDetails(order.orderId)}
                className="flex-1 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}

        {/* Facturar Button */}
        <div className="flex items-stretch">
          <button
            onClick={() => console.log('Abrir módulo de ventas')}
            className="flex-1 flex flex-col items-center justify-center bg-blue-500 text-white rounded-xl p-6 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <div className="bg-blue-500/50 rounded-full mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h4 className="font-semibold text-lg mb-1">Facturar</h4>
            <p className="text-white text-sm text-center">Haz click para iniciar una nueva factura</p>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PreviewSection;
