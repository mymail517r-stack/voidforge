'use client';

import React, { useEffect, useState } from 'react';
import { LogOut, Plus, Settings, Users, FileText, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Project, Submission } from '@/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState({ projects: 0, submissions: 0, downloads: 0, views: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectRes, submissionRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/submissions?status=pending'),
      ]);

      const projectData = await projectRes.json();
      const submissionData = await submissionRes.json();

      setProjects(projectData);
      setSubmissions(submissionData);
      
      const totalDownloads = projectData.reduce((sum: number, p: Project) => sum + p.downloads, 0);
      const totalViews = projectData.reduce((sum: number, p: Project) => sum + p.views, 0);
      
      setStats({
        projects: projectData.length,
        submissions: submissionData.length,
        downloads: totalDownloads,
        views: totalViews,
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const statCards = [
    { icon: FileText, label: 'Total Projects', value: stats.projects, color: 'purple' },
    { icon: TrendingUp, label: 'Total Views', value: stats.views, color: 'blue' },
    { icon: Users, label: 'Pending Submissions', value: stats.submissions, color: 'pink' },
    { icon: Plus, label: 'Total Downloads', value: stats.downloads, color: 'cyan' },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
      initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          
        >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage VoidForge platform</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/upload">
              <Button variant="primary" size="md">
                <Plus className="w-5 h-5" /> New Project
              </Button>
            </Link>
            <Button variant="secondary" size="md" onClick={handleLogout}>
              <LogOut className="w-5 h-5" /> Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div
      initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          
        >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const colorClass = {
              purple: 'from-purple-900/20 to-purple-900/10',
              blue: 'from-blue-900/20 to-blue-900/10',
              pink: 'from-pink-900/20 to-pink-900/10',
              cyan: 'from-cyan-900/20 to-cyan-900/10',
            }[stat.color];

            return (
              <div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card className={`p-6 bg-gradient-to-br ${colorClass}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div
      initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          
        >
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/projects">
            <Card hover className="p-6 cursor-pointer">
              <FileText className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-bold mb-2">Manage Projects</h3>
              <p className="text-gray-400 text-sm">View and edit all projects</p>
            </Card>
          </Link>

          <Link href="/admin/submissions">
            <Card hover className="p-6 cursor-pointer">
              <Users className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-bold mb-2">Review Submissions</h3>
              <p className="text-gray-400 text-sm">{stats.submissions} pending approval</p>
            </Card>
          </Link>

          <Link href="/admin/upload">
            <Card hover className="p-6 cursor-pointer">
              <Plus className="w-8 h-8 text-pink-400 mb-3" />
              <h3 className="font-bold mb-2">Upload Project</h3>
              <p className="text-gray-400 text-sm">Add new resource to platform</p>
            </Card>
          </Link>
        </div>

        {/* Recent Projects */}
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Projects</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : projects.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-gray-700">
                    <tr>
                      <th className="pb-3 font-semibold">Title</th>
                      <th className="pb-3 font-semibold">Category</th>
                      <th className="pb-3 font-semibold">Views</th>
                      <th className="pb-3 font-semibold">Downloads</th>
                      <th className="pb-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.slice(0, 5).map((project) => (
                      <tr key={project.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                        <td className="py-3">{project.title}</td>
                        <td className="py-3">{project.category}</td>
                        <td className="py-3">{project.views}</td>
                        <td className="py-3">{project.downloads}</td>
                        <td className="py-3">
                          <Link href={`/admin/project/${project.id}/edit`}>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400">No projects yet</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
