'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Thank you for your message!');
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-400">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <Mail className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-gray-400 text-sm">support@voidforge.dev</p>
          </Card>
          <Card className="p-6">
            <MessageCircle className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="font-bold mb-2">Discord</h3>
            <p className="text-gray-400 text-sm">Join our Discord community</p>
          </Card>
          <Card className="p-6">
            <Mail className="w-8 h-8 text-pink-400 mb-3" />
            <h3 className="font-bold mb-2">Response Time</h3>
            <p className="text-gray-400 text-sm">Usually within 24 hours</p>
          </Card>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
              <Input
                label="Your Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <Input
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              required
            />

            <Textarea
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message here..."
              required
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
