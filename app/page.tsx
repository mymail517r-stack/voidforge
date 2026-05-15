'use client';

import { Download, Zap, Shield, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProjectCard } from '@/components/project/ProjectCard';

const featuredProjects = [
  {
    id: '1',
    title: 'Ultimate Discord Bot',
    slug: 'ultimate-discord-bot',
    description: 'Advanced bot with moderation, music, and economy features',
    thumbnail: 'https://via.placeholder.com/800x450?text=Discord+Bot',
    category: 'Tools',
    views: 12500,
    downloads: 3420,
    likes: 890,
    tags: ['discord', 'bot', 'moderation'],
    featured: true,
    verified: true,
  },
  {
    id: '2',
    title: 'Minecraft Shader Pack',
    slug: 'minecraft-shader-pack',
    description: 'Realistic graphics enhancement for Minecraft',
    thumbnail: 'https://via.placeholder.com/800x450?text=Shader+Pack',
    category: 'Mods',
    views: 45000,
    downloads: 12300,
    likes: 5600,
    tags: ['minecraft', 'shader', 'graphics'],
    featured: true,
    verified: true,
  },
  {
    id: '3',
    title: 'Game Dev Template',
    slug: 'game-dev-template',
    description: 'Complete template for starting your game development journey',
    thumbnail: 'https://via.placeholder.com/800x450?text=Game+Template',
    category: 'Templates',
    views: 8900,
    downloads: 2100,
    likes: 450,
    tags: ['template', 'game', 'development'],
    featured: false,
    verified: true,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Welcome to <span className="gradient-text">VoidForge</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            The ultimate platform for premium gaming resources, tools, and creator content. Discover thousands of verified projects from our community.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/explore">
              <Button size="lg">Explore Now</Button>
            </Link>
            <Link href="/submit">
              <Button variant="secondary" size="lg">Submit Your Project</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-16 stagger">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
              <p className="text-gray-400">Community Members</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">2.4K+</div>
              <p className="text-gray-400">Projects</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">125K+</div>
              <p className="text-gray-400">Downloads</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">890+</div>
              <p className="text-gray-400">Active Creators</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose VoidForge?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card hover className="p-6">
              <Zap className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Instant access to premium resources with blazing fast downloads.</p>
            </Card>
            <Card hover className="p-6">
              <Shield className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Verified Content</h3>
              <p className="text-gray-400 text-sm">All resources are carefully curated and verified by our team.</p>
            </Card>
            <Card hover className="p-6">
              <Users className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="font-bold mb-2">Community Driven</h3>
              <p className="text-gray-400 text-sm">Connect with thousands of creators and gamers worldwide.</p>
            </Card>
            <Card hover className="p-6">
              <Download className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="font-bold mb-2">Easy Sharing</h3>
              <p className="text-gray-400 text-sm">Share your creations and get discovered by our growing community.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/explore">
              <Button>View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12">
            <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
            <p className="text-gray-400 mb-6 text-lg">
              Join thousands of creators and gamers on VoidForge. Share your creations, discover amazing resources, and grow your community.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/explore">
                <Button>Browse Projects</Button>
              </Link>
              <Link href="/submit">
                <Button variant="secondary">Share Your Project</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
