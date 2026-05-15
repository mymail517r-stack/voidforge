'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Attempting login with:', { username, password });
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      setSuccess('Login successful! Redirecting...');
      
      // Wait a moment for cookie to be set
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-slideDown">
          <div className="inline-flex items-center gap-3 mb-4 hover-scale">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center animate-pulse-glow">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">VoidForge Admin</span>
          </div>
          <p className="text-gray-400">Sign in to access the admin dashboard</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-purple-900/30 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />

            {error && <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded p-3">{error}</div>}
            {success && <div className="text-green-500 text-sm bg-green-500/10 border border-green-500/20 rounded p-3">{success}</div>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-400 text-sm text-center mb-3">
              Demo Credentials:
            </p>
            <div className="bg-gray-800/50 rounded p-3 text-xs text-gray-300 font-mono space-y-1">
              <div><span className="text-purple-400">Username:</span> admin</div>
              <div><span className="text-purple-400">Password:</span> admin123</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
