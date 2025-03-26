import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface SafeLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

// Map of non-implemented pages to redirect to implemented pages
const ROUTE_FALLBACKS: Record<string, string> = {
  '/about': '/',
  '/contact': '/',
  '/careers': '/',
  '/blog': '/',
  '/pricing': '/sell',
  '/terms': '/',
  '/privacy': '/',
  '/forgot-password': '/login',
  '/properties/bangalore': '/listings?city=bangalore',
  '/properties/mumbai': '/listings?city=mumbai',
  '/properties/delhi': '/listings?city=delhi',
  '/properties/hyderabad': '/listings?city=hyderabad',
  '/properties/chennai': '/listings?city=chennai',
  '/properties/pune': '/listings?city=pune',
};

export const SafeLink = ({ to, children, className }: SafeLinkProps) => {
  // Redirect to fallback if route doesn't exist yet
  const destination = ROUTE_FALLBACKS[to] || to;
  
  return (
    <Link to={destination} className={className}>
      {children}
    </Link>
  );
};