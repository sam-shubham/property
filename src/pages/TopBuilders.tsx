import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Menu, MapPin, Building2, Star, ExternalLink, ArrowRight 
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// Sample builders data
const TOP_BUILDERS = [
  {
    id: '1',
    name: 'Prestige Group',
    logo: 'https://logo.clearbit.com/prestigeconstructions.com',
    description: 'Premier real estate developer with luxury residential and commercial projects across major cities.',
    established: 1986,
    projectsCompleted: 247,
    ongoingProjects: 32,
    cities: ['Bangalore', 'Mumbai', 'Chennai', 'Hyderabad'],
    rating: 4.8,
    reviews: 1245,
    website: 'https://www.prestigeconstructions.com'
  },
  {
    id: '2',
    name: 'Godrej Properties',
    logo: 'https://logo.clearbit.com/godrejproperties.com',
    description: 'Leading real estate company delivering premium residential, commercial, and township projects nationwide.',
    established: 1990,
    projectsCompleted: 189,
    ongoingProjects: 28,
    cities: ['Mumbai', 'Pune', 'Bangalore', 'Delhi NCR'],
    rating: 4.7,
    reviews: 983,
    website: 'https://www.godrejproperties.com'
  },
  {
    id: '3',
    name: 'Sobha Limited',
    logo: 'https://logo.clearbit.com/sobha.com',
    description: 'Renowned for quality construction and timely delivery of luxury residential and commercial spaces.',
    established: 1995,
    projectsCompleted: 167,
    ongoingProjects: 23,
    cities: ['Bangalore', 'Chennai', 'Gurugram', 'Kochi'],
    rating: 4.9,
    reviews: 876,
    website: 'https://www.sobha.com'
  },
  {
    id: '4',
    name: 'DLF Limited',
    logo: 'https://logo.clearbit.com/dlf.in',
    description: 'India\'s largest real estate company with extensive portfolio of luxury homes, commercial properties and retail spaces.',
    established: 1946,
    projectsCompleted: 314,
    ongoingProjects: 37,
    cities: ['Delhi NCR', 'Gurugram', 'Chennai', 'Hyderabad'],
    rating: 4.6,
    reviews: 1543,
    website: 'https://www.dlf.in'
  },
  {
    id: '5',
    name: 'Brigade Group',
    logo: 'https://logo.clearbit.com/brigadegroup.com',
    description: 'Trusted developer of residential, commercial, retail and hospitality projects with strong presence in South India.',
    established: 1986,
    projectsCompleted: 210,
    ongoingProjects: 25,
    cities: ['Bangalore', 'Hyderabad', 'Chennai', 'Mysore'],
    rating: 4.7,
    reviews: 723,
    website: 'https://www.brigadegroup.com'
  },
  {
    id: '6',
    name: 'Lodha Group',
    logo: 'https://logo.clearbit.com/lodhagroup.com',
    description: 'Specializes in luxury residential developments and integrated townships in prime locations.',
    established: 1980,
    projectsCompleted: 178,
    ongoingProjects: 31,
    cities: ['Mumbai', 'Pune', 'London', 'Hyderabad'],
    rating: 4.5,
    reviews: 912,
    website: 'https://www.lodhagroup.com'
  }
];

