'use client';

import { Mail, Globe } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const creators = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Game Developer',
    bio: 'Specializing in indie game development and engine optimization.',
    avatar: 'https://via.placeholder.com/200x200?text=Alex+Chen',
    email: 'alex@voidforge.dev',
    website: 'https://alexchen.dev',
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    role: 'Asset Creator',
    bio: '3D artist and texture designer with 10+ years of experience.',
    avatar: 'https://via.placeholder.com/200x200?text=Maria+Rodriguez',
    email: 'maria@voidforge.dev',
    website: 'https://mariaart.com',
  },
  {
    id: '3',
    name: 'James Wilson',
    role: 'Tool Developer',
    bio: 'Creates powerful utilities and plugins for game development.',
    avatar: 'https://via.placeholder.com/200x200?text=James+Wilson',
    email: 'james@voidforge.dev',
    website: 'https://jamesdev.io',
  },
  {
    id: '4',
    name: 'Sarah Kim',
    role: 'Community Manager',
    bio: 'Building and nurturing the VoidForge creator community.',
    avatar: 'https://via.placeholder.com/200x200?text=Sarah+Kim',
    email: 'sarah@voidforge.dev',
    website: 'https://sarahkim.dev',
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Creators</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Meet the talented creators and builders behind VoidForge's amazing resources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <Card key={creator.id} hover className="p-6 text-center">
              <div className="mb-4">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{creator.name}</h3>
              <p className="text-purple-400 text-sm mb-3">{creator.role}</p>
              <p className="text-gray-400 text-sm mb-4">{creator.bio}</p>
              <div className="flex gap-3 justify-center">
                <a href={`mailto:${creator.email}`} className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href={creator.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
