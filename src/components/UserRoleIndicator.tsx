import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings, Home, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const UserRoleIndicator = () => {
  const { currentUser, logout } = useAuth();
  const [userRole, setUserRole] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [signingOut, setSigningOut] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch user role from Firestore
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!currentUser) {
        setUserRole('');
        setUserName('');
        return;
      }

      setLoading(true);
      setError('');

      try {
        // Check if admin
        const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
        
        if (adminDoc.exists()) {
          setUserRole('admin');
          setUserName('Admin');
          
          // Store in localStorage for persistence between page reloads
          localStorage.setItem('userRole', 'admin');
          localStorage.setItem('userName', 'Admin');
          return;
        }

        // Check regular user
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.userType || 'buyer';
          const name = userData.fullName || currentUser.email?.split('@')[0] || 'User';
          
          setUserRole(role);
          setUserName(name);
          
          // Store in localStorage for persistence
          localStorage.setItem('userRole', role);
          localStorage.setItem('userName', name);
        } else {
          // User exists in Auth but not in Firestore
          setUserRole('buyer'); // Default role
          setUserName(currentUser.email?.split('@')[0] || 'User');
          
          localStorage.setItem('userRole', 'buyer');
          localStorage.setItem('userName', currentUser.email?.split('@')[0] || 'User');
        }
      } catch (error: any) {
        console.error('Error fetching user role:', error);
        
        // Try to get from localStorage as fallback
        const cachedRole = localStorage.getItem('userRole');
        const cachedName = localStorage.getItem('userName');
        
        if (cachedRole && cachedName) {
          setUserRole(cachedRole);
          setUserName(cachedName);
        } else {
          setError('Could not load user information');
          
          // Use email as fallback
          setUserName(currentUser.email?.split('@')[0] || 'User');
          setUserRole('user');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [currentUser]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await logout();
      // Clear local storage on sign out
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAdmin');
    } catch (error: any) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
    } finally {
      setSigningOut(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-100" 
        onClick={() => setShowDropdown(!showDropdown)}
        aria-expanded={showDropdown}
        aria-haspopup="true"
        aria-label="User menu"
      >
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          {loading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <User className="h-4 w-4" />
          )}
        </div>
        <div className="text-left">
          <p className="text-sm font-medium">{userName || 'User'}</p>
          <p className="text-xs text-gray-500 capitalize">{userRole || 'User'}</p>
        </div>
      </button>

      {error && (
        <div className="absolute right-0 mt-1 bg-red-50 border border-red-100 p-2 rounded-md text-xs text-red-600 flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" /> {error}
        </div>
      )}

      {showDropdown && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
          role="menu"
        >
          {userRole === 'admin' && (
            <Link 
              to="/admin" 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowDropdown(false)}
              role="menuitem"
            >
              <Settings className="h-4 w-4 mr-2" />
              Admin Dashboard
            </Link>
          )}
          {userRole === 'agent' && (
            <Link 
              to="/agent/dashboard" 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowDropdown(false)}
              role="menuitem"
            >
              <Home className="h-4 w-4 mr-2" />
              Agent Dashboard
            </Link>
          )}
          {userRole === 'seller' && (
            <Link 
              to="/seller/dashboard" 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowDropdown(false)}
              role="menuitem"
            >
              <Home className="h-4 w-4 mr-2" />
              Seller Dashboard
            </Link>
          )}
          <button 
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            role="menuitem"
          >
            {signingOut ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Signing out...
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserRoleIndicator;