'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Download, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  views: number;
  downloads: number;
  likes: number;
}

interface Stats {
  projects: number;
  views: number;
  downloads: number;
  submissions: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<Stats>({ projects: 0, views: 0, downloads: 0, submissions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        router.push('/admin/login');
        return;
      }
      const data = await response.json();
      setProjects(data.slice(0, 5));
      
      setStats({
        projects: data.length,
        views: data.reduce((sum: number, p: Project) => sum + p.views, 0),
        downloads: data.reduce((sum: number, p: Project) => sum + p.downloads, 0),
        submissions: 12,
      });
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const statItems = [
    { icon: Plus, label: 'Total Projects', value: stats.projects, color: 'purple' },
    { icon: Eye, label: 'Total Views', value: stats.views, color: 'blue' },
    { icon: Download, label: 'Total Downloads', value: stats.downloads, color: 'cyan' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage VoidForge platform</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/upload">
              <Button variant="primary">Upload Project</Button>
            </Link>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-gradient-to-br from-gray-900 to-black border border-purple-900/30 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">{item.label}</p>
                    <p className="text-3xl font-bold">{item.value.toLocaleString()}</p>
                  </div>
                  <Icon className="w-12 h-12 text-purple-600/50" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-900/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Views</th>
                  <th className="px-4 py-3 font-semibold">Downloads</th>
                  <th className="px-4 py-3 font-semibold">Likes</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="px-4 py-3">{project.title}</td>
                    <td className="px-4 py-3">{project.views.toLocaleString()}</td>
                    <td className="px-4 py-3">{project.downloads.toLocaleString()}</td>
                    <td className="px-4 py-3">{project.likes.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Link href="/admin/projects">
                        <Button variant="ghost" className="text-sm">Edit</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
