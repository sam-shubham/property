import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Buy } from './pages/Buy';
import { Rent } from './pages/Rent';
import { Sell } from './pages/Sell';
import { PropertyDetails } from './pages/PropertyDetails';
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
    path: '/property/:id',
    element: <PropertyDetails />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);