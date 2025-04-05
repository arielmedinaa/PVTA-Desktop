import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import Sidebar from '../core/components/sidebar/SideBar';
import { useAuth } from '../core/context/AuthContext';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  //const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`${
          isMobile 
            ? `fixed inset-y-0 left-0 z-30 transform ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }` 
            : 'relative'
        } transition-all duration-300 ease-in-out`}
      >
        <Sidebar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
        />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile header */}
        {isMobile && (
          <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            
            <div className="flex items-center">
              {user && (
                <div className="text-sm text-right">
                  <p className="font-medium text-gray-800">{user.nombre}</p>
                  <p className="text-xs text-gray-500">{user.tipo}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;