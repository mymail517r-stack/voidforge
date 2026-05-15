'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Submission, Project } from '@/types';

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions');
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submission: Submission) => {
    try {
      const project: Project = {
        id: Date.now().toString(),
        title: submission.title,
        slug: submission.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
        description: submission.description,
        content: submission.description,
        thumbnail: submission.thumbnail,
        screenshots: submission.screenshots,
        downloadLink: submission.downloadLink,
        category: submission.category,
        tags: submission.tags,
        version: '1.0.0',
        fileSize: 'Unknown',
        author: {
          id: `creator-${Date.now()}`,
          name: submission.authorName,
          username: submission.authorName.toLowerCase().replace(/\s+/g, ''),
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + submission.authorName,
          bio: 'VoidForge Creator',
          skills: [],
          badges: [],
          role: 'Creator',
        },
        views: 0,
        downloads: 0,
        likes: 0,
        featured: false,
        trending: false,
        verified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        changelog: '',
      };

      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });

      await fetch('/api/submissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: submission.id, status: 'approved' }),
      });

      fetchSubmissions();
    } catch (error) {
      console.error('Failed to approve submission:', error);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Reason for rejection:');
    if (!reason) return;

    try {
      await fetch('/api/submissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'rejected', rejectionReason: reason }),
      });

      fetchSubmissions();
    } catch (error) {
      console.error('Failed to reject submission:', error);
    }
  };

  const pending = submissions.filter((s) => s.status === 'pending');
  const approved = submissions.filter((s) => s.status === 'approved');
  const rejected = submissions.filter((s) => s.status === 'rejected');

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Submission Queue</h1>
          <p className="text-gray-400">Review and manage user submissions</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          <button className="px-4 py-2 border-b-2 border-purple-600 text-white font-semibold">
            Pending ({pending.length})
          </button>
          <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
            Approved ({approved.length})
          </button>
          <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
            Rejected ({rejected.length})
          </button>
        </div>

        {/* Pending Submissions */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : pending.length > 0 ? (
          <div className="space-y-4">
            {pending.map((submission) => (
              <div
                key={submission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-2">{submission.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{submission.description}</p>
                      <div className="flex gap-2">
                        <span className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-xs">
                          {submission.category}
                        </span>
                        <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs">
                          By {submission.authorName}
                        </span>
                      </div>
                    </div>

                    <div>
                      {submission.thumbnail && (
                        <img
                          src={submission.thumbnail}
                          alt={submission.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      )}
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="text-sm text-gray-400">
                        <p>
                          <strong>Author:</strong> {submission.authorName}
                        </p>
                        <p>
                          <strong>Email:</strong> {submission.authorEmail}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprove(submission)}
                          className="flex-1 gap-1"
                        >
                          <CheckCircle className="w-4 h-4" /> Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleReject(submission.id)}
                          className="flex-1 gap-1"
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No pending submissions</p>
          </Card>
        )}
      </div>
    </div>
  );
}
