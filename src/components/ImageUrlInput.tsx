import { useState } from 'react';
import { X } from 'lucide-react';

interface ImageUrlInputProps {
  onUrlsChange: (urls: string[]) => void;
  initialUrls?: string[];
}

export const ImageUrlInput = ({ onUrlsChange, initialUrls = [] }: ImageUrlInputProps) => {
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [currentUrl, setCurrentUrl] = useState('');
  const [error, setError] = useState('');

  const addUrl = () => {
    if (!currentUrl) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(currentUrl);
    } catch (e) {
      setError('Please enter a valid URL');
      return;
    }

    const newUrls = [...urls, currentUrl];
    setUrls(newUrls);
    onUrlsChange(newUrls);
    setCurrentUrl('');
    setError('');
  };

  const removeUrl = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
    onUrlsChange(newUrls);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Property Images
        </label>
        <div className="flex">
          <input
            type="text"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            placeholder="Enter image URL"
            className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={addUrl}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {urls.map((url, index) => (
          <div key={index} className="relative group">
            <img 
              src={url} 
              alt={`Property ${index + 1}`} 
              className="h-32 w-full object-cover rounded-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error';
              }}
            />
            <button
              type="button"
              onClick={() => removeUrl(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500">
        Tip: Use image hosting services like ImgBB or Imgur to upload images and paste the direct image URL here
      </p>
    </div>
  );
};