export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'commercial' | 'plot';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: string[];
  features: string[];
  verified: boolean;
  premium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'agent' | 'admin';
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  userId: string;
  properties: number;
  rating: number;
  reviews: number;
  specialization: string[];
  verified: boolean;
  premium: boolean;
}