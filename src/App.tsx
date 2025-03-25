import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { PropertyCard } from './components/PropertyCard';
import { 
  Building2, Home, Building, MapPin, Star, Award, Trophy, 
  Newspaper, X, Send, Mail, Phone, MapPin as LocationPin,
  Search, Filter, Square, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';

const SAMPLE_PROPERTY = {
  id: '1',
  title: 'Luxury Apartment in Downtown',
  description: 'Beautiful apartment with modern amenities',
  price: 3500000,
  location: 'Downtown, Bangalore',
  type: 'sale' as const,
  category: 'apartment' as 'apartment',
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

// Add the agents data
const SAMPLE_AGENTS = [
  {
    id: '1',
    name: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 4.5,
    propertiesSold: 35,
    specialization: ['Residential', 'Luxury Homes'],
    location: 'Bangalore',
    badge: 'Top Seller'
  },
  {
    id: '2',
    name: 'Raj Kapoor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 4.0,
    propertiesSold: 28,
    specialization: ['Commercial', 'Office Spaces'],
    location: 'Mumbai',
    badge: 'Premium Agent'
  },
  {
    id: '3',
    name: 'Aisha Khan',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5.0,
    propertiesSold: 42,
    specialization: ['Luxury Properties', 'Villas'],
    location: 'Delhi',
    badge: 'Luxury Specialist'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 4.7,
    propertiesSold: 31,
    specialization: ['Residential', 'Investment Properties'],
    location: 'Hyderabad',
    badge: 'Top Seller'
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
  const [searchFilters, setSearchFilters] = useState({
    type: 'all',
    priceRange: 'any',
    bedrooms: 'any',
    propertyType: 'any',
    amenities: [] as string[]
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Improved mobile spacing */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-8 md:gap-12">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              PropertyPrime
            </Link>
            <nav className="hidden space-x-6 md:space-x-8 lg:flex">
              <Link to="/buy" className="text-slate-600 hover:text-slate-900">
                Buy
              </Link>
              <Link to="/rent" className="text-slate-600 hover:text-slate-900">
                Rent
              </Link>
              <Link to="/sell" className="text-slate-600 hover:text-slate-900">
                Sell
              </Link>
              <Link to="/news" className="text-slate-600 hover:text-slate-900">
                News
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              to="/login"
              className="rounded-md px-3 py-2 text-sm md:text-base text-slate-600 hover:bg-slate-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm md:text-base font-medium text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Improved search experience */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Find Your Perfect Property
            </h1>
            <p className="mb-8 text-lg text-blue-100">
              Thousands of properties for buying, selling, and renting across the country
            </p>
          </div>
          
          {/* Improved Search Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    type="text" 
                    placeholder="Search by location, landmark or property..." 
                    className="pl-10 w-full py-3"
                  />
                </div>
                
                <div className="flex gap-2 w-full md:w-auto">
                  <Button 
                    onClick={() => setAdvancedSearch(!advancedSearch)}
                    className="bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${advancedSearch ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  <Button className="flex-shrink-0">
                    Search
                  </Button>
                </div>
              </div>
              
              {/* Advanced Search Filters */}
              {advancedSearch && (
                <div className="pt-4 mt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Property Type
                    </label>
                    <select 
                      className="w-full rounded-md border border-slate-200 p-2"
                      value={searchFilters.propertyType}
                      onChange={(e) => setSearchFilters({...searchFilters, propertyType: e.target.value})}
                    >
                      <option value="any">Any Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="commercial">Commercial</option>
                      <option value="plot">Plot</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Price Range
                    </label>
                    <select 
                      className="w-full rounded-md border border-slate-200 p-2"
                      value={searchFilters.priceRange}
                      onChange={(e) => setSearchFilters({...searchFilters, priceRange: e.target.value})}
                    >
                      <option value="any">Any Price</option>
                      <option value="0-2000000">Below ₹20 Lakhs</option>
                      <option value="2000000-5000000">₹20 Lakhs - ₹50 Lakhs</option>
                      <option value="5000000-10000000">₹50 Lakhs - ₹1 Crore</option>
                      <option value="10000000-20000000">₹1 Crore - ₹2 Crores</option>
                      <option value="20000000+">Above ₹2 Crores</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Bedrooms
                    </label>
                    <select 
                      className="w-full rounded-md border border-slate-200 p-2"
                      value={searchFilters.bedrooms}
                      onChange={(e) => setSearchFilters({...searchFilters, bedrooms: e.target.value})}
                    >
                      <option value="any">Any</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                      <option value="5+">5+ BHK</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Amenities
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['Swimming Pool', 'Gym', 'Garden', 'Security', 'Parking', 'Clubhouse'].map(amenity => (
                        <label key={amenity} className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-md text-sm cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="rounded"
                            checked={searchFilters.amenities.includes(amenity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSearchFilters({
                                  ...searchFilters, 
                                  amenities: [...searchFilters.amenities, amenity]
                                });
                              } else {
                                setSearchFilters({
                                  ...searchFilters, 
                                  amenities: searchFilters.amenities.filter(a => a !== amenity)
                                });
                              }
                            }}
                          />
                          {amenity}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Property Categories - Make cards clickable */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-8 text-2xl md:text-3xl font-bold text-slate-900 text-center sm:text-left">
            Browse by Property Type
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Home,
                title: 'Houses',
                description: 'Find your dream house',
                link: '/properties/houses'
              },
              {
                icon: Building2,
                title: 'Apartments',
                description: 'Modern living spaces',
                link: '/properties/apartments'
              },
              {
                icon: Building,
                title: 'Commercial',
                description: 'Business properties',
                link: '/properties/commercial'
              },
              {
                icon: MapPin,
                title: 'Plots',
                description: 'Build your future',
                link: '/properties/plots'
              },
            ].map((category) => (
              <Link
                to={category.link}
                key={category.title}
                className="group rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg hover:translate-y-[-4px]"
              >
                <category.icon className="mb-4 h-8 w-8 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                  {category.title}
                </h3>
                <p className="text-slate-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties - Better card layout */}
      <section className="bg-slate-100 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex flex-col sm:flex-row items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 sm:mb-0">
              Featured Properties
            </h2>
            <Link
              to="/properties"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all properties <span className="text-lg">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[SAMPLE_PROPERTY, SAMPLE_PROPERTY, SAMPLE_PROPERTY].map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section - Improved card spacing */}
      <section id="agents" className="bg-slate-100 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Meet Our Expert Agents
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Our team of experienced real estate professionals is here to help you
              find your perfect property or sell your existing one.
            </p>
          </div>

          <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SAMPLE_AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
              >
                <div className="relative mb-6">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <span className="absolute -right-2 top-0 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                    {agent.badge}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-semibold text-slate-900">
                    {agent.name}
                  </h3>
                  <p className="mb-2 text-sm text-slate-600">{agent.location}</p>
                  <div className="mb-3 flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="font-medium">{agent.rating}</span>
                  </div>
                  <p className="mb-4 text-sm text-slate-600">
                    {agent.propertiesSold} properties sold
                  </p>
                  <div className="mb-4 flex flex-wrap justify-center gap-2">
                    {agent.specialization.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <Button size="sm" className="w-full">
                    Contact Agent
                  </Button>
                </div>
              </div>
            ))}
          </div>

         
        </div>
      </section>

      {/* Get in Touch */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              <p className="text-lg text-slate-600 mb-8">
                Have questions about a property or need expert advice? Our team is ready to help you find your perfect home or investment opportunity.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-100 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email Us</h3>
                    <p className="text-slate-600">support@propertyprime.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-100 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Call Us</h3>
                    <p className="text-slate-600">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-100 p-3 rounded-full">
                    <LocationPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Visit Us</h3>
                    <p className="text-slate-600">
                      123 Property Lane,<br />
                      Bangalore, Karnataka<br />
                      India - 560001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-100 rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Ready to start your property journey?
              </h3>
              <p className="text-slate-600 mb-6">
                Fill out the form and our property experts will get back to you within 24 hours.
              </p>
              <Button 
                onClick={() => setShowContactForm(true)}
                className="w-full"
                size="lg"
              >
                <Send className="h-5 w-5 mr-2" /> Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MOVED SECTION: Property News (now above footer) */}
      <section className="py-16 md:py-20 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex flex-col sm:flex-row items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 sm:mb-0">
              Property News & Insights
            </h2>
            <Link
              to="/news"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all articles <span className="text-lg">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {PROPERTY_NEWS.map((news) => (
              <div key={news.id} className="rounded-lg bg-white overflow-hidden shadow-md transition-all hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 text-xs font-medium bg-blue-600 text-white px-2 py-1 rounded">
                    {news.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-500 mb-2">{news.date}</p>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{news.title}</h3>
                  <p className="text-slate-600 mb-4">{news.excerpt}</p>
                  <Link 
                    to={`/news/${news.id}`} 
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                  >
                    Read more <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup Contact Form */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
              aria-label="Close form"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Us</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <Input 
                    type="text" 
                    placeholder="Enter your full name" 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <Input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    I'm interested in
                  </label>
                  <select className="w-full rounded-md border border-slate-200 p-2">
                    <option>Buying a property</option>
                    <option>Selling a property</option>
                    <option>Renting a property</option>
                    <option>Property evaluation</option>
                    <option>Other enquiry</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea 
                    className="w-full rounded-md border border-slate-200 p-2" 
                    rows={4}
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full">
                  Submit Enquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-300">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                PropertyPrime
              </h3>
              <p className="text-sm">
                Find your perfect property from our wide range of residential and
                commercial options across the country.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Popular Searches</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/properties/bangalore" className="hover:text-white">
                    Properties in Bangalore
                  </Link>
                </li>
                <li>
                  <Link to="/properties/mumbai" className="hover:text-white">
                    Properties in Mumbai
                  </Link>
                </li>
                <li>
                  <Link to="/properties/delhi" className="hover:text-white">
                    Properties in Delhi
                  </Link>
                </li>
                <li>
                  <Link to="/properties/hyderabad" className="hover:text-white">
                    Properties in Hyderabad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
              <ul className="space-y-2 text-sm">
                <li>support@propertyprime.com</li>
                <li>+91 98765 43210</li>
                <li>
                  123 Property Lane,
                  <br />
                  Bangalore, Karnataka
                  <br />
                  India - 560001
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2024 PropertyPrime. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;