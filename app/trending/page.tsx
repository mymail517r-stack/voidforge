'use client';

import { useEffect, useState } from 'react';
import { ProjectCard } from '@/components/project/ProjectCard';
import { Card } from '@/components/ui/Card';

export default function TrendingPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingProjects();
  }, []);

  const fetchTrendingProjects = async () => {
    const response = await fetch('/api/projects?sort=trending');
    if (response.ok) {
      const data = await response.json();
      setProjects(data.slice(0, 12));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Trending Now</h1>
          <p className="text-xl text-gray-400">
            Check out the most popular projects on VoidForge right now.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center text-gray-400">
            No trending projects found. Check back soon!
          </Card>
        )}
      </div>
    </div>
  );
}
