'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Gamepad2, MessageCircle, Palette, Zap, BookOpen, Wrench } from 'lucide-react';

const categories = [
  {
    id: 'discord-tools',
    name: 'Discord Tools',
    description: 'Premium Discord bots, commands, and integrations',
    icon: MessageCircle,
    color: 'from-blue-600 to-blue-500',
    count: '234+',
  },
  {
    id: 'minecraft-resources',
    name: 'Minecraft Resources',
    description: 'Texture packs, mods, skins, and shaders',
    icon: Gamepad2,
    color: 'from-green-600 to-green-500',
    count: '456+',
  },
  {
    id: 'gaming-templates',
    name: 'Gaming Templates',
    description: 'Ready-to-use templates and configurations',
    icon: Wrench,
    color: 'from-purple-600 to-purple-500',
    count: '189+',
  },
  {
    id: 'graphics-logos',
    name: 'Graphics & Logos',
    description: 'Professional graphics, logos, and design assets',
    icon: Palette,
    color: 'from-pink-600 to-pink-500',
    count: '312+',
  },
  {
    id: 'configs',
    name: 'Configs',
    description: 'Game configs, settings, and optimization files',
    icon: Zap,
    color: 'from-yellow-600 to-yellow-500',
    count: '145+',
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Guides, tutorials, and learning resources',
    icon: BookOpen,
    color: 'from-cyan-600 to-cyan-500',
    count: '78+',
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Browse Categories</h1>
          <p className="text-xl text-gray-400">
            Explore premium resources organized by category
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/explore?category=${category.name}`}>
                  <Card
                    hover
                    className={`p-8 cursor-pointer bg-gradient-to-br ${category.color} opacity-20 hover:opacity-30 transition-opacity h-full flex flex-col`}
                  >
                    <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 flex-1">{category.description}</p>
                    <div className="text-purple-400 font-semibold text-lg">{category.count} Resources</div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
