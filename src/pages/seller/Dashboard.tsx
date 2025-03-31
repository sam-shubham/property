import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, Package, PlusCircle, Settings, LogOut, 
  ChevronRight, FileText, Clock, DollarSign, Eye, Menu
} from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';

// Define proper TypeScript interfaces
interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'rent' | 'sale';
  images?: string[];
  createdAt: string;
  submittedBy: string;
}

interface Stats {
  listed: number;
  pending: number;
  approved: number;
  rejected: number;
}

export const SellerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState<Stats>({
    listed: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Load seller's properties when component mounts
  useEffect(() => {
    const loadProperties = async () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }
      
      try {
        setLoading(true);
        
        const propertiesQuery = query(
          collection(db, 'properties'), 
          where('submittedBy', '==', currentUser.uid)
        );
        
        const querySnapshot = await getDocs(propertiesQuery);
        const propertiesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Property[];
        
        setProperties(propertiesList);
        
        // Calculate stats
        const stats = {
          listed: propertiesList.length,
          pending: propertiesList.filter(p => p.status === 'pending').length,
          approved: propertiesList.filter(p => p.status === 'approved').length,
          rejected: propertiesList.filter(p => p.status === 'rejected').length
        };
        
        setStats(stats);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load your properties');
      } finally {
        setLoading(false);
      }
    };
    
    loadProperties();
  }, [currentUser, navigate]);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside className={`w-64 bg-indigo-800 text-white p-6 fixed inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out z-30 md:static`}>
        <div className="mb-8">
          <h1 className="text-xl font-bold">PropertyPrime</h1>
          <p className="text-indigo-200 text-sm">Seller Dashboard</p>
        </div>
        
        <nav className="space-y-1">
          <Link to="/seller/dashboard" className="flex items-center px-3 py-2 rounded-lg bg-indigo-900 text-white">
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link to="/seller/properties" className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700">
            <Package className="h-5 w-5 mr-3" />
            My Properties
          </Link>
          <Link to="/seller/add-property" className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700">
            <PlusCircle className="h-5 w-5 mr-3" />
            List New Property
          </Link>
          <Link to="/seller/settings" className="flex items-center px-3 py-2 rounded-lg text-indigo-200 hover:bg-indigo-700">
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
      <main className="flex-1 overflow-y-auto pb-16">
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
            <h2 className="text-xl font-semibold">Seller Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors"
            >
              View Website
            </Link>
            <div className="text-sm text-gray-700">
              Welcome, {currentUser?.email}
            </div>
            <img 
              src={currentUser?.photoURL || "https://via.placeholder.com/32"}
              alt="Profile" 
              className="h-8 w-8 rounded-full"
            />
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Total Listings</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-indigo-600">{stats.listed}</span>
                <span className="text-sm text-gray-500 ml-2 mb-1">properties</span>
              </div>
              <Link to="/seller/properties" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                View all properties
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Pending Approval</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-yellow-500">{stats.pending}</span>
                <span className="text-sm text-gray-500 ml-2 mb-1">properties</span>
              </div>
              <Link to="/seller/properties?filter=pending" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                View pending
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Approved</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-green-600">{stats.approved}</span>
                <span className="text-sm text-gray-500 ml-2 mb-1">properties</span>
              </div>
              <Link to="/seller/properties?filter=approved" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                View approved
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Rejected</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-red-600">{stats.rejected}</span>
                <span className="text-sm text-gray-500 ml-2 mb-1">properties</span>
              </div>
              <Link to="/seller/properties?filter=rejected" className="text-indigo-600 text-sm mt-4 inline-flex items-center">
                View rejected
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          
          {/* Recent Properties */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Your Recent Properties</h3>
              <Link to="/seller/properties" className="text-sm text-indigo-600 hover:underline">View All</Link>
            </div>
            
            {loading ? (
              <div className="py-8 text-center text-gray-500">
                <svg className="animate-spin h-8 w-8 mx-auto mb-2 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading your properties...
              </div>
            ) : properties.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-gray-500 mb-4">You haven't listed any properties yet</p>
                <Link 
                  to="/seller/add-property"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  List a Property
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Listed</th>
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
                                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/100?text=No+Image";
                                  }}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{property.title}</div>
                              <div className="text-sm text-gray-500">{property.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₹{property.price?.toLocaleString() || 'N/A'}</div>
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
                            {property.status?.charAt(0).toUpperCase() + property.status?.slice(1) || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link to={`/seller/property/${property.id}`} className="text-indigo-600 hover:text-indigo-900">
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link to={`/seller/property/${property.id}/edit`} className="text-blue-600 hover:text-blue-900">
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
                to="/seller/add-property"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                  <PlusCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">List New Property</h4>
                  <p className="text-xs text-gray-500">Add a new property listing</p>
                </div>
              </Link>
              
              <Link 
                to="/seller/inquiries"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">View Inquiries</h4>
                  <p className="text-xs text-gray-500">Check buyer inquiries</p>
                </div>
              </Link>
              
              <Link 
                to="/seller/schedule"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Schedule Viewings</h4>
                  <p className="text-xs text-gray-500">Manage property viewings</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;