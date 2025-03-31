import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import { AdminRoute } from './components/AdminRoute';
import { ProtectedRoute } from './components/ProtectedRoute';
import { SellerDashboard } from './pages/seller/Dashboard';
import { AgentDashboard } from './pages/agent/Dashboard';

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
import { Settings } from './pages/admin/Settings';
import { AdminSetup } from './pages/AdminSetup';

// Import placeholder components for missing routes
import { PlaceholderPage } from './components/PlaceholderPage';

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
      
      // Seller routes
      { path: '/seller/dashboard', element: <ProtectedRoute allowedRoles={['seller']}><SellerDashboard /></ProtectedRoute> },
      { path: '/seller/properties', element: <ProtectedRoute allowedRoles={['seller']}><PlaceholderPage title="My Properties" description="View and manage all your property listings" /></ProtectedRoute> },
      { path: '/seller/add-property', element: <ProtectedRoute allowedRoles={['seller']}><PlaceholderPage title="Add New Property" description="Create a new property listing to sell or rent" /></ProtectedRoute> },
      { path: '/seller/property/:id', element: <ProtectedRoute allowedRoles={['seller']}><PlaceholderPage title="Property Details" description="View detailed information about your property" /></ProtectedRoute> },
      { path: '/seller/property/:id/edit', element: <ProtectedRoute allowedRoles={['seller']}><PlaceholderPage title="Edit Property" description="Update information for your property listing" /></ProtectedRoute> },
      { path: '/seller/inquiries', element: <ProtectedRoute allowedRoles={['seller']}><PlaceholderPage title="Inquiries" description="View and respond to inquiries about your properties" /></ProtectedRoute> },
      { path: '/seller/schedule', element: <ProtectedRoute allowedRoles={['seller']}><PlaceholderPage title="Schedule Viewings" description="Manage appointments for property viewings" /></ProtectedRoute> },
      { path: '/seller/settings', element: <ProtectedRoute allowedRoles={['seller']}><PlaceholderPage title="Account Settings" description="Manage your seller account settings" /></ProtectedRoute> },
      
      // Agent routes
      { path: '/agent/dashboard', element: <ProtectedRoute allowedRoles={['agent']}><AgentDashboard /></ProtectedRoute> },
      { path: '/agent/properties', element: <ProtectedRoute allowedRoles={['agent']}><PlaceholderPage title="My Properties" description="View and manage all your property listings" /></ProtectedRoute> },
      { path: '/agent/add-property', element: <ProtectedRoute allowedRoles={['agent']}><PlaceholderPage title="Add New Property" description="Create a new property listing to sell or rent" /></ProtectedRoute> },
      { path: '/agent/property/:id', element: <ProtectedRoute allowedRoles={['agent']}><PlaceholderPage title="Property Details" description="View detailed information about your property" /></ProtectedRoute> },
      { path: '/agent/property/:id/edit', element: <ProtectedRoute allowedRoles={['agent']}><PlaceholderPage title="Edit Property" description="Update information for your property listing" /></ProtectedRoute> },
      { path: '/agent/clients', element: <ProtectedRoute allowedRoles={['agent']}><PlaceholderPage title="My Clients" description="Manage your client relationships" /></ProtectedRoute> },
      { path: '/agent/schedule', element: <ProtectedRoute allowedRoles={['agent']}><PlaceholderPage title="Appointments" description="Manage your viewing and client appointments" /></ProtectedRoute> },
      { path: '/agent/schedule/add', element: <ProtectedRoute allowedRoles={['agent']}><PlaceholderPage title="Schedule Appointment" description="Create a new appointment with a client" /></ProtectedRoute> },
      { path: '/agent/leads', element: <ProtectedRoute allowedRoles={['agent']}><PlaceholderPage title="Leads Management" description="Track and manage potential client leads" /></ProtectedRoute> },
      { path: '/agent/settings', element: <ProtectedRoute allowedRoles={['agent']}><PlaceholderPage title="Account Settings" description="Manage your agent account settings" /></ProtectedRoute> },
    ],
  },
  // Admin section should be outside the RootLayout to avoid ScrollToTop issues with admin routes
  { path: '/admin/login', element: <AdminLogin /> },
  { 
    path: '/admin', 
    element: <AdminRoute><AdminDashboard /></AdminRoute> 
  },
  { 
    path: '/admin/properties', 
    element: <AdminRoute><PropertyApproval /></AdminRoute> 
  },
  { 
    path: '/admin/users', 
    element: <AdminRoute><PlaceholderPage title="User Management" description="Manage all users of the platform" /></AdminRoute> 
  },
  { 
    path: '/admin/settings', 
    element: <AdminRoute><Settings /></AdminRoute> 
  },
  { path: '/admin-setup', element: <AdminSetup /> }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);