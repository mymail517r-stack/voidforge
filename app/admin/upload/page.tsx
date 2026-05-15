'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Project } from '@/types';

const categories = [
  'Discord Tools',
  'Minecraft Resources',
  'Gaming Templates',
  'Graphics & Logos',
  'Configs',
  'Other',
];

export default function AdminUploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    downloadLink: '',
    category: categories[0],
    tags: '',
    version: '1.0.0',
    fileSize: '',
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
      const project: Project = {
        id: Date.now().toString(),
        title: formData.title,
        slug: formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
        description: formData.description,
        content: formData.content,
        thumbnail: thumbnail || 'https://via.placeholder.com/500x300',
        screenshots: screenshots,
        downloadLink: formData.downloadLink,
        category: formData.category,
        tags: formData.tags.split(',').map((t) => t.trim()),
        version: formData.version,
        fileSize: formData.fileSize,
        author: {
          id: 'admin',
          name: 'VoidForge Admin',
          username: 'admin',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
          bio: 'Platform Administrator',
          skills: [],
          badges: ['admin'],
          role: 'Administrator',
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

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to upload project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Upload New Project</h1>
          <p className="text-gray-400">Add a new resource to VoidForge</p>
        </motion.div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Project Details</h2>

              <Input
                label="Project Title"
                type="text"
                name="title"
                placeholder="e.g. Ultimate Discord Bot Framework"
                value={formData.title}
                onChange={handleInputChange}
                required
              />

              <Textarea
                label="Description"
                name="description"
                placeholder="Brief description of your project"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
              />

              <Textarea
                label="Full Content (Markdown)"
                name="content"
                placeholder="Detailed project description in Markdown"
                value={formData.content}
                onChange={handleInputChange}
                rows={5}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <Input
                  label="Version"
                  type="text"
                  name="version"
                  placeholder="1.0.0"
                  value={formData.version}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="File Size"
                  type="text"
                  name="fileSize"
                  placeholder="e.g. 45.2 MB"
                  value={formData.fileSize}
                  onChange={handleInputChange}
                />

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
                placeholder="discord, bot, typescript, framework"
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-6 border-t border-gray-700 pt-8">
              <h2 className="text-2xl font-bold">Images</h2>

              {/* Thumbnail */}
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
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
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
                {uploadProgress > 0 && <div className="mt-2 w-full bg-gray-700 rounded-full h-1"><div className="bg-purple-600 h-1 rounded-full" style={{ width: `${uploadProgress}%` }}></div></div>}
              </div>

              {/* Screenshots */}
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
                Publish Project
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
