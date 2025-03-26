import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
        
        {/* UPDATED: Improved mobile menu toggle button */}
        <button 
          className={`md:hidden p-2 rounded-full ${
            mobileMenuOpen 
              ? 'bg-gray-100 text-indigo-600' // More visible background for close button
              : scrolled ? 'text-gray-600' : 'text-white'
          } z-50`} // Increased z-index to ensure it's clickable
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu with improved close button */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden overflow-y-auto pt-20">
          {/* ADDED: Additional close button at the top right for better visibility */}
          <button 
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-indigo-600"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-6">
              {['Buy', 'Rent', 'Sell', 'Listings', 'Top Builders'].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase().replace(' ', '-')}`} 
                  className="text-lg font-medium text-gray-900 hover:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              
              <div className="pt-6 border-t border-gray-100 flex flex-col space-y-4">
                <Link 
                  to="/login" 
                  className="text-lg font-medium text-gray-900 hover:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/signup"
                  className="bg-indigo-600 text-white text-center py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};