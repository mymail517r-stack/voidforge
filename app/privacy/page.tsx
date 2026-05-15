'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold mb-12">Privacy Policy</h1>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-gray-400 mb-4">
                We collect information you provide when creating an account, submitting projects, or contacting us.
                This includes your name, email, Discord username, and project details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-400 mb-4">
                We use your information to:
              </p>
              <ul className="text-gray-400 list-disc list-inside space-y-2">
                <li>Provide and maintain the VoidForge platform</li>
                <li>Process project submissions and approvals</li>
                <li>Send important notifications and updates</li>
                <li>Improve our services and user experience</li>
                <li>Prevent fraud and ensure platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
              <p className="text-gray-400">
                We implement industry-standard security measures to protect your data. However, no transmission over the
                internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
              <p className="text-gray-400">
                We use Cloudinary for image hosting and storage. Please review their privacy policy for details on how
                they handle your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
              <p className="text-gray-400">
                If you have privacy concerns, please contact us at privacy@voidforge.dev
              </p>
            </section>

            <div className="pt-8 border-t border-gray-800">
              <p className="text-gray-400 text-sm">Last Updated: May 15, 2026</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
