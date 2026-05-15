'use client';

import { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ProjectCard } from '@/components/project/ProjectCard';

const categories = ['All', 'Games', 'Tools', 'Plugins', 'Mods', 'Assets'];
const sorts = [
  { value: 'latest', label: 'Latest' },
  { value: 'trending', label: 'Trending' },
  { value: 'downloads', label: 'Most Downloads' },
];

export default function ExplorePage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('latest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [search, category, sort]);

  const fetchProjects = async () => {
    setLoading(true);
    const query = new URLSearchParams({
      search,
      category: category === 'All' ? '' : category,
      sort,
    }).toString();

    const response = await fetch(`/api/projects?${query}`);
    if (response.ok) {
      const data = await response.json();
      setProjects(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Explore Resources</h1>
          <p className="text-xl text-gray-400">
            Discover thousands of premium gaming resources and tools.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={Search}
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-purple-900/30 rounded-lg focus:outline-none focus:border-purple-600"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  category === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
          <Card className="p-12 text-center">
            <p className="text-gray-400 mb-4">No projects found</p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
                setSort('latest');
              }}
              className="text-purple-400 hover:text-purple-300"
            >
              Reset filters
            </button>
          </Card>
        )}
      </div>
    </div>
  );
}
