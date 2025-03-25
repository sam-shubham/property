import { useState, useEffect } from 'react';
import { PropertyCard } from './components/PropertyCard';
import { 
  Building2, Home, Building, MapPin, Star, Heart, 
  Search, X, Send, Mail, Phone, ChevronDown, ArrowRight, 
  Menu, ChevronUp, Filter, CheckCircle, Sparkles, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';



// Sample property data
const SAMPLE_PROPERTY = {
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
};

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
  const [showContactForm, setShowContactForm] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    type: 'all',
    priceRange: 'any',
    bedrooms: 'any',
    propertyType: 'any',
    amenities: [] as string[]
  });

  // Scroll handling for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Minimal header with improved visibility */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold text-white">
            PropertyPrime
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {['Buy', 'Rent', 'Sell', 'Insights'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase()}`} 
                className={`${scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-white hover:text-white/80'} text-sm font-medium transition-colors`}
              >
                {item}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className={`text-sm ${scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-white hover:text-white/80'}`}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={`text-sm px-4 py-2 ${scrolled ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'} rounded-full hover:bg-opacity-90 transition-colors`}
            >
              Sign up
            </Link>
          </div>
          
          <button 
            className={`md:hidden ${scrolled ? 'text-gray-600' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-white animate-slideDown border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              {['Buy', 'Rent', 'Sell', 'Insights'].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase()}`} 
                  className="text-gray-600 py-2"
                >
                  {item}
                </Link>
              ))}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Link to="/login" className="flex-1 text-center py-2">Login</Link>
                <Link to="/signup" className="flex-1 bg-indigo-600 text-white rounded-md py-2 text-center">
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero section with minimal elements and full-width image */}
      <section className="relative min-h-screen flex items-center pt-16">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Find Your Perfect Place
            </h1>
            <p className="text-white/90 text-lg mb-8">
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
                  />
                </div>
                <button className="bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium flex items-center">
                  Search
                </button>
              </div>
              
              <div className="flex justify-between items-center pt-3">
                <button 
                  onClick={() => setAdvancedSearch(!advancedSearch)}
                  className="text-sm text-gray-500 hover:text-indigo-600 flex items-center"
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
                  <select className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50">
                    <option>Any Type</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Commercial</option>
                  </select>
                  
                  <select className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50">
                    <option>Any Price</option>
                    <option>Under ₹50L</option>
                    <option>₹50L - ₹1Cr</option>
                    <option>₹1Cr - ₹2Cr</option>
                    <option>Above ₹2Cr</option>
                  </select>
                  
                  <select className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50">
                    <option>Any Bed</option>
                    <option>1 BHK</option>
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>4+ BHK</option>
                  </select>
                  
                  <select className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50">
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

      {/* Featured properties - cleaner design */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold">Featured Properties</h2>
            <Link to="/properties" className="text-sm text-indigo-600 hover:underline flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[SAMPLE_PROPERTY, SAMPLE_PROPERTY, SAMPLE_PROPERTY].map((property, index) => (
              <div key={index} className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
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
                    <Heart className="h-4 w-4" />
                  </button>
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
              </div>
            ))}
          </div>
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

      {/* Sleeker footer */}
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white text-lg font-medium mb-4">PropertyPrime</h3>
              <p className="text-sm mb-4">Find your perfect property from our wide range of residential and commercial options.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Top Locations</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/properties/bangalore" className="hover:text-white transition-colors">Bangalore</Link></li>
                <li><Link to="/properties/mumbai" className="hover:text-white transition-colors">Mumbai</Link></li>
                <li><Link to="/properties/delhi" className="hover:text-white transition-colors">Delhi</Link></li>
                <li><Link to="/properties/hyderabad" className="hover:text-white transition-colors">Hyderabad</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Mail className="h-4 w-4 mr-2 mt-0.5" />
                  <span>support@propertyprime.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-0.5" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                  <span>123 Property Lane,<br />Bangalore, Karnataka</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 PropertyPrime. All rights reserved.</p>
          </div>
        </div>
      </footer>

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