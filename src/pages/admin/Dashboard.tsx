import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, Users, Settings, LogOut, ChevronRight, 
  CheckCircle, XCircle, Bell, AlertTriangle, BarChart2,
  Upload, Zap, Filter, HelpCircle
} from 'lucide-react';
import { ActivityItem, getPropertyStatistics, getRecentActivities } from '../../services/propertyService';
import { getUserStatistics } from '../../services/userService';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [statistics, setStatistics] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
    users: {
      total: 0,
      sellers: 0,
      agents: 0,
      buyers: 0,
    }
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Load stats when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Get property statistics
        const propStats = await getPropertyStatistics();
        
        // Get user statistics
        const userStats = await getUserStatistics();
        
        // Get recent activity
        const activities = await getRecentActivities();
        
        setStatistics({
          ...propStats,
          users: userStats
        });
        setRecentActivity(activities);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('isAdmin');
      navigate('/admin/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-800 text-white p-6 hidden md:block">
        <div className="mb-8">
          <h1 className="text-xl font-bold">PropertyPrime</h1>
          <p className="text-indigo-200 text-sm">Admin Dashboard</p>
        </div>
        
        <nav className="space-y-1">
          <Link to="/admin" className={`flex items-center px-3 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:bg-indigo-700'}`} 
            onClick={() => setActiveTab('dashboard')}>
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link to="/admin/properties" className={`flex items-center px-3 py-2 rounded-lg ${activeTab === 'properties' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:bg-indigo-700'}`} 
            onClick={() => setActiveTab('properties')}>
            <CheckCircle className="h-5 w-5 mr-3" />
            Property Approvals
          </Link>
          <Link to="/admin/users" className={`flex items-center px-3 py-2 rounded-lg ${activeTab === 'users' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:bg-indigo-700'}`} 
            onClick={() => setActiveTab('users')}>
            <Users className="h-5 w-5 mr-3" />
            User Management
          </Link>
          <Link to="/admin/settings" className={`flex items-center px-3 py-2 rounded-lg ${activeTab === 'settings' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:bg-indigo-700'}`} 
            onClick={() => setActiveTab('settings')}>
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
            <Link 
              to="/"
              className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors"
            >
              View Website
            </Link>
            <button className="relative p-1">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">
                {currentUser?.email || 'Admin User'}
              </span>
              <img 
                src="https://via.placeholder.com/32"
                alt="Admin" 
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="ml-3 text-indigo-600">Loading dashboard data...</p>
            </div>
          ) : (
            <>
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Link to="/admin/properties?filter=pending" className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 rounded-full p-3 mr-4">
                      <AlertTriangle className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pending Properties</p>
                      <p className="text-xl font-bold text-indigo-600">{statistics.pending}</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/users" className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Users</p>
                      <p className="text-xl font-bold text-blue-600">{statistics.users.total}</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/properties?filter=approved" className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-3 mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Approved Properties</p>
                      <p className="text-xl font-bold text-green-600">{statistics.approved}</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/properties?filter=rejected" className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-red-100 rounded-full p-3 mr-4">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Rejected Properties</p>
                      <p className="text-xl font-bold text-red-600">{statistics.rejected}</p>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
                    <BarChart2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-indigo-600">{statistics.pending}</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">properties</span>
                  </div>
                  <Link to="/admin/properties?filter=pending" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                    View all pending
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                  {statistics.pending > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-amber-600 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Properties awaiting your review
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">Approved Listings</h3>
                    <BarChart2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-green-600">{statistics.approved}</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">properties</span>
                  </div>
                  <Link to="/admin/properties?filter=approved" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                    View approved
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Approval rate</span>
                      <span className="text-green-600 font-medium">
                        {statistics.total > 0 
                          ? `${Math.round((statistics.approved / statistics.total) * 100)}%` 
                          : '0%'}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded-full mt-2">
                      <div 
                        className="h-1 bg-green-500 rounded-full" 
                        style={{ 
                          width: statistics.total > 0 
                            ? `${Math.round((statistics.approved / statistics.total) * 100)}%` 
                            : '0%'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">User Statistics</h3>
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-blue-600">{statistics.users.total}</span>
                    <span className="text-sm text-gray-500 ml-2 mb-1">users</span>
                  </div>
                  <Link to="/admin/users" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                    Manage users
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-gray-500">Buyers</p>
                        <p className="font-medium">{statistics.users.buyers}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Sellers</p>
                        <p className="font-medium">{statistics.users.sellers}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Agents</p>
                        <p className="font-medium">{statistics.users.agents}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Admin Tasks & Tools */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Admin Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Link to="/admin/properties" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
                    <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                      <Filter className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Property Management</h4>
                      <p className="text-xs text-gray-500">Review and manage listings</p>
                    </div>
                  </Link>
                  
                  <Link to="/admin/users" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">User Management</h4>
                      <p className="text-xs text-gray-500">Manage user accounts</p>
                    </div>
                  </Link>
                  
                  <Link to="/admin/settings" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
                    <div className="p-2 rounded-full bg-amber-100 text-amber-600 mr-3">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Auto-Approval Rules</h4>
                      <p className="text-xs text-gray-500">Configure approval settings</p>
                    </div>
                  </Link>
                  
                  <Link to="/admin/settings" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Documentation</h4>
                      <p className="text-xs text-gray-500">Admin usage guidelines</p>
                    </div>
                  </Link>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No recent activity to display</p>
                  </div>
                ) : (
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
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;