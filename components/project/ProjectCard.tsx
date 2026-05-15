'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Download, Heart, Eye, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [liked, setLiked] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/project/${project.slug}`}>
        <Card hover className="overflow-hidden group cursor-pointer h-full">
          <div className="relative overflow-hidden h-48 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            {project.thumbnail && (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            )}
            {project.featured && (
              <div className="absolute top-3 right-3 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Star className="w-3 h-3" /> Featured
              </div>
            )}
            {project.verified && (
              <div className="absolute top-3 left-3 bg-blue-500/20 border border-blue-500/50 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                ✓ Verified
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-900/30 border border-purple-700/50 text-purple-300 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {project.views}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {project.downloads}
                </div>
              </div>
              <div className="text-purple-400 font-semibold">{project.category}</div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
