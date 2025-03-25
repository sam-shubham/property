import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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

      {/* Main Content */}
      <main>{children}</main>

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
};