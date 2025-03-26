import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { UserRoleIndicator } from './UserRoleIndicator';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
  const { currentUser } = useAuth();
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
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className={`text-xl font-bold ${scrolled ? 'text-indigo-600' : 'text-white'}`}>
            PropertyPrime
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {['Buy', 'Rent', 'Sell', 'Listings', 'Top Builders'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`} 
                className={`${scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-white hover:text-white/80'} text-sm font-medium transition-colors`}
              >
                {item}
              </Link>
            ))}
            
            {/* Add this conditional block */}
            {currentUser ? (
              <UserRoleIndicator />
            ) : (
              <div className="flex items-center ml-6 space-x-3">
                <Link to="/login">
                  <Button variant={scrolled ? "outline" : "ghost"} size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant={scrolled ? "primary" : "ghost"} size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile menu button */}
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
              
              {currentUser && (
                <div className="py-3 border-t border-gray-200">
                  <UserRoleIndicator />
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};