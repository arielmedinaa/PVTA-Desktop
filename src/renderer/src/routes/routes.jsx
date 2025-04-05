import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Layout from '../layouts/AppLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { useAuth } from '../core/context/AuthContext';

// Componente para rutas protegidas con contexto
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  // Mientras verifica la autenticación
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, muestra el contenido
  return <Outlet />;
};

// Configuración del Layout con rutas anidadas
const AppLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

// Componente para redireccionar usuarios ya autenticados
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Si ya está autenticado, redirige al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Crear las rutas
const routes = [
  {
    path: '/login',
    element: <PublicRoute><Login /></PublicRoute>
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />
          },
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'products',
            children: [
              {
                index: true,
                element: <div className="p-4">Lista de Productos</div>
              },
              {
                path: 'overview',
                element: <div className="p-4">Resumen de Productos</div>
              },
              {
                path: 'drafts',
                element: <div className="p-4">Borradores de Productos</div>
              }
            ]
          },
          // Clientes
          {
            path: 'customers',
            children: [
              {
                index: true,
                element: <div className="p-4">Lista de Clientes</div>
              },
              {
                path: 'segments',
                element: <div className="p-4">Segmentos de Clientes</div>
              }
            ]
          },
          // Tienda
          {
            path: 'shop',
            element: <div className="p-4">Tienda</div>
          },
          // Ingresos
          {
            path: 'income',
            children: [
              {
                index: true,
                element: <div className="p-4">Resumen de Ingresos</div>
              },
              {
                path: 'transactions',
                element: <div className="p-4">Transacciones</div>
              }
            ]
          },
          // Promociones
          {
            path: 'promote',
            element: <div className="p-4">Promociones</div>
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];

const router = createBrowserRouter(routes);

export default router;