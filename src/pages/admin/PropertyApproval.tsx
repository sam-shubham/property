import { useState, useEffect } from 'react';
import { 
  Search, Filter, ChevronDown, CheckCircle, XCircle, 
  Eye, Edit, MoreHorizontal, Calendar, User, MapPin
} from 'lucide-react';

// Sample property listings that need approval
const PENDING_PROPERTIES = Array(15).fill(null).map((_, index) => ({
  id: `p${index + 1}`,
  title: [
    'Modern 3 BHK Apartment in Indiranagar',
    'Luxury Villa with Swimming Pool',
    'Commercial Office Space in CBD',
    'Affordable 2 BHK Flat in Whitefield',
    'Premium Builder Floor in Defence Colony',
    'Studio Apartment near Metro Station'
  ][index % 6],
  price: 3500000 + (Math.floor(Math.random() * 10) * 500000),
  location: ['Indiranagar', 'Whitefield', 'Koramangala', 'HSR Layout', 'JP Nagar', 'Electronic City'][index % 6] + ', Bangalore',
  type: index % 3 === 0 ? 'rent' : 'sale',
  category: ['apartment', 'villa', 'commercial', 'house', 'builder-floor', 'studio'][index % 6],
  bedrooms: 1 + (index % 4),
  area: 1000 + (index * 200),
  images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  submittedBy: ['Rahul Sharma', 'Neha Patel', 'Vikram Malhotra', 'Priya Singh'][index % 4],
  submittedOn: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toISOString(),
  status: index < 10 ? 'pending' : (index < 13 ? 'approved' : 'rejected'),
  notes: index < 10 ? '' : (index < 13 ? 'Approved after verification' : 'Rejected due to insufficient documentation')
}));

export const PropertyApproval = () => {
  const [properties, setProperties] = useState(PENDING_PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetailParams | null>(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // Filter properties based on active tab and search query
  const filteredProperties = properties.filter(property => {
    return (
      (activeTab === 'all' || property.status === activeTab) &&
      (searchQuery === '' || 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  
interface Property {
    id: string;
    title: string;
    price: number;
    location: string;
    type: string;
    category: string;
    bedrooms: number;
    area: number;
    images: string[];
    submittedBy: string;
    submittedOn: string;
    status: string;
    notes: string;
}

const handleApprove = (propertyId: string): void => {
    setProperties(properties.map((p: Property) => {
        if (p.id === propertyId) {
            return { ...p, status: 'approved', notes: 'Approved by admin' };
        }
        return p;
    }));
};
  
const handleReject = (propertyId: string, reason: string = 'Rejected by admin'): void => {
    setProperties(properties.map((p: Property) => {
      if (p.id === propertyId) {
        return { ...p, status: 'rejected', notes: reason };
      }
      return p;
    }));
};
  
interface PropertyDetailParams {
    id: string;
    title: string;
    price: number;
    location: string;
    type: string;
    category: string;
    bedrooms: number;
    area: number;
    images: string[];
    submittedBy: string;
    submittedOn: string;
    status: string;
    notes: string;
}

const openPropertyDetail = (property: PropertyDetailParams): void => {
    setSelectedProperty(property);
    setShowDetailModal(true);
};
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - reuse from Dashboard */}
      <aside className="w-64 bg-indigo-800 text-white p-6">
        {/* Same sidebar content as Dashboard */}
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Property Approval</h2>
          <div className="flex items-center space-x-4">
            {/* Header content from Dashboard */}
          </div>
        </header>
        
        <div className="p-6">
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Tab Filters */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {['pending', 'approved', 'rejected', 'all'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab 
                        ? 'bg-white shadow-sm text-indigo-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Properties Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="min-w-full divide-y divide-gray-200">
              <div className="bg-gray-50">
                <div className="grid grid-cols-12 gap-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-4">Property</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Submitted By</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Actions</div>
                </div>
              </div>
              <div className="bg-white divide-y divide-gray-200">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map(property => (
                    <div key={property.id} className="grid grid-cols-12 gap-2 px-6 py-4 hover:bg-gray-50">
                      <div className="col-span-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                            <img src={property.images[0]} alt="" className="h-12 w-12 object-cover" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{property.title}</div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {property.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-900 self-center">
                        ₹{(property.price / 100000).toFixed(1)} Lakh
                        <div className="text-xs text-gray-500">{property.type === 'rent' ? 'For Rent' : 'For Sale'}</div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-900 self-center">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {property.submittedBy}
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-500 self-center">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(property.submittedOn).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="col-span-1 self-center">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          property.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : property.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                      </div>
                      <div className="col-span-1 self-center flex space-x-2">
                        <button 
                          onClick={() => openPropertyDetail(property)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {property.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleApprove(property.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleReject(property.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No properties found matching your criteria
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Property Detail Modal */}
      {showDetailModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Property Details</h3>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img 
                      src={selectedProperty.images[0]} 
                      alt={selectedProperty.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2">{selectedProperty.title}</h2>
                  <div className="text-sm text-gray-500 flex items-center mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedProperty.location}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <span className="block text-xs text-gray-500">Price</span>
                      <span className="font-semibold">₹{selectedProperty.price.toLocaleString()}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <span className="block text-xs text-gray-500">Property Type</span>
                      <span className="font-semibold capitalize">{selectedProperty.category}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <span className="block text-xs text-gray-500">Bedrooms</span>
                      <span className="font-semibold">{selectedProperty.bedrooms} BHK</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <span className="block text-xs text-gray-500">Area</span>
                      <span className="font-semibold">{selectedProperty.area} sq.ft</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="text-sm font-semibold mb-3">Submission Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Submitted By</span>
                        <span className="text-sm">{selectedProperty.submittedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Date</span>
                        <span className="text-sm">{new Date(selectedProperty.submittedOn).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Status</span>
                        <span className={`text-sm font-medium ${
                          selectedProperty.status === 'approved' 
                            ? 'text-green-600' 
                            : selectedProperty.status === 'rejected'
                              ? 'text-red-600'
                              : 'text-yellow-600'
                        }`}>
                          {selectedProperty.status.charAt(0).toUpperCase() + selectedProperty.status.slice(1)}
                        </span>
                      </div>
                      {selectedProperty.notes && (
                        <div className="pt-2 mt-2 border-t">
                          <span className="block text-sm text-gray-500 mb-1">Notes</span>
                          <p className="text-sm">{selectedProperty.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {selectedProperty.status === 'pending' && (
                    <div className="space-y-4">
                      <textarea
                        placeholder="Add notes or reason for approval/rejection..."
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm"
                        rows={4}
                      ></textarea>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => {
                            handleApprove(selectedProperty.id);
                            setShowDetailModal(false);
                          }}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => {
                            handleReject(selectedProperty.id);
                            setShowDetailModal(false);
                          }}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyApproval;