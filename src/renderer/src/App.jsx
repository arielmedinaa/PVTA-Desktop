import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import { AuthProvider } from './core/context/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;