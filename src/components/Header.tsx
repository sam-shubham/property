import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
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

  return (
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
  );
};