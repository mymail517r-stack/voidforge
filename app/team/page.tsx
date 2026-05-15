'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Instagram, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Creator } from '@/types';

export default function TeamPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        
        // Extract unique creators
        const creatorsMap = new Map();
        projects.forEach((project: any) => {
          if (project.author && !creatorsMap.has(project.author.id)) {
            creatorsMap.set(project.author.id, project.author);
          }
        });

        setCreators(Array.from(creatorsMap.values()));
      } catch (error) {
        console.error('Failed to fetch creators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
      initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          
        >
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Meet the Team</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Talented creators and developers building the best gaming and creative resources.
          </p>
        </div>

        {/* Creators Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : creators.length > 0 ? (
          <div
      initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            
          >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator, index) => (
              <div
                key={creator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <Image
                      src={creator.avatar}
                      alt={creator.name}
                      width={80}
                      height={80}
                      className="rounded-full mb-4"
                    />
                    <h3 className="text-xl font-bold mb-1">{creator.name}</h3>
                    <p className="text-purple-400 text-sm mb-2">@{creator.username}</p>
                    <p className="text-gray-400 text-sm mb-4">{creator.bio}</p>
                  </div>

                  {/* Badges */}
                  {creator.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {creator.badges.map((badge) => (
                        <span
                          key={badge}
                          className="bg-purple-900/30 border border-purple-700/50 text-purple-300 px-2 py-1 rounded text-xs font-semibold"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Skills */}
                  {creator.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {creator.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="flex gap-3 mt-auto pt-4 border-t border-gray-800">
                    {creator.discord && (
                      <a
                        href={`https://discord.com/users/${creator.discord}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-800 rounded transition-colors"
                        title="Discord"
                      >
                        <MessageCircle className="w-4 h-4 text-gray-400 hover:text-white" />
                      </a>
                    )}
                    {creator.github && (
                      <a
                        href={`https://github.com/${creator.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-800 rounded transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4 text-gray-400 hover:text-white" />
                      </a>
                    )}
                    {creator.instagram && (
                      <a
                        href={`https://instagram.com/${creator.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-800 rounded transition-colors"
                        title="Instagram"
                      >
                        <Instagram className="w-4 h-4 text-gray-400 hover:text-white" />
                      </a>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No creators yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
}
