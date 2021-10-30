import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Cliente from './pages/Clientes';
import Equipos from './pages/Equipos';
import ContratoPDF from './pdf/pdfContrato.js';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/app" replace /> },
        { path: '/app', element: <DashboardApp /> },
        { path: '/clientes', element: <Cliente /> },
        { path: '/productos', element: <Products /> },
        { path: '/equipos', element: <Equipos/>},
        { path: '/contrato', element: <ContratoPDF/>}
      ]
    },
  ]);
}
