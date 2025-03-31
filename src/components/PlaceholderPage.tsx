import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description: string;
  backLink?: string;
}

export const PlaceholderPage = ({ title, description, backLink }: PlaceholderPageProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {backLink && (
            <Link to={backLink} className="text-indigo-600 hover:text-indigo-800">
              ← Back
            </Link>
          )}
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-indigo-100 text-indigo-600 rounded-full p-4 inline-flex mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 16.5m14.8-1.2a2.25 2.25 0 00.658-1.591V8.318a2.25 2.25 0 00-1.659-2.186c-.761-.201-1.54-.348-2.327-.461" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          <p className="text-sm text-gray-500">This page is under construction. Check back soon!</p>
        </div>
      </main>
    </div>
  );
};

export default PlaceholderPage;