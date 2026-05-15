'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function SubmitPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    author: '',
    email: '',
    description: '',
    content: '',
    downloadLink: '',
    category: 'Games',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert('Thank you for your submission! We will review it shortly.');
        setForm({
          title: '',
          author: '',
          email: '',
          description: '',
          content: '',
          downloadLink: '',
          category: 'Games',
        });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Submit Your Project</h1>
          <p className="text-xl text-gray-400">
            Share your amazing work with our community of gamers and creators.
          </p>
        </div>

        <Card className="p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-bold mb-2">Quality Matters</h3>
              <p className="text-gray-400 text-sm">All submissions are reviewed for quality and originality.</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold mb-2">Reach Millions</h3>
              <p className="text-gray-400 text-sm">Your project will be seen by thousands of potential users.</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-bold mb-2">Grow Your Brand</h3>
              <p className="text-gray-400 text-sm">Showcase your skills and build your creator portfolio.</p>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Project Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter an awesome project name"
              required
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Your Name"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Your name"
                required
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-900 border border-purple-900/30 rounded-lg focus:outline-none focus:border-purple-600"
              >
                <option value="Games">Games</option>
                <option value="Tools">Tools</option>
                <option value="Plugins">Plugins</option>
                <option value="Mods">Mods</option>
                <option value="Assets">Assets</option>
                <option value="Templates">Templates</option>
              </select>
            </div>

            <Textarea
              label="Brief Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="One line description of your project"
              required
            />

            <Textarea
              label="Detailed Description"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Tell us more about your project, features, and what makes it special"
              required
            />

            <Input
              label="Download Link"
              name="downloadLink"
              value={form.downloadLink}
              onChange={handleChange}
              placeholder="https://example.com/download"
              required
            />

            <Button type="submit" disabled={loading} className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              {loading ? 'Submitting...' : 'Submit Project'}
            </Button>

            <p className="text-gray-400 text-sm">
              By submitting, you agree that your project meets our quality standards and doesn't infringe on any copyrights.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
