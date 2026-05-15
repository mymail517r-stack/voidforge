'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Project } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div>
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
                    <th className="px-6 py-4 font-semibold">Title</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Views</th>
                    <th className="px-6 py-4 font-semibold">Downloads</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-900/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{project.title}</td>
                      <td className="px-6 py-4">{project.category}</td>
                      <td className="px-6 py-4">{project.views}</td>
                      <td className="px-6 py-4">{project.downloads}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {project.verified && (
                            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-semibold">
                              Verified
                            </span>
                          )}
                          {project.featured && (
                            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-semibold">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link href={`/project/${project.slug}`}>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Eye className="w-4 h-4" /> View
                            </Button>
                          </Link>
                          <Button variant="secondary" size="sm" className="gap-1">
                            <Edit className="w-4 h-4" /> Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-gray-400 text-lg">No projects yet. Create one to get started!</p>
            <Link href="/admin/upload">
              <Button variant="primary" className="mt-4">
                Create Project
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
