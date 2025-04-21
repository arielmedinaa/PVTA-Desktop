import { useState, useEffect } from 'react';
import Sidebar from '../core/components/sidebar/SideBar';
import TopBar from '../core/components/topbar/TopBar';
import { useAuth } from '../core/context/AuthContext';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileSidebar from '../core/components/sidebar/ProfileSideBar';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

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


  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/products')) return 'Products';
    if (path.includes('/customers')) return 'Customers';
    if (path.includes('/shop')) return 'Shop';
    if (path.includes('/income')) return 'Income';
    if (path.includes('/promote')) return 'Promote';
    return 'Dashboard';
  };

  const toggleProfileSidebar = () => {
    setProfileSidebarOpen(!profileSidebarOpen);
  };

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
        } transition-all duration-300 ease-in-out bg-transparent`}
      >
        <Sidebar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed}
          activeRoute={location.pathname}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          title={getPageTitle()} 
          user={user} 
          isMobile={isMobile}
          openSidebar={() => setSidebarOpen(true)}
          toggleProfileSidebar={toggleProfileSidebar}
        />

        {/* Content area with animations */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Profile Sidebar */}
      <ProfileSidebar
        isOpen={profileSidebarOpen} 
        onClose={() => setProfileSidebarOpen(false)} 
        user={user}
      />
    </div>
  );
};

export default Layout;