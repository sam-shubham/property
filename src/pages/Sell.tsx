import { useState, useEffect } from 'react';
import { 
  Building2, Camera, Users, FileCheck, ArrowRight, 
  CheckCircle, Shield, X, Send, Mail, Phone, MapPin, Menu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Sell = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Similar scroll handler as in App.tsx
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header />
      
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

      <Footer />

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