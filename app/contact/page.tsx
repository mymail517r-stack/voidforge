'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending
    setTimeout(() => {
      setLoading(false);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-400">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </motion.div>

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
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <Input
              label="Subject"
              type="text"
              name="subject"
              placeholder="How can we help?"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />

            <Textarea
              label="Message"
              name="message"
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
            />

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
