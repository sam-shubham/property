import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import App from './App';
import { Buy } from './pages/Buy';
import { Rent } from './pages/Rent';
import { Sell } from './pages/Sell';
import { Listings } from './pages/Listings';
import { TopBuilders } from './pages/TopBuilders';
import { PropertyDetails } from './pages/PropertyDetails';
import { Apartments } from './pages/projects/Apartments';
import { BuilderFloors } from './pages/projects/BuilderFloors';
import { Villas } from './pages/projects/Villas';
import { FarmHouses } from './pages/projects/FarmHouses';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/buy',
    element: <Buy />,
  },
  {
    path: '/rent',
    element: <Rent />,
  },
  {
    path: '/sell',
    element: <Sell />,
  },
  {
    path: '/listings',
    element: <Listings />,
  },
  {
    path: '/top-builders',
    element: <TopBuilders />,
  },
  {
    path: '/property/:id',
    element: <PropertyDetails />,
  },
  // Project subcategory routes
  {
    path: '/projects/apartments',
    element: <Apartments />,
  },
  {
    path: '/projects/builder-floors',
    element: <BuilderFloors />,
  },
  {
    path: '/projects/villas',
    element: <Villas />,
  },
  {
    path: '/projects/farm-houses',
    element: <FarmHouses />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);