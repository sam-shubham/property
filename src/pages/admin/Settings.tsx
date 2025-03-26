import { useState } from 'react';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';

export const Settings = () => {
  const { currentUser } = useAuth();
  const [autoApprove, setAutoApprove] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Load settings when component mounts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settingsRef = doc(db, 'settings', 'propertyApproval');
        const settingsSnap = await getDoc(settingsRef);
        
        if (settingsSnap.exists()) {
          const data = settingsSnap.data();
          setAutoApprove(data.autoApprove || false);
          setNotifyEmail(data.notifyEmail || '');
        }
      } catch (error) {
        console.error("Error loading settings:", error);
        setMessage({
          type: 'error',
          text: 'Failed to load settings'
        });
      }
    };
    
    loadSettings();
  }, []);
  
  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const settingsRef = doc(db, 'settings', 'propertyApproval');
      
      await setDoc(settingsRef, {
        autoApprove,
        notifyEmail,
        updatedAt: new Date(),
        updatedBy: currentUser?.uid
      }, { merge: true });
      
      setMessage({
        type: 'success',
        text: 'Settings saved successfully'
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage({
        type: 'error',
        text: 'Failed to save settings'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (reuse from Dashboard) */}
      <aside className="w-64 bg-indigo-800 text-white p-6">
        {/* Sidebar content... */}
      </aside>
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4">
          <h2 className="text-xl font-semibold">Admin Settings</h2>
        </header>
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Property Approval Settings</h3>
            
            {message.text && (
              <div className={`p-3 rounded-lg mb-4 ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={saveSettings}>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={autoApprove}
                      onChange={() => setAutoApprove(!autoApprove)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700">
                      Auto-approve all new property listings
                    </span>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notification Email
                  </label>
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="admin@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email address to notify when new properties are submitted
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70"
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;

function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
