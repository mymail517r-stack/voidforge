'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const categories = ['Games', 'Tools', 'Plugins', 'Mods', 'Assets'];

export default function AdminUploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    category: 'Games',
    tags: '',
    version: '1.0.0',
    fileSize: '100MB',
    downloadLink: '',
    changelog: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()),
          thumbnail: 'https://via.placeholder.com/800x450?text=' + encodeURIComponent(form.title),
          screenshots: [],
        }),
      });

      if (response.ok) {
        router.push('/admin/projects');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Upload New Project</h1>
          <p className="text-gray-400">Add a new project to VoidForge</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Project Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
            />

            <Textarea
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief description"
              required
            />

            <Textarea
              label="Full Content"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Detailed content about your project"
              required
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-900 border border-purple-900/30 rounded-lg focus:outline-none focus:border-purple-600"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Version"
                name="version"
                value={form.version}
                onChange={handleChange}
                placeholder="1.0.0"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="File Size"
                name="fileSize"
                value={form.fileSize}
                onChange={handleChange}
                placeholder="100MB"
              />

              <Input
                label="Download Link"
                name="downloadLink"
                value={form.downloadLink}
                onChange={handleChange}
                placeholder="https://example.com/download"
              />
            </div>

            <Input
              label="Tags (comma-separated)"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="tag1, tag2, tag3"
            />

            <Textarea
              label="Changelog"
              name="changelog"
              value={form.changelog}
              onChange={handleChange}
              placeholder="Latest changes and updates"
            />

            <Button type="submit" disabled={loading} className="w-full">
              <Upload className="w-4 h-4 mr-2" /> {loading ? 'Uploading...' : 'Upload Project'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
