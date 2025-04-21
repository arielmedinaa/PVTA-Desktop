import React from 'react';
import { motion } from 'framer-motion';
import { RiCloseLine, RiHomeLine, RiUserLine, RiFolder2Line, RiPriceTag3Line, RiShieldLine, RiSettings4Line } from 'react-icons/ri';

const ProfileSidebar = ({ isOpen, onClose, user }) => {
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const mockUser = {
    ...user,
    fullName: user?.nombre || 'Jaydon Frankie',
    email: user?.email || 'demo@minimals.cc',
    avatarUrl: user?.avatar || 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
    alternateAvatars: [
      'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
      'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
      'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg'
    ]
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={onClose}
        />
      )}
      
      <motion.div 
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex-shrink-0 overflow-visible relative pt-4 pb-4">
          <div className="p-4 relative z-20">
            <button 
              onClick={onClose}
              className="p-2 absolute top-4 left-4"
            >
              <RiCloseLine className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          
          <div className="relative mt-8 px-4">
            <div className="absolute -top-4 left-1 right-1 h-40 bg-gradient-to-br from-blue-500 via-purple-400 to-indigo-600 rounded-xl -z-10"></div>
            <div className="bg-white rounded-xl shadow-lg p-6 pb-8 relative z-10">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100">
                </div>
              </div>
              
              <div className="pt-14 text-center">
                <h2 className="text-xl font-bold mt-2">{mockUser.fullName}</h2>
                <p className="text-gray-500 text-sm">{mockUser.email}</p>
                
                <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                  <div>
                    <div className="font-bold">1492</div>
                    <div className="text-xs text-gray-500">Posts</div>
                  </div>
                  <div>
                    <div className="font-bold">13M</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div>
                    <div className="font-bold">97</div>
                    <div className="text-xs text-gray-500">Following</div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4 space-x-2">
                  {mockUser.alternateAvatars.map((avatar, index) => (
                    <div key={index} className="w-10 h-10 rounded-full overflow-hidden border border-white bg-slate-100">
                    </div>
                  ))}
                  <button className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-white">
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="border-gray-200 my-4"></div>
            <nav className="px-4">
              <ul className="space-y-1">
                <li>
                  <a href="#" className="flex items-center py-2 px-3 rounded-lg text-gray-600 hover:bg-gray-100">
                    <RiHomeLine className="w-6 h-6 text-gray-500 mr-3" />
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center py-2 px-3 rounded-lg text-gray-600 hover:bg-gray-100">
                    <RiUserLine className="w-6 h-6 text-gray-500 mr-3" />
                    <span>Profile</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between py-2 px-3 rounded-lg text-gray-600 hover:bg-gray-100">
                    <div className="flex items-center">
                      <RiFolder2Line className="w-6 h-6 text-gray-500 mr-3" />
                      <span>Projects</span>
                    </div>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">3</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center py-2 px-3 rounded-lg text-gray-600 hover:bg-gray-100">
                    <RiPriceTag3Line className="w-6 h-6 text-gray-500 mr-3" />
                    <span>Subscription</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center py-2 px-3 rounded-lg text-gray-600 hover:bg-gray-100">
                    <RiShieldLine className="w-6 h-6 text-gray-500 mr-3" />
                    <span>Security</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center py-2 px-3 rounded-lg text-gray-600 hover:bg-gray-100">
                    <RiSettings4Line className="w-6 h-6 text-gray-500 mr-3" />
                    <span>Account settings</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="mt-auto p-4 space-y-4">
            <div className="rounded-lg overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white">
                <h3 className="text-xl font-bold">35% OFF</h3>
                <p>Power up Productivity!</p>
                <div className="flex justify-end">
                  <div className="w-16 h-16 opacity-50">
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full py-3 text-center rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors"
            >
              Cerrar Sesion
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProfileSidebar;