import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AuthHeader = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="mr-6">
            <h1 className="text-xl font-bold text-indigo-600">PropertyPrime</h1>
          </Link>
        </div>
        <Link 
          to="/"
          className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
      </div>
    </header>
  );
};