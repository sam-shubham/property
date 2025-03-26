import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  // Check if user is admin
  const isAdmin = () => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) return false;
    
    try {
      const parsedAuth = JSON.parse(adminAuth);
      return parsedAuth.isAdmin === true;
    } catch (e) {
      return false;
    }
  };

  return isAdmin() ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;