import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ChevronDown, Heart, MapPin, ArrowRight, Star, Menu, Building2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Sample project listings with apartment focus
const APARTMENTS_LISTINGS = Array(6).fill({
  id: '1',
  title: 'Modern Apartment Complex',
  description: 'Luxury apartment with premium amenities',
  price: 5500000,
  location: 'Whitefield, Bangalore',
  type: 'sale',
  category: 'apartment',
  bedrooms: 3,
  bathrooms: 2,
  area: 1800,
  images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  features: ['Swimming Pool', 'Clubhouse', 'Gym', 'Garden', '24/7 Security'],
  verified: true,
  premium: true,
  createdAt: '2024-03-15T10:00:00Z',
  updatedAt: '2024-03-15T10:00:00Z',
  developer: 'Prestige Group',
  completionDate: 'December 2025',
  totalUnits: 124,
  availableUnits: 45
}).map((project, index) => ({
  ...project,
  id: `a${index + 1}`,
  title: [
    'Luxury High-Rise Apartment Complex',
    'Modern Urban Apartment Project',
    'Premium Waterfront Apartments',
    'Eco-Friendly Apartment Community',
    'Smart Living Apartment Project',
    'Sky View Premium Apartments'
  ][index % 6],
  price: 4500000 + (index * 1000000),
  location: ['Whitefield', 'Electronic City', 'Indiranagar', 'HSR Layout', 'Koramangala', 'JP Nagar'][index % 6] + ', Bangalore',
  developer: ['Prestige Group', 'Godrej Properties', 'Brigade Group', 'Sobha Limited', 'DLF Limited', 'Lodha Group'][index % 6],
  completionDate: ['December 2025', 'June 2026', 'March 2027', 'September 2025'][index % 4],
  totalUnits: [120, 200, 180, 150, 220, 160][index % 6],
  availableUnits: [45, 32, 60, 25, 48, 30][index % 6]
}));

export const Apartments = () => {
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
      {/* Header - same as other pages */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link to="/" className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            PropertyPrime
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {['Buy', 'Rent', 'Sell', 'Listings', 'Top Builders'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`} 
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
              {['Buy', 'Rent', 'Sell', 'Listings', 'Top Builders'].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase().replace(' ', '-')}`} 
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

      {/* Hero section for Apartments */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/80"></div>
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover object-center" 
            alt="Luxury apartment projects"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center text-sm text-white/80 mb-3 animate-fadeInUp">
              <Link to="/listings" className="hover:text-white">Listings</Link>
              <span className="mx-2">/</span>
              <Link to="/projects" className="hover:text-white">Projects</Link>
              <span className="mx-2">/</span>
              <span>Apartments</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 animate-fadeInUp">
              Premium Apartment Projects
            </h1>
            <p className="text-white/90 text-lg mb-8 animate-fadeInUp" style={{animationDelay: '100ms'}}>
              Explore luxurious apartment complexes from top developers across India
            </p>
            
            {/* Search box */}
            <div className="bg-white rounded-xl shadow-lg p-3 mb-8 animate-fadeInUp" style={{animationDelay: '200ms'}}>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by project name, location or developer..."
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
                    <option>Brigade Group</option>
                    <option>Godrej Properties</option>
                    <option>Sobha Limited</option>
                    <option>DLF Limited</option>
                  </select>
                  
                  <select className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50">
                    <option>Any Price</option>
                    <option>Under ₹50L</option>
                    <option>₹50L - ₹1Cr</option>
                    <option>₹1Cr - ₹2Cr</option>
                    <option>Above ₹2Cr</option>
                  </select>
                  
                  <select className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50">
                    <option>Any BHK</option>
                    <option>1 BHK</option>
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>4+ BHK</option>
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

      {/* Apartments Project Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold">Apartment Projects</h2>
              <p className="text-sm text-gray-500">Showing {APARTMENTS_LISTINGS.length} premium apartment projects</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="text-sm p-2 rounded-lg border border-gray-200 bg-white">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Completion Date</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {APARTMENTS_LISTINGS.map((project, index) => (
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
                      <span className="block text-gray-400">Total Units</span>
                      <span className="font-medium text-gray-800">{project.totalUnits}</span>
                    </div>
                    <div className="text-xs bg-gray-50 p-2 rounded-md">
                      <span className="block text-gray-400">Available</span>
                      <span className="font-medium text-gray-800">{project.availableUnits} Units</span>
                    </div>
                    <div className="text-xs bg-gray-50 p-2 rounded-md">
                      <span className="block text-gray-400">Status</span>
                      <span className="font-medium text-gray-800">Under Construction</span>
                    </div>
                    <div className="text-xs bg-gray-50 p-2 rounded-md">
                      <span className="block text-gray-400">Completion</span>
                      <span className="font-medium text-gray-800">{project.completionDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">
                      ₹{(project.price / 100000).toFixed(1)}L
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
              <Building2 className="h-4 w-4" />
              Load More Projects
            </Button>
          </div>
        </div>
      </section>

      {/* USP section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-3">Why Choose Apartment Projects?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Premium apartment projects offer unparalleled convenience and amenities for modern urban living
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Amenities",
                description: "Access to swimming pools, gyms, clubhouses, and dedicated play areas.",
                icon: "🏊‍♂️"
              },
              {
                title: "Secure Communities",
                description: "Round-the-clock security systems with CCTV surveillance and guard service.",
                icon: "🔒"
              },
              {
                title: "Convenient Living",
                description: "Modern layouts with maintenance services and proximity to essential facilities.",
                icon: "🏙️"
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

      {/* Footer would go here */}
    </div>
  );
};

export default Apartments;