import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ChevronDown, Heart, MapPin, Sparkles, Menu, Building, Home
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { searchProperties, filterProperties, sortProperties } from '../utils/searchUtils';

const SAMPLE_PROPERTIES = Array(6).fill({
  id: '1',
  title: 'Luxury Apartment in Downtown',
  description: 'Beautiful apartment with modern amenities',
  price: 3500000,
  location: 'Downtown, Bangalore',
  type: 'sale',
  category: 'apartment',
  bedrooms: 3,
  bathrooms: 2,
  area: 1500,
  images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  features: ['Swimming Pool', 'Gym', 'Security'],
  verified: true,
  premium: true,
  createdAt: '2024-02-25T10:00:00Z',
  updatedAt: '2024-02-25T10:00:00Z'
});

export const Buy = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    propertyType: 'Any Type',
    price: 'Any Price',
    bhk: 'Any BHK',
    location: 'Any Location',
    possession: 'Any Possession'
  });
  const [sortOption, setSortOption] = useState('Newest First');
  const [filteredProperties, setFilteredProperties] = useState(SAMPLE_PROPERTIES);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let results = SAMPLE_PROPERTIES;
    results = searchProperties(results, searchQuery);
    results = filterProperties(results, filters);
    results = sortProperties(results, sortOption);
    setFilteredProperties(results);
  }, [searchQuery, filters, sortOption]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header />
      
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/80"></div>
          <img 
            src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover object-center" 
            alt="Luxury properties"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Find Your Dream Property
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Explore our curated selection of premium properties for sale across India
            </p>
            
            <div className="bg-white rounded-xl shadow-lg p-3 mb-8">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location, property name..."
                    className="w-full pl-10 pr-3 py-3 rounded-lg text-sm border-none focus:ring-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium flex items-center hover:bg-indigo-700 transition-colors">
                  Search
                </button>
              </div>
              
              <div className="flex justify-between items-center pt-3">
                <button 
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-sm text-gray-500 hover:text-indigo-600 flex items-center transition-colors"
                >
                  <Filter className="h-3 w-3 mr-1" />
                  Advanced Filters
                  <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {showAdvancedFilters && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 mt-3 border-t border-gray-100 animate-fadeIn">
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  >
                    <option>Any Type</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Builder Floor</option>
                    <option>Plot</option>
                    <option>Farm House</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.price}
                    onChange={(e) => handleFilterChange('price', e.target.value)}
                  >
                    <option>Any Price</option>
                    <option>Under ₹50L</option>
                    <option>₹50L - ₹1Cr</option>
                    <option>₹1Cr - ₹2Cr</option>
                    <option>Above ₹2Cr</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.bhk}
                    onChange={(e) => handleFilterChange('bhk', e.target.value)}
                  >
                    <option>Any BHK</option>
                    <option>1 BHK</option>
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>4+ BHK</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.possession}
                    onChange={(e) => handleFilterChange('possession', e.target.value)}
                  >
                    <option>Any Possession</option>
                    <option>Ready to Move</option>
                    <option>Within 3 Months</option>
                    <option>Within 6 Months</option>
                    <option>Under Construction</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Properties for Sale</h2>
            <p className="text-sm text-gray-500">Showing {filteredProperties.length} properties</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              className="text-sm p-2 rounded-lg border border-gray-200 bg-white"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No properties found matching your criteria</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  propertyType: 'Any Type',
                  price: 'Any Price',
                  bhk: 'Any BHK',
                  location: 'Any Location',
                  possession: 'Any Possession'
                });
                setSortOption('Newest First');
              }}
              className="text-indigo-600 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <Link 
              key={index} 
              to={`/property/${property.id}`}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {property.premium && (
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-md">
                    Premium
                  </div>
                )}
                <button className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 text-gray-600 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.location}
                </div>
                
                <h3 className="text-base font-medium text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {property.title}
                </h3>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">
                    ₹{(property.price / 100000).toFixed(1)}L
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-md mr-2">{property.bedrooms} BHK</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md">{property.area} sq.ft</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium border border-gray-200 hover:bg-indigo-50 transition-colors">
            <Sparkles className="h-4 w-4" />
            Load More Properties
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Buy;