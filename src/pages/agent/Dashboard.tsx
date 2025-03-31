import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, Package, Users, Calendar, Settings, LogOut, 
  ChevronRight, Clock, DollarSign, Plus, Menu, Eye, FileText, X
} from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';

// Define proper TypeScript interfaces
interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: 'rent' | 'sale';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  images?: string[];
  agentId: string;
}

interface Stats {
  totalListings: number;
  activeListings: number;
  pendingApprovals: number;
  clientCount: number;
}

export const AgentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats>({
    totalListings: 0,
    activeListings: 0,
    pendingApprovals: 0,
    clientCount: 0
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Load agent's properties when component mounts
  useEffect(() => {
    const loadAgentData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        
        const propertiesQuery = query(
          collection(db, 'properties'), 
          where('agentId', '==', currentUser.uid)
        );
        
        const querySnapshot = await getDocs(propertiesQuery);
        const propertiesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Property[];
        
        setProperties(propertiesList);
        
        // Calculate stats
        setStats({
          totalListings: propertiesList.length,
          activeListings: propertiesList.filter(p => p.status === 'approved').length,
          pendingApprovals: propertiesList.filter(p => p.status === 'pending').length,
          clientCount: 0 // This would come from a separate clients collection in a real app
        });
        
        setError('');
      } catch (err) {
        console.error("Error loading agent data:", err);
        setError('Failed to load your properties. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadAgentData();
  }, [currentUser]);
  
  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut(auth);
      // Clear local storage items
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out:", error);
      setError('Failed to log out. Please try again.');
    } finally {
      setLoggingOut(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Format price based on value
  const formatPrice = (price?: number): string => {
    if (!price) return '₹0';
    
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside className={`w-64 bg-indigo-800 text-white p-6 fixed inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out z-30 md:static md:z-0`}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-bold">PropertyPrime</h1>
            <p className="text-indigo-200 text-sm">Agent Dashboard</p>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="space-y-1">
          <Link to="/agent/dashboard" className="flex items-center px-3 py-2 rounded-lg bg-indigo-900 text-white">
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link to="/agent/properties" className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700">
            <Package className="h-5 w-5 mr-3" />
            Properties
          </Link>
          <Link to="/agent/clients" className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700">
            <Users className="h-5 w-5 mr-3" />
            My Clients
          </Link>
          <Link to="/agent/schedule" className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700">
            <Calendar className="h-5 w-5 mr-3" />
            Appointments
          </Link>
          <Link to="/agent/settings" className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
        </nav>
        
        <div className="mt-auto pt-8">
          <button 
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700 w-full"
          >
            {loggingOut ? (
              <>
                <div className="h-5 w-5 mr-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </>
            )}
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              className="text-gray-500 md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold">Dashboard Overview</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors"
            >
              View Website
            </Link>
            <div className="text-sm text-gray-700">
              Welcome, {currentUser?.email || 'Agent'}
            </div>
            <img 
              src={currentUser?.photoURL || "https://via.placeholder.com/32"}
              alt="Profile" 
              className="h-8 w-8 rounded-full bg-gray-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/32";
              }}
            />
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center justify-between">
              <span>{error}</span>
              <button 
                onClick={() => setError('')}
                className="text-red-700"
                aria-label="Dismiss"
              >
                &times;
              </button>
            </div>
          )}
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Total Listings</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-indigo-600">{stats.totalListings}</span>
                <span className="text-sm text-gray-500 ml-2 mb-1">properties</span>
              </div>
              <Link to="/agent/properties" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                View all properties
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Active Listings</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-green-600">{stats.activeListings}</span>
                <span className="text-sm text-gray-500 ml-2 mb-1">properties</span>
              </div>
              <Link to="/agent/properties?filter=active" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                View active
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Pending Approval</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-yellow-500">{stats.pendingApprovals}</span>
                <span className="text-sm text-gray-500 ml-2 mb-1">properties</span>
              </div>
              <Link to="/agent/properties?filter=pending" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                View pending
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Active Clients</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-blue-600">{stats.clientCount}</span>
                <span className="text-sm text-gray-500 ml-2 mb-1">clients</span>
              </div>
              <Link to="/agent/clients" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                Manage clients
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
              <Link to="/agent/schedule" className="text-sm text-indigo-600 hover:underline">View All</Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* If real appointments existed, they would be mapped here */}
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No upcoming appointments scheduled
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Recent Properties */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Your Recent Properties</h3>
              <Link to="/agent/properties" className="text-sm text-indigo-600 hover:underline">View All</Link>
            </div>
            
            {loading ? (
              <div className="py-8 text-center text-gray-500 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent mb-2"></div>
                Loading your properties...
              </div>
            ) : properties.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-gray-500 mb-4">You haven't listed any properties yet</p>
                <Link 
                  to="/agent/add-property"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add a Property
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listed Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.slice(0, 5).map((property) => (
                      <tr key={property.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-3">
                              {property.images && property.images.length > 0 ? (
                                <img 
                                  src={property.images[0]} 
                                  alt={property.title} 
                                  className="h-10 w-10 rounded-md object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://via.placeholder.com/100?text=No+Image";
                                  }}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{property.title || 'Untitled Property'}</div>
                              <div className="text-sm text-gray-500">{property.location || 'No location'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatPrice(property.price)}</div>
                          <div className="text-xs text-gray-500">{property.type === 'rent' ? 'For Rent' : 'For Sale'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            property.status === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : property.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {property.status ? property.status.charAt(0).toUpperCase() + property.status.slice(1) : 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'Unknown date'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link to={`/agent/property/${property.id}`} className="text-indigo-600 hover:text-indigo-900">
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link to={`/agent/property/${property.id}/edit`} className="text-blue-600 hover:text-blue-900">
                              <FileText className="h-4 w-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/agent/add-property"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Add Property</h4>
                  <p className="text-xs text-gray-500">List a new property</p>
                </div>
              </Link>
              
              <Link 
                to="/agent/schedule/add"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Schedule Appointment</h4>
                  <p className="text-xs text-gray-500">Create new appointment</p>
                </div>
              </Link>
              
              <Link 
                to="/agent/leads"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Manage Leads</h4>
                  <p className="text-xs text-gray-500">Track and follow up on leads</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;