'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Download, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Stats {
  projects: number;
  views: number;
  downloads: number;
  submissions: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({ projects: 0, views: 0, downloads: 0, submissions: 0 });
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get username from cookie or localStorage
    const adminUsername = localStorage.getItem('admin_username') || 'Admin';
    setUsername(adminUsername);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setStats({
          projects: data.length,
          views: data.reduce((sum: number, p: any) => sum + (p.views || 0), 0),
          downloads: data.reduce((sum: number, p: any) => sum + (p.downloads || 0), 0),
          submissions: 12,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('admin_username');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/');
    }
  };

  const statItems = [
    { icon: Plus, label: 'Total Projects', value: stats.projects, color: 'purple' },
    { icon: Eye, label: 'Total Views', value: stats.views, color: 'blue' },
    { icon: Download, label: 'Total Downloads', value: stats.downloads, color: 'cyan' },
    { icon: Heart, label: 'Pending Submissions', value: stats.submissions, color: 'pink' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {username}! Manage your VoidForge platform</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/upload">
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-2" /> Upload Project
              </Button>
            </Link>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 stagger">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-gradient-to-br from-gray-900 to-black border border-purple-900/30 rounded-2xl p-6 hover-lift">
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
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/admin/projects">
              <Button variant="secondary" className="w-full justify-start">
                📋 Manage Projects
              </Button>
            </Link>
            <Link href="/admin/submissions">
              <Button variant="secondary" className="w-full justify-start">
                ✅ Review Submissions
              </Button>
            </Link>
            <Link href="/admin/upload">
              <Button variant="secondary" className="w-full justify-start">
                ⬆️ Upload New Project
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
