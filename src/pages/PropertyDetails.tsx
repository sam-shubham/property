import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Share2, MapPin, Bed, Bath, Square, 
  CheckCircle, Calendar, ArrowLeft, Phone, Menu,
  ChevronDown, ChevronRight, X
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
            {['Buy', 'Rent', 'Sell', 'Insights'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase()}`} 
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
    </div>
  );
};