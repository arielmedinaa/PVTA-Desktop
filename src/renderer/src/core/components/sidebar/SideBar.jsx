import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiDashboardLine, 
  RiProductHuntLine, 
  RiUserLine, 
  RiShoppingBag3Line, 
  RiLineChartLine,
  RiMegaphoneLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiLogoutBoxLine
} from 'react-icons/ri';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <RiDashboardLine className="w-6 h-6" />,
      path: '/dashboard',
      hasSubmenu: false
    },
    {
      id: 'products',
      title: 'Products',
      icon: <RiProductHuntLine className="w-6 h-6" />,
      path: '/products',
      hasSubmenu: true,
      submenu: [
        { id: 'overview', title: 'Overview', path: '/products/overview', badge: null },
        { id: 'drafts', title: 'Drafts', path: '/products/drafts', badge: 3 },
        { id: 'released', title: 'Released', path: '/products/released', badge: null },
        { id: 'comments', title: 'Comments', path: '/products/comments', badge: null },
        { id: 'scheduled', title: 'Scheduled', path: '/products/scheduled', badge: 8 }
      ]
    },
    {
      id: 'customers',
      title: 'Customers',
      icon: <RiUserLine className="w-6 h-6" />,
      path: '/customers',
      hasSubmenu: true,
      submenu: [
        { id: 'all-customers', title: 'All Customers', path: '/customers', badge: null },
        { id: 'segments', title: 'Segments', path: '/customers/segments', badge: null }
      ]
    },
    {
      id: 'shop',
      title: 'Shop',
      icon: <RiShoppingBag3Line className="w-6 h-6" />,
      path: '/shop',
      hasSubmenu: false
    },
    {
      id: 'income',
      title: 'Income',
      icon: <RiLineChartLine className="w-6 h-6" />,
      path: '/income',
      hasSubmenu: true,
      submenu: [
        { id: 'overview-income', title: 'Overview', path: '/income', badge: null },
        { id: 'transactions', title: 'Transactions', path: '/income/transactions', badge: null }
      ]
    },
    {
      id: 'promote',
      title: 'Promote',
      icon: <RiMegaphoneLine className="w-6 h-6" />,
      path: '/promote',
      hasSubmenu: false
    }
  ];

  const toggleMenu = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
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
      } flex flex-col bg-white bg-opacity-90 backdrop-blur-sm border-r border-gray-200`}
    >
      <div className="p-4 flex flex-col items-center">
        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-10 h-10">
            <circle cx="50" cy="50" r="40" fill="#444" />
            <line x1="30" y1="30" x2="70" y2="70" stroke="#666" strokeWidth="6" />
            <line x1="30" y1="70" x2="70" y2="30" stroke="#666" strokeWidth="6" />
          </svg>
        </div>
        
        {!collapsed && user && (
          <div className="text-center mt-3 mb-2">
            <p className="text-gray-800 font-medium">{user.nombre}</p>
            <p className="text-xs text-gray-500">{user.tipo}</p>
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
              {user.licencia}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id} 
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <button
                onClick={() => item.hasSubmenu ? toggleMenu(item.id) : navigate(item.path)}
                className={`flex items-center w-full p-3 text-left rounded-lg transition-all duration-200 
                  ${activeMenu === item.id ? 'bg-gray-100 text-black' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <div className="flex items-center flex-1">
                  <span className={activeMenu === item.id ? "text-gray-900" : "text-gray-500"}>
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
              </button>

              {/* Submenu */}
              {item.hasSubmenu && (
                <>
                  {/* Versión colapsada - mostrar en hover */}
                  {collapsed && hoveredMenu === item.id && (
                    <div 
                      className="absolute left-full top-0 ml-1 w-48 z-50 bg-white shadow-lg rounded-lg py-2"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className="flex items-center justify-between p-3 mx-2 rounded-lg text-gray-600 hover:bg-gray-50"
                        >
                          <span>{subItem.title}</span>
                          {subItem.badge && (
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              subItem.badge >= 5 ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'
                            }`}>
                              {subItem.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Versión expandida - mostrar con animación */}
                  {!collapsed && (
                    <AnimatePresence>
                      {activeMenu === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="pl-4 mt-1 space-y-1">
                            {item.submenu.map((subItem) => (
                              <motion.li 
                                key={subItem.id}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                              >
                                <Link
                                  to={subItem.path}
                                  className="flex items-center justify-between p-3 rounded-lg text-gray-600 hover:bg-gray-100"
                                >
                                  <span>{subItem.title}</span>
                                  {subItem.badge && (
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                      subItem.badge >= 5 ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'
                                    }`}>
                                      {subItem.badge}
                                    </span>
                                  )}
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-gray-200">
        {!collapsed ? (
          <div className="flex justify-between items-center">
            <button 
              onClick={handleLogout}
              className="flex items-center text-red-500 hover:text-red-700 transition-colors"
            >
              <RiLogoutBoxLine className="w-5 h-5 mr-2" />
              <span>Cerrar Sesión</span>
            </button>
            <button 
              onClick={() => setCollapsed(true)}
              className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
            >
              ←
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 items-center">
            <button 
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Cerrar Sesión"
            >
              <RiLogoutBoxLine className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCollapsed(false)}
              className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
              title="Expandir"
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