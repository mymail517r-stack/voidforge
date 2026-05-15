'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, Sparkles, Users, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function HomePage() {
  const features = [
    { icon: Zap, title: 'Lightning Fast', description: 'Download resources instantly with optimized delivery' },
    { icon: Sparkles, title: 'Premium Quality', description: 'Curated collection of the best gaming resources' },
    { icon: Users, title: 'Active Community', description: 'Connect with thousands of creators and developers' },
    { icon: Rocket, title: 'Easy Upload', description: 'Share your creations with the world in minutes' },
  ];

  const stats = [
    { label: 'Projects', value: '2.4K+' },
    { label: 'Downloads', value: '125K+' },
    { label: 'Creators', value: '890+' },
    { label: 'Community', value: '50K+' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4 px-4 py-2 bg-purple-900/30 border border-purple-700/50 rounded-full">
              <span className="text-purple-300 text-sm font-semibold">Welcome to VoidForge</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="gradient-text">The Ultimate Creator</span>
              <br />
              <span className="text-white">Gaming Ecosystem</span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover premium Discord tools, Minecraft resources, gaming templates, and digital assets from the world's best creators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                <Link href="/explore" className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" /> Explore Now
                </Link>
              </Button>
              <Button size="lg" variant="secondary">
                <Link href="/submit" className="flex items-center gap-2">
                  Share Your Work
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose VoidForge?</h2>
            <p className="text-gray-400 text-lg">Everything you need for premium gaming and creative resources</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 text-center border border-purple-600/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join the Community?</h2>
            <p className="text-gray-400 mb-8 text-lg">Start exploring premium resources or share your creations with thousands of creators.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                <Link href="/explore">Explore Resources</Link>
              </Button>
              <Button size="lg" variant="secondary">
                <Link href="/submit">Submit Project</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