// Featured projects for each builder
const FEATURED_PROJECTS = {
  '1': [
    {
      id: 'p1',
      name: 'Prestige Lakeside Habitat',
      location: 'Whitefield, Bangalore',
      price: '₹1.2 Cr onwards',
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p2',
      name: 'Prestige Dolce Vita',
      location: 'Whitefield, Bangalore',
      price: '₹2.5 Cr onwards',
      type: 'Villa',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ],
  '2': [
    {
      id: 'p3',
      name: 'Godrej Eternity',
      location: 'Electronic City, Bangalore',
      price: '₹85 L onwards',
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ]
};

export const TopBuilders = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedBuilder, setExpandedBuilder] = useState<string | null>('1'); // Default expanded

  // Scroll handler
  useState(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const toggleBuilder = (id: string) => {
    if (expandedBuilder === id) {
      setExpandedBuilder(null);
    } else {
      setExpandedBuilder(id);
    }
  };

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

      {/* Hero section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/80"></div>
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover object-center" 
            alt="Modern architecture"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 animate-fadeInUp">
              India's Top Real Estate Developers
            </h1>
            <p className="text-white/90 text-lg mb-8 animate-fadeInUp" style={{animationDelay: '100ms'}}>
              Discover premium properties from the most trusted builders in the country
            </p>
            
            {/* Search box */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-8 animate-fadeInUp" style={{animationDelay: '200ms'}}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for builder by name..."
                  className="w-full pl-10 pr-3 py-3 rounded-lg text-sm border-none focus:ring-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Builders list section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">Top Developers</h2>
            <p className="text-gray-500">Showcasing India's most trusted real estate developers</p>
          </div>

          <div className="space-y-6">
            {TOP_BUILDERS.map((builder) => (
              <div key={builder.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div 
                  className="p-6 cursor-pointer border-b border-gray-100"
                  onClick={() => toggleBuilder(builder.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm overflow-hidden">
                      <img 
                        src={builder.logo} 
                        alt={builder.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback if logo fails to load
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=' + builder.name.charAt(0);
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{builder.name}</h3>
                          <p className="text-sm text-gray-500">Established: {builder.established}</p>
                        </div>
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-medium">{builder.rating}</span>
                          <span className="text-gray-400 ml-1">({builder.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {builder.cities.map((city, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="font-medium text-indigo-600">{builder.projectsCompleted}</span>
                        <span className="text-gray-500 ml-1">Completed</span>
                      </div>
                      <div>
                        <span className="font-medium text-indigo-600">{builder.ongoingProjects}</span>
                        <span className="text-gray-500 ml-1">Ongoing</span>
                      </div>
                    </div>
                    
                    <button className="text-indigo-600 text-sm flex items-center gap-1">
                      {expandedBuilder === builder.id ? 'Show Less' : 'Show More'}
                      <ArrowRight className={`h-4 w-4 transition-transform ${expandedBuilder === builder.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>
                
                {/* Expanded content */}
                {expandedBuilder === builder.id && (
                  <div className="p-6 bg-gray-50 animate-fadeIn">
                    <p className="text-gray-600 mb-4">{builder.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-base font-medium mb-3">Featured Projects</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(FEATURED_PROJECTS[builder.id as keyof typeof FEATURED_PROJECTS] || []).map((project) => (
                          <Link 
                            key={project.id} 
                            to={`/property/${project.id}`}
                            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                          >
                            <div className="aspect-[4/3] overflow-hidden">
                              <img 
                                src={project.image} 
                                alt={project.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                            </div>
                            <div className="p-4">
                              <h5 className="font-medium text-gray-900 mb-1">{project.name}</h5>
                              <div className="flex items-center text-xs text-gray-500 mb-2">
                                <MapPin className="h-3 w-3 mr-1" />
                                {project.location}
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-indigo-600">{project.price}</span>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{project.type}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                        
                        {/* If no projects, show a message */}
                        {(!FEATURED_PROJECTS[builder.id as keyof typeof FEATURED_PROJECTS] || 
                          FEATURED_PROJECTS[builder.id as keyof typeof FEATURED_PROJECTS].length === 0) && (
                          <div className="col-span-full py-8 text-center text-gray-500">
                            No featured projects available at the moment
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-between items-center">
                      <Button className="bg-indigo-600 text-white">
                        View All Projects
                      </Button>
                      
                      <a 
                        href={builder.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        Visit Website <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Top Builders section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-2">Why Choose Top Builders?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Working with reputed developers ensures quality, timely delivery, and value for your investment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality Assurance',
                description: 'Established builders maintain high standards of construction quality and use premium materials',
                icon: '🏆'
              },
              {
                title: 'Timely Delivery',
                description: 'Top developers have a proven track record of delivering projects as per committed timelines',
                icon: '⏱️'
              },
              {
                title: 'Transparent Dealings',
                description: 'Reputed builders ensure clear communication and legal compliance throughout the process',
                icon: '📝'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-12 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to find your dream home from top builders?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Browse through our extensive collection of premium properties from India's most trusted developers
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
              Browse Properties
            </Button>
            <Button className="bg-indigo-700 text-white hover:bg-indigo-800">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopBuilders;