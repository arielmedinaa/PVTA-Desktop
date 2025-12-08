import { createHashRouter, Navigate, Outlet } from 'react-router-dom';
import Layout from '../layouts/AppLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/modules/home/Dashboard';
import ListaProductos from '../pages/modules/products/ListaProductos';
import SalesPage from '../pages/modules/sales/invoice/FVsales';
import Clientes from '../pages/modules/customers/Clientes';
import Operaciones from '../pages/modules/operaciones/Operaciones';
import Stock from '../pages/modules/stock/Stock';
import { useAuth } from '../core/context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const AppLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

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
                element: <ListaProductos />
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
                element: <Clientes />
              },
              {
                path: 'segments',
                element: <div className="p-4">Segmentos de Clientes</div>
              }
            ]
          },
          {
            path: 'stock',
            element: <Stock />
          },
          // Tienda
          // {
          //   path: 'shop',
          //   element: <div className="p-4">Tienda</div>
          // },
          // Ingresos
          {
            path: 'income',
            children: [
              {
                index: true,
                element: <Operaciones />
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
          },
          
        ]
      }
    ]
  },
  {
    path: 'sales',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <SalesPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];

const router = createHashRouter(routes);

export default router;