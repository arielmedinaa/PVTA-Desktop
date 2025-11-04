import { 
  RiSearchLine, 
  RiNotification3Line, 
  RiChat3Line, 
  RiAddLine 
} from 'react-icons/ri';

const TopBar = ({ title, user, isMobile, openSidebar, toggleProfileSidebar }) => {
  return (
    <div className="sticky top-0 z-10 bg-transparent backdrop-blur-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        {isMobile && (
          <button
            onClick={openSidebar}
            className="mr-4 text-gray-500 focus:outline-none"
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
        )}
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Busqueda..."
            className="w-64 lg:w-80 py-2 pl-10 pr-4 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <RiSearchLine className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-1 transition-colors">
          <RiAddLine className="h-5 w-5" />
          <span className="hidden md:inline">Crear Modulo</span>
        </button> */}
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors relative">
          <RiNotification3Line className="h-6 w-6 text-gray-600" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors relative">
          <RiChat3Line className="h-6 w-6 text-gray-600" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        {user && (
          <div className="relative">
            <button 
              onClick={toggleProfileSidebar} 
              className="h-10 w-10 rounded-full overflow-hidden border-2 border-white"
            >
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.nombre} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white text-lg font-bold">
                  {user.nombre.charAt(0)}
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;