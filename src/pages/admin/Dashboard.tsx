import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, Users, Settings, LogOut, ChevronRight, 
  CheckCircle, XCircle, Bell
} from 'lucide-react';
import { getPropertyStatistics } from '../../services/propertyService';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentActivity] = useState([
    {
      action: 'Property Approved',
      user: 'John Doe',
      property: '123 Main St',
      time: '2 hours ago'
    },
    {
      action: 'Property Rejected',
      user: 'Jane Smith',
      property: '456 Oak Ave',
      time: '3 hours ago'
    }
  ]);

  // Load stats when component mounts
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const stats = await getPropertyStatistics();
        setStatistics(stats);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    loadStats();
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-800 text-white p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold">PropertyPrime</h1>
          <p className="text-indigo-200 text-sm">Admin Dashboard</p>
        </div>
        
        <nav className="space-y-1">
          <Link to="/admin" className="flex items-center px-3 py-2 rounded-lg bg-indigo-900 text-white">
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link to="/admin/properties" className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700">
            <CheckCircle className="h-5 w-5 mr-3" />
            Property Approvals
          </Link>
          <Link to="/admin/users" className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700">
            <Users className="h-5 w-5 mr-3" />
            User Management
          </Link>
          <Link to="/admin/settings" className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
        </nav>
        
        <div className="mt-auto pt-8">
          <button 
            onClick={handleLogout}
            className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700 w-full"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard Overview</h2>
          <div className="flex items-center space-x-4">
            <button className="relative p-1">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=32&h=32&q=80" 
                alt="Admin" 
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-sm font-medium">Admin User</span>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Pending Approvals</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-indigo-600">{statistics.pending}</span>
                <span className="text-sm text-gray-500 ml-2 mb-1">properties</span>
              </div>
              <Link to="/admin/properties?filter=pending" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                View all pending
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Approved Listings</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-green-600">{statistics.approved}</span>
                <span className="text-sm text-gray-500 ml-2 mb-1">properties</span>
              </div>
              <Link to="/admin/properties?filter=approved" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                View approved
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">User Statistics</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-blue-600">{statistics.total}</span>
                <span className="text-sm text-gray-500 ml-2 mb-1">users</span>
              </div>
              <Link to="/admin/users" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                Manage users
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-full mr-4 ${
                    activity.action.includes('Approved') 
                      ? 'bg-green-100 text-green-600' 
                      : activity.action.includes('Rejected')
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.action.includes('Approved') ? <CheckCircle className="h-5 w-5" /> : 
                     activity.action.includes('Rejected') ? <XCircle className="h-5 w-5" /> :
                     <Bell className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      {activity.user} {activity.property && `- ${activity.property}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;