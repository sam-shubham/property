import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollToTop } from './components/ScrollToTop';

// Import your components
import App from './App';
import { Buy } from './pages/Buy';
import { Rent } from './pages/Rent';
import { Sell } from './pages/Sell';
import { Listings } from './pages/Listings';
import { TopBuilders } from './pages/TopBuilders';
import { PropertyDetails } from './pages/PropertyDetails';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Apartments } from './pages/projects/Apartments';
import { BuilderFloors } from './pages/projects/BuilderFloors';
import { Villas } from './pages/projects/Villas';
import { FarmHouses } from './pages/projects/FarmHouses';
import { AdminDashboard } from './pages/admin/Dashboard';
import { PropertyApproval } from './pages/admin/PropertyApproval';
import { AdminLogin } from './pages/admin/Login';

import './index.css';

// Create a Root Layout component that includes ScrollToTop
const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/buy', element: <Buy /> },
      { path: '/rent', element: <Rent /> },
      { path: '/sell', element: <Sell /> },
      { path: '/listings', element: <Listings /> },
      { path: '/top-builders', element: <TopBuilders /> },
      { path: '/property/:id', element: <PropertyDetails /> },
      { path: '/project/:id', element: <PropertyDetails /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      
      // Projects section
      { path: '/projects/apartments', element: <Apartments /> },
      { path: '/projects/builder-floors', element: <BuilderFloors /> },
      { path: '/projects/villas', element: <Villas /> },
      { path: '/projects/farm-houses', element: <FarmHouses /> },
    ],
  },
  // Admin section should be outside the RootLayout to avoid ScrollToTop issues with admin routes
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '/admin/properties', element: <PropertyApproval /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);