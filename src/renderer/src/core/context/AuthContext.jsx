import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('userData');
      const token = localStorage.getItem('token');
      
      if (userData && token) {
        try {
          const parsedUser = JSON.parse(userData);
          const expirationDate = new Date(parsedUser.expiration_date);
          const now = new Date();
          
          if (expirationDate > now) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem('userData');
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Error al parsear datos de usuario:', error);
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (userData) => {
    try {
      localStorage.setItem('token', userData.access_token);
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
      
      return true;
    } catch (error) {
      console.error('Error al guardar datos de login:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const isAdmin = () => {
    return user && user.tipo === 'administrador';
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin,
    userLicense: user ? user.licencia : null
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;