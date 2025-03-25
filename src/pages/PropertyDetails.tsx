import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Share2, MapPin, Bed, Bath, Square, 
  CheckCircle, Calendar, ArrowLeft, Phone, Menu,
  ChevronDown, ChevronRight, X, Star
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const PROPERTY = {
  id: '1',
  title: 'Luxury Apartment in Downtown',
  description: 'Beautiful apartment with modern amenities and stunning city views. This spacious 3 BHK apartment features high-end finishes, a modern kitchen, and a large balcony perfect for entertaining.',
  price: 3500000,
  location: 'Downtown, Bangalore',
  type: 'sale',
  category: 'apartment',
  bedrooms: 3,
  bathrooms: 2,
  area: 1500,
  images: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ],
  features: [
    'Swimming Pool',
    'Gym',
    'Security',
    'Covered Parking',
    'Power Backup',
    'Children\'s Play Area',
    'Club House',
    'Garden'
  ],
  verified: true,
  premium: true,
  createdAt: '2024-02-25T10:00:00Z',
  updatedAt: '2024-02-25T10:00:00Z',
  agent: {
    name: "Priya Singh",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    phone: "+91 98765 43210",
    rating: 4.9,
    reviews: 42
  }
};

export const PropertyDetails = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImage, setActiveImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  // Similar scroll handler as in App.tsx
  useState(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Same header as App.tsx for consistency */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link to="/" className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-indigo-600'}`}>
            PropertyPrime
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {['Buy', 'Rent', 'Sell', 'Listings', 'Top Builders'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`} 
                className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-indigo-600"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            >
              Sign up
            </Link>
          </div>
          
          <button 
            className="md:hidden text-gray-600"
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

      {/* Back button */}
      <div className="pt-24 pb-4 container mx-auto px-4">
        <Link to="/buy" className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to search results
        </Link>
      </div>

      {/* Property Image Gallery */}
      <section className="pb-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden h-[350px] md:h-[450px]">
            <img 
              src={PROPERTY.images[activeImage]} 
              alt={PROPERTY.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 h-[350px] md:h-[450px]">
            {PROPERTY.images.slice(1, 3).map((image, index) => (
              <div key={index} className="rounded-xl overflow-hidden">
                <img 
                  src={image} 
                  alt={`${PROPERTY.title} ${index + 2}`}
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
            
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={PROPERTY.images[3]} 
                alt={`${PROPERTY.title} 4`}
                className="w-full h-full object-cover" 
              />
              {PROPERTY.images.length > 4 && (
                <button 
                  onClick={() => setShowAllImages(true)}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium"
                >
                  +{PROPERTY.images.length - 4} Photos
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-8 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {PROPERTY.location}
                  </div>
                  {PROPERTY.verified && (
                    <span className="bg-green-50 text-green-600 text-xs px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                  {PROPERTY.premium && (
                    <span className="bg-indigo-50 text-indigo-600 text-xs px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {PROPERTY.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{PROPERTY.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{PROPERTY.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{PROPERTY.area} sq.ft</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  ₹{PROPERTY.price.toLocaleString()}
                </div>
                <p className="text-sm text-gray-500">
                  {PROPERTY.type === 'sale' ? '(For Sale)' : '(For Rent)'}
                </p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <Heart className="h-4 w-4" />
                Save
              </button>
              <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex flex-wrap gap-6 -mb-px">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'features', label: 'Features' },
                  { id: 'location', label: 'Location' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`relative py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-indigo-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-indigo-600'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium mb-3">Description</h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {PROPERTY.description}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium mb-3">Property Details</h2>
                  <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <dt className="text-xs text-gray-500 mb-1">Property Type</dt>
                      <dd className="text-sm font-medium capitalize">{PROPERTY.category}</dd>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <dt className="text-xs text-gray-500 mb-1">Built-up Area</dt>
                      <dd className="text-sm font-medium">{PROPERTY.area} sq.ft</dd>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <dt className="text-xs text-gray-500 mb-1">Bedrooms</dt>
                      <dd className="text-sm font-medium">{PROPERTY.bedrooms}</dd>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <dt className="text-xs text-gray-500 mb-1">Bathrooms</dt>
                      <dd className="text-sm font-medium">{PROPERTY.bathrooms}</dd>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <dt className="text-xs text-gray-500 mb-1">Listed On</dt>
                      <dd className="text-sm font-medium">
                        {new Date(PROPERTY.createdAt).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div>
                <h2 className="text-lg font-medium mb-3">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {PROPERTY.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'location' && (
              <div>
                <h2 className="text-lg font-medium mb-3">Location</h2>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                  {/* Map placeholder - replace with actual map */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Interactive Map Will Appear Here
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {PROPERTY.location} - This property is conveniently located near shopping centers, schools, and public transportation.
                </p>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Agent Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
              <h3 className="text-lg font-medium mb-4">Contact Agent</h3>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={PROPERTY.agent.image} 
                  alt={PROPERTY.agent.name} 
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{PROPERTY.agent.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span>{PROPERTY.agent.rating} • {PROPERTY.agent.reviews} reviews</span>
                  </div>
                </div>
              </div>
              
              <form className="space-y-4">
                <Input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full"
                />
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full"
                />
                <Input 
                  type="tel" 
                  placeholder="Your Phone" 
                  className="w-full"
                />
                <textarea 
                  placeholder="Hi, I'm interested in this property. Please contact me with more information." 
                  className="w-full rounded-lg border border-gray-200 p-2 text-sm min-h-[100px]"
                ></textarea>
                <Button className="w-full bg-indigo-600 text-white">
                  Send Message
                </Button>
              </form>
              
              <div className="mt-4 flex justify-center">
                <button className="flex items-center gap-2 text-indigo-600 text-sm">
                  <Phone className="h-4 w-4" />
                  {PROPERTY.agent.phone}
                </button>
              </div>
            </div>
            
            {/* Schedule Visit */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-medium mb-4">Schedule a Visit</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Select a date and time to visit this property
                </p>
                <Input 
                  type="date" 
                  className="w-full mb-3"
                />
                <select className="w-full rounded-lg border border-gray-200 p-2 text-sm">
                  <option>Morning (9:00 AM - 12:00 PM)</option>
                  <option>Afternoon (12:00 PM - 3:00 PM)</option>
                  <option>Evening (3:00 PM - 6:00 PM)</option>
                </select>
              </div>
              <Button className="w-full bg-indigo-600 text-white">
                Schedule Visit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Link 
                key={index} 
                to={`/property/${index + 2}`}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={PROPERTY.images[index % PROPERTY.images.length]}
                    alt={`Similar Property ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-md">
                    Featured
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {PROPERTY.location}
                  </div>
                  
                  <h3 className="text-base font-medium text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {index === 0 ? 'Modern 3 BHK Apartment' : index === 1 ? 'Spacious 3 BHK Villa' : 'Premium 3 BHK Flat'}
                  </h3>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">
                      ₹{(PROPERTY.price - 500000 * index).toLocaleString()}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded-md mr-2">{PROPERTY.bedrooms} BHK</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md">{PROPERTY.area} sq.ft</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full Screen Image Gallery Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black/90 z-50 p-4 md:p-10 animate-fadeIn">
          <div className="relative h-full flex flex-col">
            <button 
              onClick={() => setShowAllImages(false)}
              className="absolute top-2 right-2 z-10 text-white rounded-full bg-black/20 p-2 hover:bg-black/40 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="flex-1 flex items-center justify-center">
              <img 
                src={PROPERTY.images[activeImage]} 
                alt={PROPERTY.title} 
                className="max-h-[80vh] max-w-full object-contain"
              />
            </div>
            
            <div className="mt-4 flex justify-center gap-2">
              {PROPERTY.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                    activeImage === index ? 'border-indigo-500' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${PROPERTY.title} ${index + 1}`}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};