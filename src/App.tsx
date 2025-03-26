import { useState, useEffect } from 'react';
import { PropertyCard } from './components/PropertyCard';
import { 
  Building2, Home, Building, MapPin, Star, Heart, 
  Search, X, Send, Mail, Phone, ChevronDown, ArrowRight, 
  Menu, ChevronUp, Filter, CheckCircle, Sparkles, Zap
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { searchProperties, filterProperties, sortProperties } from './utils/searchUtils';

// Expanded sample property data
const SAMPLE_PROPERTIES = Array(6).fill({
  id: '1',
  title: 'Modern Apartment with Garden View',
  description: 'Beautiful apartment with modern amenities',
  price: 3500000,
  location: 'Indiranagar, Bangalore',
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
}).map((property, index) => ({
  ...property,
  id: `hp${index + 1}`,
  title: [
    'Modern Apartment with Garden View',
    'Spacious Villa with Swimming Pool',
    'Luxury Penthouse with Skyline View',
    'Contemporary House in Gated Community',
    'Studio Apartment in City Center',
    'Beachfront Condo with Ocean Views'
  ][index % 6],
  price: 3500000 + (index * 1500000),
  location: ['Indiranagar', 'Whitefield', 'Koramangala', 'HSR Layout', 'JP Nagar', 'Electronic City'][index % 6] + ', Bangalore',
  type: index % 3 === 0 ? 'rent' : 'sale',
  category: ['apartment', 'villa', 'penthouse', 'house', 'studio', 'condo'][index % 6],
  bedrooms: 1 + (index % 4),
  area: 1000 + (index * 200)
}));

// Sample agents data
const SAMPLE_AGENTS = [
  {
    id: '1',
    name: 'Rahul Sharma',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    propertiesSold: 42,
    badge: 'Top Seller',
    specialization: ['Luxury', 'Commercial']
  },
  {
    id: '2',
    name: 'Ananya Patel',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    propertiesSold: 38,
    badge: 'Featured',
    specialization: ['Residential', 'Apartments']
  },
  {
    id: '3',
    name: 'Vikram Malhotra',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 4.7,
    propertiesSold: 29,
    badge: null,
    specialization: ['Plots', 'Houses']
  },
  {
    id: '4',
    name: 'Priya Singh',
    location: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    propertiesSold: 45,
    badge: 'Top Seller',
    specialization: ['Luxury', 'Villas']
  }
];

// Sample property news
const PROPERTY_NEWS = [
  {
    id: '1',
    title: 'Housing Market Shows Strong Growth in Q1 2025',
    excerpt: 'The real estate sector has shown remarkable resilience with property values increasing by 8.5% in metro cities.',
    image: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'March 15, 2025',
    category: 'Market Trends'
  },
  {
    id: '2',
    title: 'New Government Policies to Benefit First-Time Home Buyers',
    excerpt: 'Recent policy changes aim to make home ownership more accessible with reduced stamp duty and special loan schemes.',
    image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'March 8, 2025',
    category: 'Policy'
  },
  {
    id: '3',
    title: 'Sustainable Homes: The Future of Real Estate',
    excerpt: 'Energy-efficient homes are gaining popularity with buyers willing to pay premium prices for green features.',
    image: 'https://images.unsplash.com/photo-1630699144867-37acfcb89f0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'February 28, 2025',
    category: 'Sustainability'
  }
];


function App() {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Search and filter state
  const [searchFilters, setSearchFilters] = useState({
    type: 'Any Type',
    price: 'Any Price',
    bedrooms: 'Any Bed',
    area: 'Any Area'
  });
  const [sortOption, setSortOption] = useState('Newest First');
  const [filteredProperties, setFilteredProperties] = useState(SAMPLE_PROPERTIES);

  // Scroll handling for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    // Call it once to set initial state
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interface for search filters
  interface SearchFilters {
    type: string;
    price: string;
    bedrooms: string;
    area: string;
  }

  // Filter and search properties when inputs change
  useEffect(() => {
    let results = SAMPLE_PROPERTIES;
    
    // Apply type filter (Buy, Rent, All)
    if (activeFilter !== 'all') {
      if (activeFilter === 'buy') {
        results = results.filter(property => property.type === 'sale');
      } else if (activeFilter === 'rent') {
        results = results.filter(property => property.type === 'rent');
      } else if (activeFilter === 'new builds') {
        results = results.filter(property => new Date(property.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
      }
    }
    
    // Apply search text
    results = searchProperties(results, searchText);
    
    // Apply dropdown filters
    results = filterProperties(results, {
      type: searchFilters.type,
      price: searchFilters.price,
      bhk: searchFilters.bedrooms,
      area: searchFilters.area
    });
    
    // Apply sorting
    results = sortProperties(results, sortOption);
    
    setFilteredProperties(results);
  }, [searchText, searchFilters, activeFilter, sortOption]);

  // Handle filter change
  interface SearchFilters {
    type: string;
    price: string;
    bedrooms: string;
    area: string;
  }

  const handleFilterChange = (filterName: keyof SearchFilters, value: string): void => {
    setSearchFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  // Handle search submission
  const handleSearch = () => {
    // Prepare search params
    const searchParams = new URLSearchParams();
    
    if (searchText) {
      searchParams.append('q', searchText);
    }
    
    if (activeFilter !== 'all') {
      searchParams.append('type', activeFilter);
    }
    
    if (searchFilters.type !== 'Any Type') {
      searchParams.append('propertyType', searchFilters.type);
    }
    
    if (searchFilters.price !== 'Any Price') {
      searchParams.append('price', searchFilters.price);
    }
    
    if (searchFilters.bedrooms !== 'Any Bed') {
      searchParams.append('bedrooms', searchFilters.bedrooms);
    }
    
    if (searchFilters.area !== 'Any Area') {
      searchParams.append('area', searchFilters.area);
    }
    
    // Navigate to listings page with search params
    navigate(`/listings?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header />
      
      {/* Hero section with minimal elements and full-width image */}
      <section className="relative min-h-screen flex items-center pt-16 w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/80"></div>
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover object-center" 
            alt="Modern property"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-0">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Find Your Perfect Place
            </h1>
            <p className="text-white/90 text-base md:text-lg mb-8">
              Discover exceptional properties that match your lifestyle
            </p>
            
            {/* Sleek search box */}
            <div className="bg-white rounded-xl shadow-lg p-3 mb-8">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location or property..."
                    className="w-full pl-10 pr-3 py-3 rounded-lg text-sm border-none focus:ring-0"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                </div>
                <button 
                  className="bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium flex items-center hover:bg-indigo-700 transition-colors"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              
              <div className="flex justify-between items-center pt-3">
                <button 
                  onClick={() => setAdvancedSearch(!advancedSearch)}
                  className="text-sm text-gray-500 hover:text-indigo-600 flex items-center transition-colors"
                >
                  <Filter className="h-3 w-3 mr-1" />
                  Filters
                  <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${advancedSearch ? 'rotate-180' : ''}`} />
                </button>
                
                <div className="flex gap-2">
                  {['Buy', 'Rent', 'New builds'].map(type => (
                    <button
                      key={type}
                      className={`text-xs px-3 py-1 rounded-full transition-colors ${
                        activeFilter === type.toLowerCase() 
                          ? 'bg-indigo-100 text-indigo-600' 
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveFilter(type.toLowerCase())}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Advanced search - simplified */}
              {advancedSearch && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 mt-3 border-t border-gray-100 animate-fadeIn">
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={searchFilters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <option>Any Type</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Commercial</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={searchFilters.price}
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
                    value={searchFilters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  >
                    <option>Any Bed</option>
                    <option>1 BHK</option>
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>4+ BHK</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={searchFilters.area}
                    onChange={(e) => handleFilterChange('area', e.target.value)}
                  >
                    <option>Any Area</option>
                    <option>Under 1000 sq.ft</option>
                    <option>1000-2000 sq.ft</option>
                    <option>Above 2000 sq.ft</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats section - New minimal section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "10K+", label: "Properties" },
              { number: "15K+", label: "Happy Customers" },
              { number: "500+", label: "Cities Covered" },
              { number: "99%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-indigo-600">{stat.number}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured properties - now showing filtered properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-semibold">Featured Properties</h2>
              {searchText || activeFilter !== 'all' || Object.values(searchFilters).some(value => 
                !value.startsWith('Any')
              ) ? (
                <p className="text-sm text-gray-500">Showing {filteredProperties.length} filtered properties</p>
              ) : null}
            </div>
            <Link to="/listings" className="text-sm text-indigo-600 hover:underline flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.slice(0, 3).map((property, index) => (
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
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
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

          {/* Show a message when no properties match filters */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No properties found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchText('');
                  setActiveFilter('all');
                  setSearchFilters({
                    type: 'Any Type',
                    price: 'Any Price',
                    bedrooms: 'Any Bed',
                    area: 'Any Area'
                  });
                }}
                className="text-indigo-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {/* Show view more button for filtered results */}
          {filteredProperties.length > 3 && (
            <div className="flex justify-center mt-8">
              <Button 
                className="bg-indigo-600 text-white"
                onClick={handleSearch}
              >
                View all {filteredProperties.length} properties
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Property Categories - simplified with cleaner design */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-10">Browse by Category</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Home,
                title: 'Houses',
                count: '2,356',
                color: 'bg-blue-50 text-blue-600'
              },
              {
                icon: Building2,
                title: 'Apartments',
                count: '1,893',
                color: 'bg-indigo-50 text-indigo-600'
              },
              {
                icon: Building,
                title: 'Commercial',
                count: '876',
                color: 'bg-purple-50 text-purple-600'
              },
              {
                icon: MapPin,
                title: 'Land',
                count: '340',
                color: 'bg-amber-50 text-amber-600'
              },
            ].map((category) => (
              <Link
                to={`/category/${category.title.toLowerCase()}`}
                key={category.title}
                className="flex items-center p-4 bg-white rounded-xl hover:shadow-md transition-all"
              >
                <div className={`${category.color} p-3 rounded-lg mr-4`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-medium">{category.title}</h3>
                  <p className="text-xs text-gray-500">{category.count} listings</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - New section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p className="text-gray-500">Simple steps to find your perfect property</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Search,
                title: "Search Property",
                description: "Browse our curated selection of premium properties"
              },
              {
                icon: CheckCircle,
                title: "Choose Your Perfect Match",
                description: "Find the property that suits your needs and preferences"
              },
              {
                icon: Sparkles,
                title: "Move In & Enjoy",
                description: "Complete the process and start your new journey"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-100 -z-10"></div>
                  )}
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents - more minimal design */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold">Top Agents</h2>
            <Link to="/agents" className="text-sm text-indigo-600 hover:underline flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_AGENTS.slice(0, 4).map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-xl p-5 hover:shadow-md transition-all"
              >
                <div className="relative mb-4">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-20 h-20 mx-auto rounded-full object-cover"
                  />
                  {agent.badge && (
                    <div className="absolute top-0 right-1/4 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {agent.badge}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-base font-medium mb-1">{agent.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{agent.location}</p>
                  
                  <div className="flex items-center justify-center text-xs">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-gray-700">{agent.rating}</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-gray-500">{agent.propertiesSold} sales</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - New section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">What Our Clients Say</h2>
            <p className="text-gray-500">Join thousands of satisfied customers</p>
          </div>
          
          {/* Testimonials section */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Found my dream home in just a week! The PropertyPrime platform was intuitive and their agents were incredibly helpful.",
                author: "Aisha Patel",
                role: "Homeowner",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              },
              {
                text: "As a first-time buyer, I was nervous about the process. PropertyPrime made it seamless and stress-free. Highly recommend!",
                author: "Raj Malhotra",
                role: "First-time Buyer",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              },
              {
                text: "Their market insights helped me sell my property at the best price. The virtual tours feature attracted buyers quickly.",
                author: "Priya Sharma",
                role: "Property Investor",
                avatar: "https://images.unsplash.com/photo-1615473967689-439c80a56084?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all">
                <p className="text-gray-600 mb-4 text-sm italic">{testimonial.text}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-indigo-100"
                  />
                  <div>
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property News - simplified */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold">Latest Insights</h2>
            <Link to="/insights" className="text-sm text-indigo-600 hover:underline flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {PROPERTY_NEWS.map((news) => (
              <Link 
                key={news.id} 
                to={`/news/${news.id}`}
                className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-2">
                    <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">{news.category}</span>
                    <span className="text-xs text-gray-400 ml-2">{news.date}</span>
                  </div>
                  <h3 className="text-base font-medium mb-2 hover:text-indigo-600 transition-colors">{news.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{news.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - cleaner, sleeker */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Ready to Find Your Perfect Home?</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers who found their dream properties with PropertyPrime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties" className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Browse Properties
            </Link>
            <button
              onClick={() => setShowContactForm(true)}
              className="px-6 py-3 bg-transparent text-white border border-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Minimalist contact form modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-md animate-scaleIn overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Contact Us</h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-5">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest</label>
                  <select className="w-full rounded-lg border border-gray-200 p-2 text-sm">
                    <option>Buying a property</option>
                    <option>Selling a property</option>
                    <option>Renting a property</option>
                    <option>Property evaluation</option>
                    <option>Investment advice</option>
                    <option>Other inquiry</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    placeholder="Enter your message" 
                    className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                    rows={4}
                  ></textarea>
                </div>
                
                <Button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;