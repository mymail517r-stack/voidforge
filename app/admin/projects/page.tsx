'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  category: string;
  views: number;
  downloads: number;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await fetch('/api/projects');
    if (response.ok) {
      const data = await response.json();
      setProjects(data);
    }
    setLoading(false);
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Manage Projects</h1>
          <p className="text-gray-400">View, edit, and delete projects</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : projects.length > 0 ? (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-700 bg-gray-900/50">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Title</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Views</th>
                    <th className="px-4 py-3 font-semibold">Downloads</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                      <td className="px-4 py-3 font-medium">{project.title}</td>
                      <td className="px-4 py-3">{project.category}</td>
                      <td className="px-4 py-3">{project.views.toLocaleString()}</td>
                      <td className="px-4 py-3">{project.downloads.toLocaleString()}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/upload?id=${project.id}`)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => deleteProject(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-400 mb-4">No projects yet</p>
            <Link href="/admin/upload">
              <Button>Upload Your First Project</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
