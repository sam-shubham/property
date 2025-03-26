import { 
  getAuth, 
  signInWithEmailAndPassword, 
  fetchSignInMethodsForEmail, 
  UserCredential 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Get user ID from email (must be used with caution as it requires a sign-in attempt)
export const getUserIdFromEmail = async (email: string, tempPassword: string): Promise<string | null> => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, tempPassword);
    const uid = userCredential.user.uid;
    // Sign out immediately
    await auth.signOut();
    return uid;
  } catch (error) {
    console.error("Error getting user ID from email:", error);
    return null;
  }
};

// Check if a user exists in the authentication system
export const userExists = async (email: string): Promise<boolean> => {
  try {
    const auth = getAuth();
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
};

// Check if a user ID is authenticated
export const isAuthenticated = async (uid: string): Promise<any> => {
  try {
    // Check in users collection
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    
    // Check in admins collection
    const adminDoc = await getDoc(doc(db, 'admins', uid));
    if (adminDoc.exists()) {
      return adminDoc.data();
    }
    
    return null;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return null;
  }
};

// Check if user is an admin
export const isUserAdmin = async (uid: string): Promise<boolean> => {
  try {
    const adminDoc = await getDoc(doc(db, 'admins', uid));
    return adminDoc.exists();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};