import { Layout } from '../components/Layout';
import { Building2, Camera, Users, FileCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Sell = () => {
  return (
    <Layout>
      <div className="bg-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h1 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
                Sell Your Property with Confidence
              </h1>
              <p className="mb-8 text-lg text-blue-100">
                List your property with PropertyPrime and get access to thousands
                of verified buyers. Our expert agents will help you get the best
                price for your property.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                List Your Property
              </Button>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Modern building"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Why Sell with PropertyPrime?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <Building2 className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold">Maximum Exposure</h3>
              <p className="text-slate-600">
                Your property will be visible to thousands of verified buyers
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <Camera className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold">Professional Photos</h3>
              <p className="text-slate-600">
                Free professional photography for your property
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <Users className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold">Expert Agents</h3>
              <p className="text-slate-600">
                Dedicated agents to handle everything for you
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <FileCheck className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-semibold">Easy Process</h3>
              <p className="text-slate-600">
                Simple and transparent selling process
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Get a Free Property Valuation
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Property Type
                </label>
                <select className="w-full rounded-md border border-slate-200 px-3 py-2">
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villa</option>
                  <option>Plot</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter your property location"
                  className="w-full rounded-md border border-slate-200 px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Area (sq.ft)
                </label>
                <input
                  type="number"
                  placeholder="Enter built-up area"
                  className="w-full rounded-md border border-slate-200 px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full rounded-md border border-slate-200 px-3 py-2"
                />
              </div>
            </div>
            <Button className="mt-6">Get Free Valuation</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};