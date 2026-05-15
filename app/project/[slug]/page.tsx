'use client';

import { useEffect, useState } from 'react';
import { Download, Heart, Share2, Eye, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [params.slug]);

  const fetchProject = async () => {
    const response = await fetch('/api/projects');
    if (response.ok) {
      const projects = await response.json();
      const found = projects.find((p: any) => p.slug === params.slug);
      setProject(found || null);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-12 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
          <Link href="/explore">
            <Button>Back to Projects</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/explore" className="text-purple-400 hover:text-purple-300 mb-8 inline-block">
          ← Back to Projects
        </Link>

        <Card className="overflow-hidden mb-8">
          <div className="relative h-96 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-400">
                <Eye className="w-5 h-5" />
                <span>{project.views?.toLocaleString() || 0} views</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Download className="w-5 h-5" />
                <span>{project.downloads?.toLocaleString() || 0} downloads</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Heart className="w-5 h-5" />
                <span>{project.likes?.toLocaleString() || 0} likes</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-400">{project.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <p className="text-gray-400 leading-relaxed">{project.content}</p>
            </div>

            {project.changelog && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Latest Changes</h2>
                <Card className="p-6">
                  <p className="text-gray-400 whitespace-pre-wrap">{project.changelog}</p>
                </Card>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Comments</h2>
              <Card className="p-6">
                <p className="text-gray-400">Comments coming soon...</p>
              </Card>
            </div>
          </div>

          <div>
            <Card className="p-6 sticky top-20">
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Version</p>
                <p className="text-lg font-bold">{project.version}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">File Size</p>
                <p className="text-lg font-bold">{project.fileSize}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Category</p>
                <p className="text-lg font-bold">{project.category}</p>
              </div>

              {project.tags && project.tags.length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-900/30 text-purple-400 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <Button
                  as="a"
                  href={project.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" /> Download Now
                </Button>
                <Button variant="secondary" className="w-full">
                  <Heart className="w-4 h-4 mr-2" /> Like
                </Button>
                <Button variant="ghost" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>

              {project.author && (
                <Card className="p-4 bg-gray-900/50">
                  <p className="text-gray-400 text-sm mb-2">Creator</p>
                  <p className="font-bold">{project.author?.name || 'Unknown'}</p>
                </Card>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
