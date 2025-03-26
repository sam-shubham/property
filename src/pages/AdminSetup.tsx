import { useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { getUserIdFromEmail, isAuthenticated } from '../utils/authHelpers';

export const AdminSetup = () => {
  const [adminUid, setAdminUid] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  interface AdminData {
    email: string;
    role: 'admin';
    createdAt: string;
  }

  interface FormEvent {
    preventDefault: () => void;
  }

  const createAdmin = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!adminUid || !adminEmail) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // First, verify if the UID exists as a user in the database
      const userData = await isAuthenticated(adminUid);
      
      if (!userData) {
        setMessage('Warning: This user ID does not seem to exist in Firebase Authentication. The admin record will be created, but it might not work.');
      }
      
      // Check if this admin already exists
      const existingAdminDoc = await getDoc(doc(db, 'admins', adminUid));
      if (existingAdminDoc.exists()) {
        setMessage('Admin already exists with this user ID. No changes made.');
        return;
      }
      
      // Add user to admins collection in Firestore
      await setDoc(doc(db, 'admins', adminUid), {
        email: adminEmail,
        role: 'admin',
        createdAt: new Date().toISOString()
      } as AdminData);
      
      setMessage('Admin user created successfully! User ID: ' + adminUid);
    } catch (error: unknown) {
      console.error("Error creating admin user:", error);
      setMessage('Error creating admin: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Admin User</h2>
      
      {message && (
        <div className={`p-4 mb-4 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-700' : message.includes('Warning') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={createAdmin}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            User ID (from Firebase Authentication)
          </label>
          <input
            type="text"
            value={adminUid}
            onChange={(e) => setAdminUid(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="User ID from Firebase Auth"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            You can find this in Firebase console under Authentication → Users
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Admin Email
          </label>
          <input
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="admin@example.com"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          {loading ? 'Creating...' : 'Create Admin User'}
        </button>
      </form>
    </div>
  );
};

export default AdminSetup;