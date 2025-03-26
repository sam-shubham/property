import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  async function checkIfAdmin(user: User) {
    try {
      const adminRef = doc(db, 'admins', user.uid);
      const adminSnap = await getDoc(adminRef);
      return adminSnap.exists();
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  }

  // Login function
  async function login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const isUserAdmin = await checkIfAdmin(userCredential.user);
      
      if (!isUserAdmin) {
        await signOut(auth);
        throw new Error("Not authorized as admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Logout function
  async function logout() {
    return signOut(auth);
  }

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        const adminStatus = await checkIfAdmin(user);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}