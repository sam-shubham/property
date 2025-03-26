import { useState, useEffect, useCallback } from 'react';
import { 
  Search, CheckCircle, XCircle, 
  Eye, Calendar, User, MapPin, ArrowLeft, Trash2,
  AlertCircle, Loader
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  getProperties, 
  updatePropertyStatus, 
  searchProperties,
  deleteProperty 
} from '../../services/propertyService';
import { useAuth } from '../../contexts/AuthContext';
import type { Property } from '../../services/propertyService';

export const PropertyApproval: React.FC = () => {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  
  // Load properties when tab changes
  const loadProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getProperties(activeTab === 'all' ? 'all' : activeTab);
      setProperties(data);
      setFilteredProperties(data);
    } catch (err: any) {
      console.error(err);
      setError('Failed to load properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);
  
  useEffect(() => {
    loadProperties();
  }, [loadProperties]);
  
  // Handle search
  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        // If search is empty, just filter the current properties
        setFilteredProperties(properties);
        return;
      }
      
      try {
        setLoading(true);
        setError('');
        const results = await searchProperties(searchQuery, activeTab === 'all' ? 'all' : activeTab);
        setFilteredProperties(results);
      } catch (err: any) {
        console.error(err);
        setError('Search failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, activeTab, properties]);
  
  // Body scroll lock when modal is open
  useEffect(() => {
    if (showDetailModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDetailModal]);
  
  // Validation function for approval/rejection forms
  const validateApprovalForm = (notes: string, action: 'approve' | 'reject'): string | null => {
    if (action === 'reject' && (!notes || notes.trim().length < 5)) {
      return 'Please provide a detailed reason for rejection (min 5 characters)';
    }
    return null;
  };

  // Handle property approval
  const handleApprove = async (propertyId: string, notes: string = '') => {
    if (!propertyId) {
      setError('Invalid property ID');
      return;
    }
    
    if (actionLoading) return; // Prevent multiple clicks
    
    try {
      setActionLoading(true);
      setError('');
      const { success, error: approvalError } = await updatePropertyStatus(propertyId, 'approved', notes);
      
      if (!success) {
        setError(approvalError || 'Failed to approve property');
        return;
      }
      
      // Update local state to reflect the change
      setProperties(prevProperties => 
        prevProperties.map(p => p.id === propertyId 
          ? { ...p, status: 'approved', adminNote: notes }
          : p
        )
      );
      
      setFilteredProperties(prevFiltered => 
        prevFiltered.map(p => p.id === propertyId 
          ? { ...p, status: 'approved', adminNote: notes }
          : p
        )
      );
      
      if (selectedProperty?.id === propertyId) {
        setSelectedProperty({ ...selectedProperty, status: 'approved', adminNote: notes });
      }
      
      // Close the modal on success
      setShowDetailModal(false);
    } catch (error: any) {
      console.error("Error approving property:", error);
      setError('Failed to approve property. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };
  
  // Handle property rejection
  const handleReject = async (propertyId: string, notes: string = '') => {
    if (!propertyId) {
      setError('Invalid property ID');
      return;
    }
    
    if (actionLoading) return; // Prevent multiple clicks
    
    // Validate notes for rejection
    const validationError = validateApprovalForm(notes, 'reject');
    if (validationError) {
      setError(validationError);
      return;
    }
    
    try {
      setActionLoading(true);
      setError('');
      const { success, error: rejectionError } = await updatePropertyStatus(propertyId, 'rejected', notes);
      
      if (!success) {
        setError(rejectionError || 'Failed to reject property');
        return;
      }
      
      // Update local state to reflect the change
      setProperties(prevProperties => 
        prevProperties.map(p => p.id === propertyId 
          ? { ...p, status: 'rejected', adminNote: notes }
          : p
        )
      );
      
      setFilteredProperties(prevFiltered => 
        prevFiltered.map(p => p.id === propertyId 
          ? { ...p, status: 'rejected', adminNote: notes }
          : p
        )
      );
      
      if (selectedProperty?.id === propertyId) {
        setSelectedProperty({ ...selectedProperty, status: 'rejected', adminNote: notes });
      }
      
      // Close the modal on success
      setShowDetailModal(false);
    } catch (error: any) {
      console.error("Error rejecting property:", error);
      setError('Failed to reject property. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };
  
  // Open property detail modal
  const openPropertyDetail = (property: Property) => {
    if (!property) return;
    
    setSelectedProperty(property);
    setApprovalNotes(property.adminNote || '');
    setShowDetailModal(true);
    setError(''); // Clear any previous errors
  };

  // Show delete confirmation dialog
  const confirmDelete = (propertyId: string) => {
    if (!propertyId || actionLoading) return;
    setDeleteConfirmVisible(true);
  };

  // Handle property deletion
  const handleDeleteProperty = async (propertyId: string) => {
    if (!propertyId) {
      setError('Invalid property ID');
      return;
    }
    
    if (actionLoading) return; // Prevent multiple clicks
    
    try {
      setActionLoading(true);
      setError('');
      const { success, error: deleteError } = await deleteProperty(propertyId);
      
      if (!success) {
        setError(deleteError || 'Failed to delete property');
        return;
      }
      
      // Update local state by removing the deleted property
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      setFilteredProperties(prev => prev.filter(p => p.id !== propertyId));
      
      // Close modal if the deleted property was being viewed
      if (selectedProperty?.id === propertyId) {
        setShowDetailModal(false);
      }
      
      // Close delete confirmation dialog
      setDeleteConfirmVisible(false);
    } catch (error: any) {
      console.error("Error deleting property:", error);
      setError('Failed to delete property. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };
  
  // Format price based on value
  const formatPrice = (price?: number): string => {
    if (!price) return 'N/A';
    
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
      {/* Sidebar - reuse from Dashboard */}
      <aside className="w-64 bg-indigo-800 text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin" className="flex items-center py-2 px-4 rounded-lg hover:bg-indigo-700 text-white/80 hover:text-white">
            Dashboard
          </Link>
          <Link to="/admin/properties" className="flex items-center py-2 px-4 rounded-lg bg-indigo-700/60 text-white">
            Properties
          </Link>
          <Link to="/admin/users" className="flex items-center py-2 px-4 rounded-lg hover:bg-indigo-700 text-white/80 hover:text-white">
            Users
          </Link>
          <Link to="/admin/settings" className="flex items-center py-2 px-4 rounded-lg hover:bg-indigo-700 text-white/80 hover:text-white">
            Settings
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/admin" className="md:hidden text-gray-500 hover:text-indigo-600">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h2 className="text-xl font-semibold">Property Approval</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              Welcome, {currentUser?.email || 'Admin'}
            </div>
          </div>
        </header>
        
        <div className="p-4 md:p-6">
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Tab Filters */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
                {['pending', 'approved', 'rejected', 'all'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab 
                        ? 'bg-white shadow-sm text-indigo-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab as 'pending' | 'approved' | 'rejected' | 'all')}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              {/* Search */}
              <div className="relative w-full md:w-auto">
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
          
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-start justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
              <button 
                className="text-red-700 ml-4" 
                onClick={() => setError('')}
                aria-label="Dismiss error"
              >
                &times;
              </button>
            </div>
          )}
          
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
                {loading ? (
                  <div className="text-center py-12 flex flex-col items-center">
                    <Loader className="h-6 w-6 text-indigo-600 animate-spin mb-2" />
                    <p className="text-gray-500">Loading properties...</p>
                  </div>
                ) : filteredProperties.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No properties found</p>
                    {searchQuery && (
                      <button 
                        className="text-indigo-600 mt-2 text-sm hover:underline"
                        onClick={() => setSearchQuery('')}
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  filteredProperties.map(property => (
                    <div key={property.id} className="grid grid-cols-12 gap-2 px-6 py-4 hover:bg-gray-50">
                      <div className="col-span-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                            {property.images && property.images.length > 0 ? (
                              <img 
                                src={property.images[0]} 
                                alt={property.title || ''} 
                                className="h-12 w-12 object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=No+Image';
                                }}
                              />
                            ) : (
                              <div className="h-12 w-12 flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {property.title || 'Untitled Property'}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {property.location || 'Location not specified'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-900 self-center">
                        {formatPrice(property.price)}
                        <div className="text-xs text-gray-500">
                          {property.type === 'rent' ? 'For Rent' : property.type === 'sale' ? 'For Sale' : 'Not specified'}
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-900 self-center">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span title={property.submittedBy || 'Unknown'}>
                            {property.submittedBy 
                              ? property.submittedBy.length > 12 
                                ? `${property.submittedBy.substring(0, 12)}...` 
                                : property.submittedBy
                              : 'Unknown'}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-500 self-center">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {property.submittedOn || property.createdAt
                            ? (property.submittedOn || property.createdAt) 
                              ? new Date(property.submittedOn || property.createdAt || Date.now()).toLocaleDateString()
                              : 'Unknown date'
                            : 'Unknown date'}
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
                          {property.status
                            ? property.status.charAt(0).toUpperCase() + property.status.slice(1)
                            : 'Unknown'}
                        </span>
                      </div>
                      <div className="col-span-1 self-center flex space-x-2">
                        <button 
                          onClick={() => openPropertyDetail(property)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Details"
                          disabled={actionLoading}
                          aria-label="View property details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {property.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleApprove(property.id || '')}
                              className="text-green-600 hover:text-green-900"
                              title="Approve Property"
                              disabled={actionLoading}
                              aria-label="Approve property"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => openPropertyDetail(property)}
                              className="text-red-600 hover:text-red-900"
                              title="Reject Property (requires notes)"
                              disabled={actionLoading}
                              aria-label="Open reject dialog"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => confirmDelete(property.id || '')}
                          className="text-gray-400 hover:text-red-600"
                          title="Delete Property"
                          disabled={actionLoading}
                          aria-label="Delete property"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
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
                disabled={actionLoading}
                aria-label="Close dialog"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                    {selectedProperty.images && selectedProperty.images.length > 0 ? (
                      <img 
                        src={selectedProperty.images[0]} 
                        alt={selectedProperty.title || 'Property Image'} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x360?text=No+Image+Available';
                        }}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                        No Image Available
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2">
                    {selectedProperty.title || 'Untitled Property'}
                  </h2>
                  <div className="text-sm text-gray-500 flex items-center mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedProperty.location || 'Location not specified'}
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4">
                    {selectedProperty.description || 'No description available.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <span className="block text-xs text-gray-500">Price</span>
                      <span className="font-semibold">{formatPrice(selectedProperty.price)}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <span className="block text-xs text-gray-500">Property Type</span>
                      <span className="font-semibold capitalize">
                        {selectedProperty.category || selectedProperty.type || 'Not specified'}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <span className="block text-xs text-gray-500">Bedrooms</span>
                      <span className="font-semibold">
                        {selectedProperty.bedrooms ? `${selectedProperty.bedrooms} BHK` : 'Not specified'}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <span className="block text-xs text-gray-500">Area</span>
                      <span className="font-semibold">
                        {selectedProperty.area ? `${selectedProperty.area} sq.ft` : 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="text-sm font-semibold mb-3">Submission Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Submitted By</span>
                        <span className="text-sm" title={selectedProperty.submittedBy || 'Unknown'}>
                          {selectedProperty.submittedBy || 'Unknown'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Date</span>
                        <span className="text-sm">
                          {selectedProperty.submittedOn || selectedProperty.createdAt
                            ? new Date(selectedProperty.submittedOn || selectedProperty.createdAt || Date.now()).toLocaleDateString()
                            : 'Unknown date'}
                        </span>
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
                          {selectedProperty.status
                            ? selectedProperty.status.charAt(0).toUpperCase() + selectedProperty.status.slice(1)
                            : 'Unknown'}
                        </span>
                      </div>
                      {selectedProperty.adminNote && (
                        <div className="pt-2 mt-2 border-t">
                          <span className="block text-sm text-gray-500 mb-1">Admin Notes</span>
                          <p className="text-sm">{selectedProperty.adminNote}</p>
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
                        value={approvalNotes}
                        onChange={(e) => setApprovalNotes(e.target.value)}
                        disabled={actionLoading}
                      ></textarea>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleApprove(selectedProperty.id || '', approvalNotes)}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                          disabled={actionLoading}
                        >
                          {actionLoading ? (
                            <>
                              <Loader className="h-4 w-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            'Approve'
                          )}
                        </button>
                        <button 
                          onClick={() => handleReject(selectedProperty.id || '', approvalNotes)}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                          disabled={actionLoading}
                        >
                          {actionLoading ? (
                            <>
                              <Loader className="h-4 w-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            'Reject'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Delete button */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <button 
                      onClick={() => confirmDelete(selectedProperty.id || '')}
                      className="w-full border border-red-200 text-red-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <>
                          <Loader className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          Delete Property
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom Delete Confirmation Dialog */}
      {deleteConfirmVisible && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
            <div className="flex space-x-4 justify-end">
              <button
                onClick={() => setDeleteConfirmVisible(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProperty(selectedProperty.id || '')}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyApproval;