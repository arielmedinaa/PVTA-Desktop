import { useState } from 'react';
//import { useAuth } from '../../../core/context/AuthContext';
import {
  RiArrowRightSLine,
  RiUserLine,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri';
import Select from '../../../core/components/select/SelectOptions';

const Dashboard = () => {
  //const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('Last month');
  const [productTimeRange, setProductTimeRange] = useState('Last 7 days');
  const timeOptions = ['Last 7 days', 'Last month', 'Last year'];

  const newCustomers = {
    count: 857,
    avatars: [
      { id: 1, name: 'Gladyce', image: 'https://randomuser.me/api/portraits/women/40.jpg' },
      { id: 2, name: 'Elbert', image: 'https://randomuser.me/api/portraits/men/36.jpg' },
      { id: 3, name: 'Dash', image: 'https://randomuser.me/api/portraits/men/42.jpg' },
      { id: 4, name: 'Joyce', image: 'https://randomuser.me/api/portraits/women/24.jpg' },
      { id: 5, name: 'Marina', image: 'https://randomuser.me/api/portraits/women/19.jpg' }
    ]
  };

  const products = [
    {
      id: 1,
      name: 'Crypter - NFT UI Kit',
      price: '$3,250.00',
      status: 'En Stock',
      image: 'https://assets.materialup.com/uploads/08c9928a-4048-47a9-aa44-9aba6244c6e0/preview.jpg'
    },
    {
      id: 2,
      name: 'Bento Pro 2.0 Illustrations',
      price: '$7,890.00',
      status: 'En Stock',
      image: 'https://assets.materialup.com/uploads/752acb9f-cf4f-4612-9c5f-2817c676eef3/preview.png'
    },
    {
      id: 3,
      name: 'Fleet - travel shopping kit',
      price: '$1,500.00',
      status: 'Sin Stock',
      image: 'https://assets.materialup.com/uploads/c389ae0e-dcf2-4d11-87cd-b6b0ea321ba7/preview.jpg'
    },
    {
      id: 4,
      name: 'SimpleSocial UI Design Kit',
      price: '$9,999.99',
      status: 'En Stock',
      image: 'https://assets.materialup.com/uploads/e451d3e6-5e0a-49bd-bce8-5b8146c38db1/preview.jpg'
    },
    {
      id: 5,
      name: 'Bento Pro vol. 2',
      price: '$4,750.00',
      status: 'En Stock',
      image: 'https://assets.materialup.com/uploads/ae671650-ed3c-4207-9f62-5f4e8b5f0c9e/preview.jpg'
    }
  ];

  return (
    <div className="space-y-6">
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
          <h3 className="text-lg font-medium mb-2">857 nuevos clientes!</h3>
          <p className="text-gray-500 text-sm mb-6">Dale un mensaje de bienvenida a tus clientes.</p>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {newCustomers.avatars.map(customer => (
              <div key={customer.id} className="flex flex-col items-center flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-slate-100">
                  {/* <img
                    src={customer.image}
                    alt={customer.name}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
                <p className="text-sm">{customer.name}</p>
              </div>
            ))}
            <div className="flex items-center justify-center flex-shrink-0">
              <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <RiArrowRightSLine className="w-6 h-6 text-gray-400" />
              </button>
              <span className="ml-2 text-sm text-gray-500">Ver todo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Productos mas Vendidos</h2>
            <div className="flex items-center">
              <Select
                value={timeRange}
                onChange={setTimeRange}
                options={timeOptions}
              />
            </div>
          </div>

          <div className="p-6 overflow-hidden">
            <div className="space-y-4">
              {products.map(product => (
                <div key={product.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${product.status === 'En Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{product.price}</div>
                    {product.id === 2 && (
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                All products
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className='bg-white rounded-3xl shadow-sm p-6'>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Product view</h2>
            <div className="flex items-center">
              <select
                value={productTimeRange}
                onChange={(e) => setProductTimeRange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Last 7 days</option>
                <option>Last month</option>
                <option>Last year</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 h-72 relative">
            <div className="absolute inset-0 flex items-end justify-around p-6">
              <div className="h-20 w-6 bg-gray-200 rounded-t-md"></div>
              <div className="h-36 w-6 bg-gray-200 rounded-t-md"></div>
              <div className="h-28 w-6 bg-gray-200 rounded-t-md"></div>
              <div className="h-48 w-6 bg-gray-200 rounded-t-md"></div>
              <div className="h-32 w-6 bg-gray-200 rounded-t-md"></div>
              <div className="h-56 w-6 bg-green-400 rounded-t-md relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  2.2m
                </div>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div className="h-24 w-6 bg-gray-200 rounded-t-md"></div>
              <div className="h-16 w-6 bg-gray-200 rounded-t-md"></div>
            </div>

            <div className="absolute bottom-6 left-6 text-3xl font-bold text-gray-300">
              $10.2m
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;