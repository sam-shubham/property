import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ChevronDown, Heart, MapPin, ArrowRight, Star, Menu, Home
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { searchProperties, filterProperties, sortProperties } from '../../utils/searchUtils';

// Sample farm house listings
const FARM_HOUSES_LISTINGS = Array(6).fill({
  id: '1',
  title: 'Exclusive Farm House with Orchard',
  description: 'Luxury farm house with modern amenities and agricultural land',
  price: 45000000,
  location: 'Tumkur Road, Bangalore',
  type: 'sale',
  category: 'farm-house',
  bedrooms: 5,
  bathrooms: 5,
  area: 5500,
  landArea: 43560, // 1 acre in sq.ft
  images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  features: ['Private Orchard', 'Swimming Pool', 'Guest House', 'Organic Farm', 'Solar Power'],
  verified: true,
  premium: true,
  createdAt: '2024-03-15T10:00:00Z',
  updatedAt: '2024-03-15T10:00:00Z',
  developer: 'Country Estates',
  completionDate: 'Ready to Move',
  totalUnits: 10,
  availableUnits: 3
}).map((project, index) => ({
  ...project,
  id: `f${index + 1}`,
  title: [
    'Grand Farm House with Orchard',
    'Countryside Estate with Lake View',
    'Eco-Friendly Farm Retreat',
    'Luxury Farm House with Stables',
    'Organic Farm Estate with Vineyard',
    'Modern Farm House with Agricultural Land'
  ][index % 6],
  price: 45000000 + (index * 15000000),
  location: ['Tumkur Road', 'Kanakapura Road', 'Anekal', 'Hosur Road', 'Nandi Hills', 'Doddaballapur'][index % 6] + ', Bangalore',
  developer: ['Country Estates', 'Green Earth Homes', 'Farm Haven Developers', 'Prestige Farm Properties', 'Godrej Farm Estates', 'Brigade Rural'][index % 6],
  landArea: 43560 + (index * 21780), // Starting at 1 acre, increasing by 0.5 acres
  bedrooms: 4 + (index % 3),
  completionDate: index < 3 ? 'Ready to Move' : 'June 2025',
  availableUnits: 1 + (index % 3)
}));

export const FarmHouses = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // New state variables for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    developer: 'Any Developer',
    price: 'Any Price',
    landArea: 'Any Land Area',
    status: 'Any Status'
  });
  const [sortOption, setSortOption] = useState('Newest First');
  const [filteredProjects, setFilteredProjects] = useState(FARM_HOUSES_LISTINGS);

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
  
  // Search and filter effect
  useEffect(() => {
    let results = FARM_HOUSES_LISTINGS;
    
    // Apply search
    results = searchProperties(results, searchQuery);
    
    // Apply filters
    results = filterProperties(results, filters);
    
    // Apply sorting
    results = sortProperties(results, sortOption);
    
    setFilteredProjects(results);
  }, [searchQuery, filters, sortOption]);
  
  // Handle filter change
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header />
      
      {/* Hero section for Farm Houses */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/80"></div>
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover object-center" 
            alt="Luxury farm houses"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center text-sm text-white/80 mb-3 animate-fadeInUp">
              <Link to="/listings" className="hover:text-white">Listings</Link>
              <span className="mx-2">/</span>
              <Link to="/projects" className="hover:text-white">Projects</Link>
              <span className="mx-2">/</span>
              <span>Farm Houses</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 animate-fadeInUp">
              Premium Farm House Properties
            </h1>
            <p className="text-white/90 text-lg mb-8 animate-fadeInUp" style={{animationDelay: '100ms'}}>
              Discover serene farm houses with acres of land and luxury amenities close to the city
            </p>
            
            {/* Search box */}
            <div className="bg-white rounded-xl shadow-lg p-3 mb-8 animate-fadeInUp" style={{animationDelay: '200ms'}}>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location, farm house name or developer..."
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
                    <option>Country Estates</option>
                    <option>Green Earth Homes</option>
                    <option>Farm Haven Developers</option>
                    <option>Prestige Farm Properties</option>
                    <option>Godrej Farm Estates</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.price}
                    onChange={(e) => handleFilterChange('price', e.target.value)}
                  >
                    <option>Any Price</option>
                    <option>Under ₹5Cr</option>
                    <option>₹5Cr - ₹8Cr</option>
                    <option>₹8Cr - ₹12Cr</option>
                    <option>Above ₹12Cr</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.landArea}
                    onChange={(e) => handleFilterChange('landArea', e.target.value)}
                  >
                    <option>Any Land Area</option>
                    <option>1-2 Acres</option>
                    <option>2-5 Acres</option>
                    <option>5-10 Acres</option>
                    <option>Above 10 Acres</option>
                  </select>
                  
                  <select 
                    className="text-sm p-2 rounded-lg border border-gray-200 bg-gray-50"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
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

      {/* Farm Houses Project Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold">Farm House Projects</h2>
              <p className="text-sm text-gray-500">
                Showing {filteredProjects.length} premium farm house properties
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
                <option>Land Area: Large to Small</option>
              </select>
            </div>
          </div>

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
                      <span className="block text-gray-400">Built-up Area</span>
                      <span className="font-medium text-gray-800">{project.area} sq.ft</span>
                    </div>
                    <div className="text-xs bg-gray-50 p-2 rounded-md">
                      <span className="block text-gray-400">Land Area</span>
                      <span className="font-medium text-gray-800">{(project.landArea/43560).toFixed(1)} Acres</span>
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

          {/* Display message if no results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No farm houses found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    developer: 'Any Developer',
                    price: 'Any Price',
                    landArea: 'Any Land Area',
                    status: 'Any Status'
                  });
                  setSortOption('Newest First');
                }}
                className="text-indigo-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Load more button */}
          {filteredProjects.length > 0 && (
            <div className="flex justify-center mt-12">
              <Button className="bg-indigo-600 text-white flex items-center gap-2">
                <Home className="h-4 w-4" />
                Load More Farm Houses
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* USP section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-3">Why Choose a Farm House?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Farm houses offer a perfect blend of luxury living and agricultural opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Rural Tranquility",
                description: "Escape from the city's hustle and bustle with peaceful surroundings and clean air in a natural setting.",
                icon: "🌳"
              },
              {
                title: "Agricultural Potential",
                description: "Utilize the extensive land for farming, orchards, or landscaped gardens with sustainable living options.",
                icon: "🌱"
              },
              {
                title: "Investment Value",
                description: "Farm houses typically appreciate well over time due to their limited availability and dual utility.",
                icon: "📈"
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

export default FarmHouses;