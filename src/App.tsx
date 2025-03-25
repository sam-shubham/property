import { SearchBar } from './components/SearchBar';
import { PropertyCard } from './components/PropertyCard';
import { Building2, Home, Building, MapPin, Star, Award, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/Button';

const SAMPLE_PROPERTY = {
  id: '1',
  title: 'Luxury Apartment in Downtown',
  description: 'Beautiful apartment with modern amenities',
  price: 3500000,
  location: 'Downtown, Bangalore',
  type: 'sale' as const,
  category: 'apartment' as 'apartment',
  bedrooms: 3,
  bathrooms: 2,
  area: 1500,
  images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  features: ['Swimming Pool', 'Gym', 'Security'],
  verified: true,
  premium: true,
  createdAt: '2024-02-25T10:00:00Z',
  updatedAt: '2024-02-25T10:00:00Z'
};

// Add the agents data
const SAMPLE_AGENTS = [
  {
    id: '1',
    name: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 4.5,
    propertiesSold: 35,
    specialization: ['Residential', 'Luxury Homes'],
    location: 'Bangalore',
    badge: 'Top Seller'
  },
  {
    id: '2',
    name: 'Raj Kapoor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 4.0,
    propertiesSold: 28,
    specialization: ['Commercial', 'Office Spaces'],
    location: 'Mumbai',
    badge: 'Premium Agent'
  },
  {
    id: '3',
    name: 'Aisha Khan',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5.0,
    propertiesSold: 42,
    specialization: ['Luxury Properties', 'Villas'],
    location: 'Delhi',
    badge: 'Luxury Specialist'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 4.7,
    propertiesSold: 31,
    specialization: ['Residential', 'Investment Properties'],
    location: 'Hyderabad',
    badge: 'Top Seller'
  }
];

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              PropertyPrime
            </Link>
            <nav className="hidden space-x-8 lg:flex">
              <Link to="/buy" className="text-slate-600 hover:text-slate-900">
                Buy
              </Link>
              <Link to="/rent" className="text-slate-600 hover:text-slate-900">
                Rent
              </Link>
              <Link to="/sell" className="text-slate-600 hover:text-slate-900">
                Sell
              </Link>
              
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="rounded-md px-4 py-2 text-slate-600 hover:bg-slate-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
            Find Your Perfect Property
          </h1>
          <p className="mb-8 text-lg text-blue-100">
            Thousands of properties for buying, selling, and renting across the country
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">
            Browse by Property Type
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Home,
                title: 'Houses',
                description: 'Find your dream house',
              },
              {
                icon: Building2,
                title: 'Apartments',
                description: 'Modern living spaces',
              },
              {
                icon: Building,
                title: 'Commercial',
                description: 'Business properties',
              },
              {
                icon: MapPin,
                title: 'Plots',
                description: 'Build your future',
              },
            ].map((category) => (
              <div
                key={category.title}
                className="group rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
              >
                <category.icon className="mb-4 h-8 w-8 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {category.title}
                </h3>
                <p className="text-slate-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Featured Properties
            </h2>
            <a
              href="/properties"
              className="text-blue-600 hover:text-blue-700"
            >
              View all properties →
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[SAMPLE_PROPERTY, SAMPLE_PROPERTY, SAMPLE_PROPERTY].map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Agents Section - Adding the section from Agents.tsx */}
      <section id="agents" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Meet Our Expert Agents
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Our team of experienced real estate professionals is here to help you
              find your perfect property or sell your existing one.
            </p>
          </div>

          <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SAMPLE_AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
              >
                <div className="relative mb-4">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="mx-auto h-32 w-32 rounded-full object-cover"
                  />
                  <span className="absolute -right-2 top-0 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                    {agent.badge}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-semibold text-slate-900">
                    {agent.name}
                  </h3>
                  <p className="mb-2 text-sm text-slate-600">{agent.location}</p>
                  <div className="mb-3 flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="font-medium">{agent.rating}</span>
                  </div>
                  <p className="mb-4 text-sm text-slate-600">
                    {agent.propertiesSold} properties sold
                  </p>
                  <div className="mb-4 flex flex-wrap justify-center gap-2">
                    {agent.specialization.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <Button size="sm" className="w-full">
                    Contact Agent
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-blue-600 p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-bold">Join Our Team</h2>
            <p className="mb-6">
              Are you a real estate professional looking to take your career to the
              next level? Join PropertyPrime and get access to exclusive listings and
              qualified leads.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-300">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                PropertyPrime
              </h3>
              <p className="text-sm">
                Find your perfect property from our wide range of residential and
                commercial options across the country.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Popular Searches</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/properties/bangalore" className="hover:text-white">
                    Properties in Bangalore
                  </Link>
                </li>
                <li>
                  <Link to="/properties/mumbai" className="hover:text-white">
                    Properties in Mumbai
                  </Link>
                </li>
                <li>
                  <Link to="/properties/delhi" className="hover:text-white">
                    Properties in Delhi
                  </Link>
                </li>
                <li>
                  <Link to="/properties/hyderabad" className="hover:text-white">
                    Properties in Hyderabad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
              <ul className="space-y-2 text-sm">
                <li>support@propertyprime.com</li>
                <li>+91 98765 43210</li>
                <li>
                  123 Property Lane,
                  <br />
                  Bangalore, Karnataka
                  <br />
                  India - 560001
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2024 PropertyPrime. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;