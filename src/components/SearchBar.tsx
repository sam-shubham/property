import { useState } from 'react';
import { Search, MapPin, Sliders } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

export const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('buy');

  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-4 shadow-lg">
      <div className="mb-4 flex gap-4 border-b pb-4">
        <button
          className={`relative px-4 py-2 ${
            propertyType === 'buy'
              ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:-translate-y-3 after:bg-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          onClick={() => setPropertyType('buy')}
        >
          Buy
        </button>
        <button
          className={`relative px-4 py-2 ${
            propertyType === 'rent'
              ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:-translate-y-3 after:bg-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          onClick={() => setPropertyType('rent')}
        >
          Rent
        </button>
        <button
          className={`relative px-4 py-2 ${
            propertyType === 'pg'
              ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:-translate-y-3 after:bg-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          onClick={() => setPropertyType('pg')}
        >
          PG/Co-living
        </button>
        <button
          className={`relative px-4 py-2 ${
            propertyType === 'commercial'
              ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:-translate-y-3 after:bg-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          onClick={() => setPropertyType('commercial')}
        >
          Commercial
        </button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Enter city, locality or project"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="gap-2">
          <Search className="h-5 w-5" />
          Search
        </Button>
        <Button variant="secondary" className="gap-2">
          <Sliders className="h-5 w-5" />
          Filters
        </Button>
      </div>
    </div>
  );
};