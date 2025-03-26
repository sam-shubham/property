import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ChevronDown, Heart, MapPin, ArrowRight, Star, Menu, Home
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

// Sample villa listings
const VILLAS_LISTINGS = Array(6).fill({
  id: '1',
  title: 'Luxury Villa with Private Pool',
  description: 'Premium villa with modern design and amenities',
  price: 32500000,
  location: 'Whitefield, Bangalore',
  type: 'sale',
  category: 'villa',
  bedrooms: 4,
  bathrooms: 4.5,
  area: 4200,
  landArea: 8000,
  images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  features: ['Private Pool', 'Garden', 'Home Theater', 'Modular Kitchen', 'Smart Home'],
  verified: true,
  premium: true,
  createdAt: '2024-03-15T10:00:00Z',
  updatedAt: '2024-03-15T10:00:00Z',
  developer: 'Prestige Group',
  completionDate: 'December 2024',
  totalUnits: 24,
  availableUnits: 8
}).map((project, index) => ({
  ...project,
  id: `v${index + 1}`,
  title: [
    'Magnificent Villa with Garden',
    'Luxury Villa in Gated Community',
    'Modern Smart Villa with Pool',
    'Eco-Friendly Villa with Solar Power',
    'Spanish Style Villa with Courtyard',
    'Contemporary Villa with Terrace Garden'
  ][index % 6],
  price: 30000000 + (index * 7500000),
  location: ['Whitefield', 'Sarjapur Road', 'Hennur', 'Electronic City', 'Yelahanka', 'Devanahalli'][index % 6] + ', Bangalore',
  developer: ['Prestige Group', 'Godrej Properties', 'Brigade Group', 'Sobha Limited', 'Embassy Group', 'Tata Housing'][index % 6],
  landArea: 6000 + (index * 1000),
  bedrooms: 4 + (index % 2),
  completionDate: index < 3 ? 'Ready to Move' : 'December 2024',
  availableUnits: 2 + (index % 5)
}));

export const Villas = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header />
      
      {/* Hero section for Villas */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/80"></div>
          <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover object-center" 
            alt="Luxury villas"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center text-sm text-white/80 mb-3 animate-fadeInUp">
              <Link to="/listings" className="hover:text-white">Listings</Link>
              <span className="mx-2">/</span>
              <Link to="/projects" className="hover:text-white">Projects</Link>
              <span className="mx-2">/</span>
              <span>Villas</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 animate-fadeInUp">
              Luxury Villa Projects
            </h1>
            <p className="text-white/90 text-lg mb-8 animate-fadeInUp" style={{animationDelay: '100ms'}}>
              Discover opulent villas with exclusive amenities and premium living spaces
            </p>
            
            {/* Search box */}
            <div className="bg-white rounded-xl shadow-lg p-3 mb-8 animate-fadeInUp" style={{animationDelay: '200ms'}}>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location, villa name or developer..."
                    className="w-full pl-10 pr-3 py-3 rounded-lg text-sm border-none focus:ring-0"
                  />
                </div>
                <button className="bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium flex items-center hover:bg-indigo-700 transition-colors">
                  Search
                </button>
              </div>
              
              <div className="flex justify-between items-center pt-3">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-sm text-gray-500 hover:text-indigo-600 flex items-center transition-colors"
                >
                  <Filter className="h-3 w-3 mr-1" />
                  Advanced Filters
                  <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {/* Advanced filters */}
              {showFilters && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 mt-3 border-t border-gray-100 animate-fadeIn">
                  <select className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50">
                    <option>Any Developer</option>
                    <option>Prestige Group</option>
                    <option>Godrej Properties</option>
                    <option>Brigade Group</option>
                    <option>Sobha Limited</option>
                    <option>Embassy Group</option>
                  </select>
                  
                  <select className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50">
                    <option>Any Price</option>
                    <option>Under ₹3Cr</option>
                    <option>₹3Cr - ₹5Cr</option>
                    <option>₹5Cr - ₹8Cr</option>
                    <option>Above ₹8Cr</option>
                  </select>
                  
                  <select className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50">
                    <option>Any BHK</option>
                    <option>3 BHK</option>
                    <option>4 BHK</option>
                    <option>5 BHK</option>
                    <option>6+ BHK</option>
                  </select>
                  
                  <select className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50">
                    <option>Any Status</option>
                    <option>Ready to Move</option>
                    <option>Under Construction</option>
                    <option>New Launch</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Villas Project Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold">Villa Projects</h2>
              <p className="text-sm text-gray-500">Showing {VILLAS_LISTINGS.length} premium villa projects</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="text-sm p-2 rounded-lg border border-gray-200 bg-white">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Land Area: Large to Small</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VILLAS_LISTINGS.map((project, index) => (
              <Link 
                key={index} 
                to={`/project/${project.id}`}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.premium && (
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-md">
                      Premium
                    </div>
                  )}
                  <button className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-5">
                  <div className="text-xs text-indigo-600 font-medium mb-2">
                    By {project.developer}
                  </div>
                  
                  <h3 className="text-base font-medium text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <MapPin className="h-3 w-3 mr-1" />
                    {project.location}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-xs bg-gray-50 p-2 rounded-md">
                      <span className="block text-gray-400">Built-up Area</span>
                      <span className="font-medium text-gray-800">{project.area} sq.ft</span>
                    </div>
                    <div className="text-xs bg-gray-50 p-2 rounded-md">
                      <span className="block text-gray-400">Land Area</span>
                      <span className="font-medium text-gray-800">{project.landArea} sq.ft</span>
                    </div>
                    <div className="text-xs bg-gray-50 p-2 rounded-md">
                      <span className="block text-gray-400">Status</span>
                      <span className="font-medium text-gray-800">{project.completionDate === 'Ready to Move' ? 'Ready to Move' : 'Under Construction'}</span>
                    </div>
                    <div className="text-xs bg-gray-50 p-2 rounded-md">
                      <span className="block text-gray-400">Bedrooms</span>
                      <span className="font-medium text-gray-800">{project.bedrooms} BHK</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">
                      ₹{(project.price / 10000000).toFixed(1)} Cr
                    </span>
                    <div className="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full font-medium">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load more button */}
          <div className="flex justify-center mt-12">
            <Button className="bg-indigo-600 text-white flex items-center gap-2">
              <Home className="h-4 w-4" />
              Load More Villas
            </Button>
          </div>
        </div>
      </section>

      {/* USP section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-3">Why Choose a Luxury Villa?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Villas offer unparalleled luxury, space and privacy for the discerning homeowner
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Exclusivity & Privacy",
                description: "Enjoy complete privacy with standalone structures and private gardens, perfect for a secluded luxury lifestyle.",
                icon: "🏠"
              },
              {
                title: "Luxury Amenities",
                description: "Premium amenities like private pools, home theaters, spacious backyards, and high-end fixtures.",
                icon: "🏊‍♂️"
              },
              {
                title: "Design Freedom",
                description: "Greater flexibility in design customization and future expansions to meet your evolving needs.",
                icon: "✨"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};