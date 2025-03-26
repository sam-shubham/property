import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ChevronDown, Heart, MapPin, ArrowRight, Menu, Building
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

// Sample builder floors listings
const BUILDER_FLOORS_LISTINGS = Array(6).fill({}).map((_, index) => ({
  id: `bf${index + 1}`,
  title: [
    'Premium Builder Floor with Garden',
    'Luxury Builder Floor with Terrace',
    'Modern 3BHK Builder Floor',
    'Independent Builder Floor with Parking',
    'Contemporary Builder Floor in Gated Colony',
    'Spacious Builder Floor with Premium Finishes'
  ][index % 6],
  description: 'Luxurious independent floor with modern amenities',
  price: 15500000 + (index * 2500000),
  location: ['Defence Colony', 'Greater Kailash', 'Vasant Vihar', 'Safdarjung Enclave', 'Hauz Khas', 'Panchsheel Park'][index % 6] + ', Delhi',
  type: 'sale',
  category: 'builder-floor',
  bedrooms: 3 + (index % 2),
  bathrooms: 3,
  area: 1800 + (index * 200),
  images: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  features: ['Modular Kitchen', 'Reserved Parking', 'Power Backup', 'Balcony', 'Security'],
  verified: true,
  premium: index % 3 === 0,
  createdAt: '2024-03-15T10:00:00Z',
  updatedAt: '2024-03-15T10:00:00Z',
  developer: ['Prestige Group', 'DLF Limited', 'Raheja Developers', 'Vatika Group', 'Unity Group', 'Ashiana Housing'][index % 6],
  floorNumber: ['Ground', '1st', '2nd', '3rd', '4th'][index % 5] + ' Floor',
  completionDate: index < 4 ? 'Ready to Move' : 'June 2024',
  totalFloors: 4
}));

