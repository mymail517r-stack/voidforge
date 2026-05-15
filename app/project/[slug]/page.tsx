'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Heart, Eye, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Project } from '@/types';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projects = await fetch('/api/projects').then((r) => r.json());
        const found = projects.find((p: Project) => p.slug === params.slug);
        setProject(found || null);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
          <Link href="/explore">
            <Button variant="primary">Back to Explore</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
            <Link href="/explore" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
              ← Back to Explore
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Thumbnail */}
              <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                {project.thumbnail && (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <h1 className="text-5xl font-bold mb-4">{project.title}</h1>

              <div className="flex flex-wrap gap-3 mb-6">
                {project.verified && (
                  <div className="bg-blue-500/20 border border-blue-500/50 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" /> Verified
                  </div>
                )}
                {project.featured && (
                  <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
                <div className="bg-purple-900/30 border border-purple-700/50 text-purple-300 px-3 py-1 rounded-full text-sm">
                  {project.category}
                </div>
                <div className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-sm">
                  v{project.version}
                </div>
              </div>

              <p className="text-xl text-gray-400 mb-8">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-900/30 border border-purple-700/50 text-purple-300 px-3 py-1 rounded text-sm hover:bg-purple-900/50 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-gray-800">
        <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Eye className="w-4 h-4" /> Views
                  </div>
                  <div className="text-2xl font-bold">{project.views.toLocaleString()}</div>
                </div>
        <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Download className="w-4 h-4" /> Downloads
                  </div>
                  <div className="text-2xl font-bold">{project.downloads.toLocaleString()}</div>
                </div>
        <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Heart className="w-4 h-4" /> Likes
                  </div>
                  <div className="text-2xl font-bold">{project.likes.toLocaleString()}</div>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none mb-8">
                <div className="text-gray-300 whitespace-pre-wrap">{project.content}</div>
              </div>

              {/* Screenshots */}
              {project.screenshots.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.screenshots.map((screenshot, index) => (
                      <div key={index} className="relative h-48 rounded-lg overflow-hidden bg-gray-900">
                        <Image
                          src={screenshot}
                          alt={`Screenshot ${index}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Card */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-4">Created By</h3>
                <Link href={`/creators/${project.author.username}`}>
                  <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                    <Image
                      src={project.author.avatar}
                      alt={project.author.name}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
        <div className="font-bold">{project.author.name}</div>
                      <div className="text-sm text-gray-400">@{project.author.username}</div>
                    </div>
                  </div>
                </Link>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center gap-2"
                  onClick={() => window.open(project.downloadLink, '_blank')}
                >
                  <Download className="w-5 h-5" /> Download
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={liked ? 'primary' : 'secondary'}
                    size="md"
                    className="justify-center gap-2"
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} /> Like
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    className="justify-center gap-2"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied!');
                    }}
                  >
                    <Share2 className="w-5 h-5" /> Share
                  </Button>
                </div>
              </div>

              {/* Info */}
              <Card className="p-6 space-y-4">
        <div className="text-sm text-gray-400">File Size</div>
                  <div className="font-semibold">{project.fileSize}</div>
                </div>
        <div className="text-sm text-gray-400">Category</div>
                  <div className="font-semibold">{project.category}</div>
                </div>
        <div className="text-sm text-gray-400">Last Updated</div>
                  <div className="font-semibold">{new Date(project.updatedAt).toLocaleDateString()}</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
