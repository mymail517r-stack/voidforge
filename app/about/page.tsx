'use client';

import React from 'react';
import { Zap, Users, Rocket, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function AboutPage() {
  const values = [
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'We push boundaries and create cutting-edge gaming resources and tools.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of creators sharing their work and knowledge.',
    },
    {
      icon: Shield,
      title: 'Quality',
      description: 'Every resource on VoidForge is carefully curated and verified.',
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Lightning-fast downloads and instant access to premium resources.',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About VoidForge</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            VoidForge is the ultimate premium gaming and creator platform. We connect thousands of creators with millions of users seeking the best resources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-400 text-lg mb-4">
              To empower creators and provide gamers with access to premium, curated resources.
            </p>
            <p className="text-gray-400 text-lg">
              We believe in quality over quantity and community-driven development.
            </p>
          </div>

          <Card className="p-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
                <div className="text-gray-400">Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">2.4K+</div>
                <div className="text-gray-400">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">125K+</div>
                <div className="text-gray-400">Downloads</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">890+</div>
                <div className="text-gray-400">Creators</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} hover className="p-6 h-full">
                  <Icon className="w-10 h-10 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <Card className="p-12 border border-purple-600/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
            <h2 className="text-3xl font-bold mb-4">Join the VoidForge Community</h2>
            <p className="text-gray-400 mb-6 text-lg">
              Start sharing your creations and discover amazing resources today.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
