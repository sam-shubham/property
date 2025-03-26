import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { ReactNode } from 'react';

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Check if user is an admin
          try {
            const adminDoc = await getDoc(doc(db, 'admins', user.uid));
            setIsAuthenticated(adminDoc.exists());
          } catch (error) {
            console.error("Error checking admin status:", error);
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
        
        setLoading(false);
      });
      
      return () => unsubscribe();
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login, but save the current location they were trying to access
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;