import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, Search, ChevronDown, Home, Building2, ArrowRight, Sparkles, Menu 
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { searchProperties, filterProperties, sortProperties } from '../utils/searchUtils';

const SAMPLE_PROPERTIES = Array(6).fill({
  id: '1',
  title: '3 BHK Apartment for Rent',
  description: 'Fully furnished apartment with modern amenities',
  price: 35000,
  location: 'Indiranagar, Bangalore',
  type: 'rent',
  category: 'apartment',
  bedrooms: 3,
  bathrooms: 2,
  area: 1500,
  images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  features: ['Fully Furnished', 'Power Backup', 'Security'],
  verified: true,
  premium: true,
  createdAt: '2024-02-25T10:00:00Z',
  updatedAt: '2024-02-25T10:00:00Z'
});

export const Rent = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    propertyType: 'all',
    price: 'Any Price',
    bhk: 'Any BHK',
    furnishing: 'Any Furnishing',
    availability: 'Any Date'
  });
  const [sortOption, setSortOption] = useState('Newest First');
  const [filteredProperties, setFilteredProperties] = useState(SAMPLE_PROPERTIES);

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
    
    if (activeCategory !== 'all') {
      results = results.filter(property => property.category === activeCategory);
    }
    
    results = searchProperties(results, searchQuery);
    
    results = filterProperties(results, filters);
    
    results = sortProperties(results, sortOption);
    
    setFilteredProperties(results);
  }, [searchQuery, filters, sortOption, activeCategory]);

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
            src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover object-center" 
            alt="Rental properties"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Find Your Perfect Rental
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Discover premium rental properties that suit your lifestyle and budget
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
                    <option value="all">Any Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="pg">PG/Co-living</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.price}
                    onChange={(e) => handleFilterChange('price', e.target.value)}
                  >
                    <option>Any Price</option>
                    <option>Under ₹10K</option>
                    <option>₹10K - ₹20K</option>
                    <option>₹20K - ₹30K</option>
                    <option>₹30K - ₹50K</option>
                    <option>Above ₹50K</option>
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
                    value={filters.furnishing}
                    onChange={(e) => handleFilterChange('furnishing', e.target.value)}
                  >
                    <option>Any Furnishing</option>
                    <option>Fully Furnished</option>
                    <option>Semi Furnished</option>
                    <option>Unfurnished</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: 'all', label: 'All Properties' },
              { id: 'family', label: 'Family Homes', icon: Home },
              { id: 'bachelor', label: 'Bachelor Friendly' },
              { id: 'furnished', label: 'Fully Furnished' },
              { id: 'luxury', label: 'Luxury Rentals' },
              { id: 'commercial', label: 'Commercial', icon: Building2 }
            ].map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon && <category.icon className="h-3 w-3 inline mr-1" />}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold">Properties for Rent</h2>
              <p className="text-sm text-gray-500">
                Showing {filteredProperties.length} properties
                {activeCategory !== 'all' && ` in ${activeCategory}`}
              </p>
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
              <p className="text-gray-500 mb-4">No rental properties found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    propertyType: 'all',
                    price: 'Any Price',
                    bhk: 'Any BHK',
                    furnishing: 'Any Furnishing',
                    availability: 'Any Date'
                  });
                  setActiveCategory('all');
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
                      ₹{property.price.toLocaleString()}<span className="text-sm font-normal">/mo</span>
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
              Discover More Rentals
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-3">Rental Guide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about renting a property in India</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Rental Agreement Guide",
                description: "Learn about the key terms and conditions in a rental agreement.",
                link: "/guides/rental-agreement"
              },
              {
                title: "Security Deposit Rules",
                description: "Understand the regulations around security deposits in different cities.",
                link: "/guides/security-deposits"
              },
              {
                title: "Tenant Rights",
                description: "Know your rights as a tenant when renting a residential property.",
                link: "/guides/tenant-rights"
              }
            ].map((guide, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-md transition-all">
                <h3 className="text-lg font-medium mb-2">{guide.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{guide.description}</p>
                <Link to={guide.link} className="text-indigo-600 text-sm flex items-center">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Rent;