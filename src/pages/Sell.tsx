import { useState } from 'react';
import { 
  Building2, Camera, Users, FileCheck, ArrowRight, 
  CheckCircle, Shield, X, Send, Mail, Phone, MapPin, Menu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Sell = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

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

      {/* Hero section with indigo gradient */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/80"></div>
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover object-center" 
            alt="Modern building"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="animate-fadeInLeft">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Sell Your Property with Confidence
              </h1>
              <p className="text-lg text-white/90 mb-8">
                List your property with PropertyPrime and get access to thousands
                of verified buyers. Our expert agents will help you get the best
                price for your property.
              </p>
              <div className="flex gap-4">
                <button 
                  className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => setShowContactForm(true)}
                >
                  List Your Property
                </button>
                <Link 
                  to="/pricing" 
                  className="px-6 py-3 bg-transparent text-white border border-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block animate-fadeInRight">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Modern building"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="bg-green-500 text-white p-2 rounded-full mr-3">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold">2,500+</p>
                    <p className="text-gray-500 text-sm">Properties Sold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why sell with us section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Sell with PropertyPrime?
            </h2>
            <p className="text-gray-500">
              Our platform offers unique advantages to help you sell your property faster and at the best price
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Building2,
                title: "Maximum Exposure",
                description: "Your property will be visible to thousands of verified buyers"
              },
              {
                icon: Camera,
                title: "Professional Photos",
                description: "Free professional photography for your property"
              },
              {
                icon: Users,
                title: "Expert Agents",
                description: "Dedicated agents to handle everything for you"
              },
              {
                icon: Shield,
                title: "Secure Process",
                description: "Simple and transparent selling process"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-all animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex mb-4 rounded-full bg-indigo-50 p-3">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-500">
              Selling your property is easy with our simple 3-step process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 relative animate-fadeInUp">
            <div className="hidden md:block absolute top-16 left-[25%] right-[25%] h-0.5 bg-gray-200 z-0"></div>
            
            {[
              {
                step: "01",
                title: "List Your Property",
                description: "Fill out our simple form with your property details"
              },
              {
                step: "02",
                title: "Meet Our Agents",
                description: "Professional photography and property assessment"
              },
              {
                step: "03",
                title: "Get Top Offers",
                description: "Receive offers and close the deal with our support"
              }
            ].map((step, index) => (
              <div key={index} className="relative z-10 text-center">
                <div className="inline-flex mb-6 rounded-full bg-white shadow-sm p-4 border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg animate-fadeInUp">
            <div className="bg-indigo-600 p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Get a Free Property Valuation
              </h2>
              <p className="text-indigo-100">
                Find out how much your property is worth in today's market
              </p>
            </div>
            
            <div className="p-6 md:p-10">
              <form className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Plot</option>
                    <option>Commercial</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your property location"
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area (sq.ft)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter built-up area"
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <textarea
                    placeholder="Any specific details about your property..."
                    rows={3}
                    className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                
                <div className="md:col-span-2 flex justify-center">
                  <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Get Free Valuation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12 animate-fadeInUp">
            <h2 className="text-2xl font-semibold mb-4">What Our Sellers Say</h2>
            <p className="text-gray-500">Join thousands of satisfied customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "PropertyPrime helped me sell my apartment for 15% above market value. Their marketing strategy was impressive!",
                author: "Vikram Malhotra",
                role: "Seller in Mumbai",
                avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              },
              {
                text: "I received multiple offers within a week. The professional photos and virtual tour made all the difference.",
                author: "Neha Kapoor",
                role: "Seller in Bangalore",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              },
              {
                text: "The team handled everything, from staging to paperwork. It was the smoothest property sale I've experienced.",
                author: "Raj Sharma",
                role: "Seller in Delhi",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl hover:shadow-md transition-all animate-fadeInUp" style={{animationDelay: `${index * 100}ms`}}>
                <p className="text-gray-600 mb-4 text-sm italic">{testimonial.text}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-indigo-100"
                  />
                  <div>
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 animate-fadeInUp">
            Ready to Sell Your Property?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto animate-fadeInUp" style={{animationDelay: '100ms'}}>
            Join thousands of satisfied sellers who achieved great results with PropertyPrime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{animationDelay: '200ms'}}>
            <button
              onClick={() => setShowContactForm(true)}
              className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              List Your Property
            </button>
            <Link 
              to="/contact"
              className="px-6 py-3 bg-transparent text-white border border-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Same footer as main app */}
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white text-lg font-medium mb-4">PropertyPrime</h3>
              <p className="text-sm mb-4">Find your perfect property from our wide range of residential and commercial options.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Top Locations</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/properties/bangalore" className="hover:text-white transition-colors">Bangalore</Link></li>
                <li><Link to="/properties/mumbai" className="hover:text-white transition-colors">Mumbai</Link></li>
                <li><Link to="/properties/delhi" className="hover:text-white transition-colors">Delhi</Link></li>
                <li><Link to="/properties/hyderabad" className="hover:text-white transition-colors">Hyderabad</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Mail className="h-4 w-4 mr-2 mt-0.5" />
                  <span>support@propertyprime.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-0.5" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                  <span>123 Property Lane,<br />Bangalore, Karnataka</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 PropertyPrime. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact form modal - same as in App.tsx */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-md animate-scaleIn overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">List Your Property</h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-5">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select className="w-full rounded-lg border border-gray-200 p-2 text-sm">
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Plot</option>
                    <option>Commercial</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    placeholder="Tell us about your property" 
                    className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                    rows={4}
                  ></textarea>
                </div>
                
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Submit Listing
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sell;