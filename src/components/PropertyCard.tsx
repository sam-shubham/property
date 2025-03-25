import { Property } from '@/types';
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Button } from './ui/Button';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {property.verified && (
          <span className="absolute left-2 top-2 rounded bg-green-500 px-2 py-1 text-xs font-medium text-white">
            Verified
          </span>
        )}
        {property.premium && (
          <span className="absolute left-2 top-10 rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white">
            Premium
          </span>
        )}
        <button className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-slate-600 transition-colors hover:text-red-500">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4" />
          <span>{property.location}</span>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-slate-900">
          {property.title}
        </h3>

        <div className="mb-4 flex gap-4 text-sm text-slate-600">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} baths</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{property.area} sq.ft</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ₹{property.price.toLocaleString()}
            {property.type === 'rent' && '/month'}
          </span>
          <Button size="sm">Contact</Button>
        </div>
      </div>
    </div>
  );
};