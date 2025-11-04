import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
//import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiDashboardLine, 
  RiProductHuntLine, 
  RiUserLine, 
  RiShoppingBag3Line, 
  RiLineChartLine,
  RiMegaphoneLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiLogoutBoxLine,
  RiShoppingCartLine
} from 'react-icons/ri';

const Sidebar = ({ collapsed, setCollapsed, activeRoute = '/' }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Home',
      icon: <RiDashboardLine className="w-6 h-6" />,
      path: '/dashboard',
      hasSubmenu: false
    },
    {
      id: 'products',
      title: 'Productos',
      icon: <RiProductHuntLine className="w-6 h-6" />,
      path: '/products',
      hasSubmenu: false
    },
    {
      id: 'customers',
      title: 'Clientes',
      icon: <RiUserLine className="w-6 h-6" />,
      path: '/customers',
      hasSubmenu: false
    },
    // {
    //   id: 'shop',
    //   title: 'Shop',
    //   icon: <RiShoppingBag3Line className="w-6 h-6" />,
    //   path: '/shop',
    //   hasSubmenu: false
    // },
    {
      id: 'income',
      title: 'Operaciones',
      icon: <RiLineChartLine className="w-6 h-6" />,
      path: '/income',
      hasSubmenu: false
    },
    // {
    //   id: 'promote',
    //   title: 'Promociones',
    //   icon: <RiMegaphoneLine className="w-6 h-6" />,
    //   path: '/promote',
    //   hasSubmenu: false
    // },
    {
      id: 'sales',
      title: 'Sales',
      icon: <RiShoppingCartLine className="w-6 h-6" />,
      path: '/sales',
      hasSubmenu: false
    }
  ];

  const isActive = (path) => {
    return activeRoute && activeRoute.startsWith(path);
  };

  const handleMouseEnter = (menuId) => {
    setHoveredMenu(menuId);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div 
      className={`h-screen transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } flex flex-col bg-slate-50/60 backdrop-blur-sm`}
    >
      <div className="p-4 flex justify-center">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-10 h-10">
            <circle cx="50" cy="50" r="40" fill="#444" />
          </svg>
        </div>
      </div>

      <div className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li 
              key={item.id} 
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <Link
                to={item.path}
                className={`flex items-center w-full p-3 text-left rounded-lg transition-all duration-200 ${
                  isActive(item.path) ? 'bg-white bg-opacity-80 shadow-sm' : 'hover:bg-white hover:bg-opacity-60'
                }`}
              >
                <div className="flex items-center flex-1">
                  <span className={isActive(item.path) ? "text-gray-600" : "text-gray-500"}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="ml-3 font-medium">
                      {item.title}
                    </span>
                  )}
                </div>
                {!collapsed && item.hasSubmenu && (
                  <span className="text-gray-400">
                    {activeMenu === item.id ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4">
        {!collapsed ? (
          <div className="flex justify-between items-center">
            <button 
              onClick={handleLogout}
              className="flex items-center text-red-500 hover:text-red-600 transition-colors"
            >
              <RiLogoutBoxLine className="w-5 h-5 mr-2" />
              <span>Cerrar Sesion</span>
            </button>
            <button 
              onClick={() => setCollapsed(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-white hover:bg-opacity-60 transition-colors"
            >
              ←
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 items-center">
            <button 
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Logout"
            >
              <RiLogoutBoxLine className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCollapsed(false)}
              className="p-2 rounded-lg text-gray-600 hover:bg-white hover:bg-opacity-60 transition-colors"
              title="Expand"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;