export const BuilderFloors = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    developer: 'Any Developer',
    price: 'Any Price',
    bedrooms: 'Any BHK',
    location: 'Any Location',
    floorNumber: 'Any Floor'
  });
  const [sortOption, setSortOption] = useState('Newest First');
  const [filteredProjects, setFilteredProjects] = useState(BUILDER_FLOORS_LISTINGS);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    // Call it once to set initial state
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Search and filter effect - Fixed filtering logic
  useEffect(() => {
    let results = BUILDER_FLOORS_LISTINGS;
    
    // Apply search if there's a query
    if (searchQuery) {
      results = results.filter(project => 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.developer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply filters
    if (filters.developer !== 'Any Developer') {
      results = results.filter(project => project.developer === filters.developer);
    }
    
    if (filters.price !== 'Any Price') {
      if (filters.price === 'Under ₹1.5Cr') {
        results = results.filter(project => project.price < 15000000);
      } else if (filters.price === '₹1.5Cr - ₹2Cr') {
        results = results.filter(project => project.price >= 15000000 && project.price <= 20000000);
      } else if (filters.price === '₹2Cr - ₹3Cr') {
        results = results.filter(project => project.price > 20000000 && project.price <= 30000000);
      } else if (filters.price === 'Above ₹3Cr') {
        results = results.filter(project => project.price > 30000000);
      }
    }
    
    if (filters.bedrooms !== 'Any BHK') {
      const bedroomCount = parseInt(filters.bedrooms.split(' ')[0]);
      if (filters.bedrooms.includes('+')) {
        results = results.filter(project => project.bedrooms >= bedroomCount);
      } else {
        results = results.filter(project => project.bedrooms === bedroomCount);
      }
    }
    
    if (filters.floorNumber !== 'Any Floor') {
      results = results.filter(project => project.floorNumber.includes(filters.floorNumber.split(' ')[0]));
    }
    
    // Apply sorting
    if (sortOption === 'Price: Low to High') {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
      results = [...results].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Area: Large to Small') {
      results = [...results].sort((a, b) => b.area - a.area);
    }
    // Default is "Newest First" - no need to sort, as the array is already in that order
    
    setFilteredProjects(results);
  }, [searchQuery, filters, sortOption]);
  
  // Handle filter change
  interface Filters {
    developer: string;
    price: string;
    bedrooms: string;
    location: string;
    floorNumber: string;
  }

  const handleFilterChange = (filterName: keyof Filters, value: string): void => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Fixed Header - Ensuring it's visible with proper z-index */}
      <Header />
      
      {/* Hero section for Builder Floors - Fixed z-index and positioning */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover object-center" 
            alt="Luxury builder floors"
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <div className="flex items-center text-sm text-white/80 mb-3 animate-fadeInUp">
              <Link to="/listings" className="hover:text-white">Listings</Link>
              <span className="mx-2">/</span>
              <Link to="/projects" className="hover:text-white">Projects</Link>
              <span className="mx-2">/</span>
              <span>Builder Floors</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 animate-fadeInUp">
              Premium Builder Floor Projects
            </h1>
            <p className="text-white/90 text-lg mb-8 animate-fadeInUp" style={{animationDelay: '100ms'}}>
              Discover exclusive builder floors offering privacy, space, and customization options
            </p>
            
            {/* Search box */}
            <div className="bg-white rounded-xl shadow-lg p-3 mb-8 animate-fadeInUp" style={{animationDelay: '200ms'}}>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location, builder floor name or developer..."
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
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.developer}
                    onChange={(e) => handleFilterChange('developer', e.target.value)}
                  >
                    <option>Any Developer</option>
                    <option>Prestige Group</option>
                    <option>DLF Limited</option>
                    <option>Raheja Developers</option>
                    <option>Vatika Group</option>
                    <option>Unity Group</option>
                    <option>Ashiana Housing</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.price}
                    onChange={(e) => handleFilterChange('price', e.target.value)}
                  >
                    <option>Any Price</option>
                    <option>Under ₹1.5Cr</option>
                    <option>₹1.5Cr - ₹2Cr</option>
                    <option>₹2Cr - ₹3Cr</option>
                    <option>Above ₹3Cr</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  >
                    <option>Any BHK</option>
                    <option>3 BHK</option>
                    <option>4 BHK</option>
                    <option>5+ BHK</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.floorNumber}
                    onChange={(e) => handleFilterChange('floorNumber', e.target.value)}
                  >
                    <option>Any Floor</option>
                    <option>Ground Floor</option>
                    <option>1st Floor</option>
                    <option>2nd Floor</option>
                    <option>3rd Floor</option>
                    <option>4th Floor</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Builder Floors Project Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold">Builder Floor Projects</h2>
              <p className="text-sm text-gray-500">
                Showing {filteredProjects.length} premium builder floors
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
                <option>Area: Large to Small</option>
              </select>
            </div>
          </div>

          {/* Display message if no results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No builder floors found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    developer: 'Any Developer',
                    price: 'Any Price',
                    bedrooms: 'Any BHK',
                    location: 'Any Location',
                    floorNumber: 'Any Floor'
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
            {filteredProjects.map((project, index) => (
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
                      <span className="block text-gray-400">Floor</span>
                      <span className="font-medium text-gray-800">{project.floorNumber}</span>
                    </div>
                    <div className="text-xs bg-gray-50 p-2 rounded-md">
                      <span className="block text-gray-400">Area</span>
                      <span className="font-medium text-gray-800">{project.area} sq.ft</span>
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
          {filteredProjects.length > 0 && (
            <div className="flex justify-center mt-12">
              <Button className="bg-indigo-600 text-white flex items-center gap-2">
                <Building className="h-4 w-4" />
                Load More Builder Floors
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* USP section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-3">Why Choose Builder Floors?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Builder floors offer a perfect balance of apartment convenience and independent home autonomy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Privacy & Exclusivity",
                description: "Enjoy private living with typically 2-4 units per building, offering more exclusivity than apartments.",
                icon: "🔑"
              },
              {
                title: "Low Maintenance",
                description: "Lower maintenance costs compared to independent houses, with shared costs for common areas.",
                icon: "💰"
              },
              {
                title: "Design Flexibility",
                description: "More customization options and typically larger spaces compared to apartment units.",
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

export default BuilderFloors;