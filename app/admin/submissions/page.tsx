'use client';

import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Submission {
  id: string;
  title: string;
  author: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const response = await fetch('/api/submissions');
    if (response.ok) {
      const data = await response.json();
      setSubmissions(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    await fetch('/api/submissions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchSubmissions();
  };

  const pending = submissions.filter((s) => s.status === 'pending');
  const approved = submissions.filter((s) => s.status === 'approved');
  const rejected = submissions.filter((s) => s.status === 'rejected');

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Submission Queue</h1>
          <p className="text-gray-400">Review and manage user submissions</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          {[
            { id: 'pending', label: 'Pending', count: pending.length },
            { id: 'approved', label: 'Approved', count: approved.length },
            { id: 'rejected', label: 'Rejected', count: rejected.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-white font-semibold'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {(activeTab === 'pending' ? pending : activeTab === 'approved' ? approved : rejected).map((submission) => (
              <Card key={submission.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{submission.title}</h3>
                    <p className="text-gray-400 text-sm">By {submission.author} ({submission.email})</p>
                    <p className="text-gray-500 text-xs mt-2">{new Date(submission.createdAt).toLocaleDateString()}</p>
                  </div>
                  {activeTab === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => updateStatus(submission.id, 'approved')}
                      >
                        <Check className="w-4 h-4" /> Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => updateStatus(submission.id, 'rejected')}
                      >
                        <X className="w-4 h-4" /> Reject
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
            {(activeTab === 'pending' ? pending : activeTab === 'approved' ? approved : rejected).length === 0 && (
              <Card className="p-8 text-center text-gray-400">
                No {activeTab} submissions
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
