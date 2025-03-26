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
      try {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            // Check if user is an admin
            try {
              const adminDoc = await getDoc(doc(db, 'admins', user.uid));
              const isAdmin = adminDoc.exists();
              setIsAuthenticated(isAdmin);
              
              // For debugging
              if (!isAdmin) {
                console.log("User is not an admin:", user.uid);
              }
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
      } catch (error) {
        console.error("AdminRoute auth error:", error);
        setLoading(false);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="ml-3 text-indigo-600">Checking admin status...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, but save the current location they were trying to access
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;