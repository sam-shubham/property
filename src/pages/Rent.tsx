import { Layout } from '../components/Layout';
import { SearchBar } from '../components/SearchBar';
import { PropertyCard } from '../components/PropertyCard';
import { Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';

const SAMPLE_PROPERTIES = Array(6).fill({
  id: '1',
  title: '3 BHK Apartment for Rent',
  description: 'Fully furnished apartment with modern amenities',
  price: 35000,
  location: 'Indiranagar, Bangalore',
  type: 'rent',
  category: 'apartment',
  bedrooms: 3,
  bathrooms: 2,
  area: 1500,
  images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  features: ['Fully Furnished', 'Power Backup', 'Security'],
  verified: true,
  premium: true,
  createdAt: '2024-02-25T10:00:00Z',
  updatedAt: '2024-02-25T10:00:00Z'
});

export const Rent = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-slate-900">
            Properties for Rent
          </h1>
          <p className="text-lg text-slate-600">
            Discover your perfect rental property from our extensive collection
          </p>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="secondary" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <span className="text-sm text-slate-600">
              Showing 1-6 of 156 properties
            </span>
          </div>
          <div className="flex items-center gap-2">
            <select className="rounded-md border border-slate-200 px-3 py-2 text-sm">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_PROPERTIES.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="secondary">Load More Properties</Button>
        </div>
      </div>
    </Layout>
  );
};