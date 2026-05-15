'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Submission } from '@/types';

const categories = ['Discord Tools', 'Minecraft Resources', 'Gaming Templates', 'Graphics & Logos', 'Configs', 'Other'];

export default function SubmitProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    downloadLink: '',
    category: categories[0],
    tags: '',
    authorName: '',
    authorEmail: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (file: File, type: 'thumbnail' | 'screenshot') => {
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('type', type);

    try {
      setUploadProgress(50);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();
      setUploadProgress(100);

      if (type === 'thumbnail') {
        setThumbnail(data.secure_url || data.url);
      } else {
        setScreenshots((prev) => [...prev, data.secure_url || data.url]);
      }

      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submission: Submission = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        thumbnail: thumbnail || 'https://via.placeholder.com/500x300',
        screenshots: screenshots,
        downloadLink: formData.downloadLink,
        category: formData.category,
        tags: formData.tags.split(',').map((t) => t.trim()),
        authorName: formData.authorName,
        authorEmail: formData.authorEmail,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/explore'), 3000);
      }
    } catch (error) {
      console.error('Failed to submit project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div
        <div className="text-center">
          <Card className="p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Submission Received!</h2>
            <p className="text-gray-400 mb-6">Your project has been submitted for review. Our team will approve it shortly.</p>
            <Button variant="primary" onClick={() => router.push('/explore')}>
              Back to Explore
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Submit Your Project</h1>
          <p className="text-xl text-gray-400">Share your creation with the VoidForge community. Our team will review and approve your submission.</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Project Details</h2>

              <Input
                label="Project Title"
                type="text"
                name="title"
                placeholder="e.g. Amazing Discord Bot"
                value={formData.title}
                onChange={handleInputChange}
                required
              />

              <Textarea
                label="Description"
                name="description"
                placeholder="Describe your project in detail"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <Input
                  label="Download Link"
                  type="url"
                  name="downloadLink"
                  placeholder="https://example.com/download"
                  value={formData.downloadLink}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Input
                label="Tags (comma-separated)"
                type="text"
                name="tags"
                placeholder="discord, bot, typescript"
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>

            {/* Author Info */}
            <div className="space-y-6 border-t border-gray-700 pt-8">
              <h2 className="text-2xl font-bold">Your Information</h2>

              <Input
                label="Your Name"
                type="text"
                name="authorName"
                placeholder="Your name"
                value={formData.authorName}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Your Email"
                type="email"
                name="authorEmail"
                placeholder="your@email.com"
                value={formData.authorEmail}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Images */}
            <div className="space-y-6 border-t border-gray-700 pt-8">
              <h2 className="text-2xl font-bold">Images</h2>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail</label>
                <div className="border-2 border-dashed border-purple-600/50 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                  {thumbnail ? (
                    <div className="relative inline-block">
                      <img src={thumbnail} alt="Thumbnail" className="w-32 h-32 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => setThumbnail('')}
                        className="absolute top-1 right-1 bg-red-600 rounded-full p-1"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Click to upload thumbnail</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'thumbnail')}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Screenshots</label>
                <div className="border-2 border-dashed border-purple-600/50 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                  <label className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Click to upload screenshots</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        Array.from(e.target.files || []).forEach((file) =>
                          handleFileUpload(file, 'screenshot')
                        );
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                {screenshots.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {screenshots.map((screenshot, index) => (
                      <div key={index} className="relative">
                        <img src={screenshot} alt={`Screenshot ${index}`} className="w-full h-24 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => setScreenshots((prev) => prev.filter((_, i) => i !== index))}
                          className="absolute top-1 right-1 bg-red-600 rounded-full p-1"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" variant="primary" size="lg" loading={loading} className="flex-1">
                Submit Project
              </Button>
              <Button type="button" variant="secondary" size="lg" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>

            <p className="text-center text-gray-400 text-sm">
              By submitting, you agree to our Terms of Service and acknowledge our moderation process.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
