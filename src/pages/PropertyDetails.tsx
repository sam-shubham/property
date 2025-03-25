import { Layout } from '../components/Layout';
import { Heart, Share2, MapPin, Bed, Bath, Square, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

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
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
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
  updatedAt: '2024-02-25T10:00:00Z'
};

export const PropertyDetails = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-slate-900">
                {PROPERTY.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="h-5 w-5" />
                <span>{PROPERTY.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="gap-2">
                <Heart className="h-5 w-5" />
                Save
              </Button>
              <Button variant="ghost" className="gap-2">
                <Share2 className="h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg">
            <img
              src={PROPERTY.images[0]}
              alt={PROPERTY.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {PROPERTY.images.slice(1).map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`${PROPERTY.title} - View ${index + 2}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-semibold">Property Details</h2>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-slate-400" />
                  <span>{PROPERTY.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-slate-400" />
                  <span>{PROPERTY.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-slate-400" />
                  <span>{PROPERTY.area} sq.ft</span>
                </div>
              </div>
              <p className="text-slate-600">{PROPERTY.description}</p>
            </div>

            <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-semibold">Features & Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {PROPERTY.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ₹{PROPERTY.price.toLocaleString()}
              </span>
              {PROPERTY.type === 'rent' && <span className="text-slate-600">/month</span>}
            </div>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-200 px-3 py-2"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-slate-200 px-3 py-2"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full rounded-md border border-slate-200 px-3 py-2"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  className="w-full rounded-md border border-slate-200 px-3 py-2"
                  rows={4}
                  placeholder="I'm interested in this property..."
                />
              </div>
              <Button className="w-full">Contact Agent</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};