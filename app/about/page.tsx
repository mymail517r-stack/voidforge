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
        {/* Hero */}
        <div
          
        >
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About VoidForge</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            VoidForge is the ultimate premium gaming and creator platform. We connect thousands of
            creators with millions of users seeking the best Discord tools, Minecraft resources,
            gaming templates, graphics, and digital assets.
          </p>
        </div>

        {/* Mission Section */}
        <div
          transition={{ delay: 0.1 }}
          
        >
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-400 text-lg mb-4">
              We're building the most premium, secure, and user-friendly platform for gaming
              creators and developers to share their work.
            </p>
            <p className="text-gray-400 text-lg">
              Our platform empowers creators to monetize their passion while giving users access to
              the highest quality resources in the gaming ecosystem.
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

        {/* Values */}
        <div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} >
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover className="p-6 h-full">
                    <Icon className="w-10 h-10 text-purple-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div
      initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          
        >
        <div className="text-center">
          <Card className="p-12 border border-purple-600/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
            <h2 className="text-3xl font-bold mb-4">Join the VoidForge Community</h2>
            <p className="text-gray-400 mb-6 text-lg">
              Start exploring premium resources or share your creations with thousands of creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/explore"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Explore Resources
              </a>
              <a
                href="/submit"
                className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
              >
                Share Your Work
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
