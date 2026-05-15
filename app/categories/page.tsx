'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';

const categories = [
  {
    id: '1',
    name: 'Games',
    description: 'Complete games, game mods, and gaming resources',
    count: '324 projects',
    icon: '🎮',
  },
  {
    id: '2',
    name: 'Tools',
    description: 'Development tools, utilities, and plugins',
    count: '456 projects',
    icon: '⚙️',
  },
  {
    id: '3',
    name: 'Assets',
    description: '3D models, textures, sprites, and animations',
    count: '789 projects',
    icon: '🎨',
  },
  {
    id: '4',
    name: 'Plugins',
    description: 'Engine plugins and extensions',
    count: '234 projects',
    icon: '🔌',
  },
  {
    id: '5',
    name: 'Mods',
    description: 'Game modifications and enhancements',
    count: '567 projects',
    icon: '✨',
  },
  {
    id: '6',
    name: 'Templates',
    description: 'Project templates and starter kits',
    count: '123 projects',
    icon: '📋',
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Browse Categories</h1>
          <p className="text-xl text-gray-400">
            Explore premium resources organized by category
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/explore?category=${category.name}`}>
              <Card hover className="p-8 h-full">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-400 mb-4">{category.description}</p>
                <p className="text-purple-400 text-sm font-semibold">{category.count}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
