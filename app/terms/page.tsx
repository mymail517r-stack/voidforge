'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold mb-12">Terms of Service</h1>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-400">
                By accessing VoidForge, you agree to these Terms of Service. If you disagree with any part, please do not use the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. User Responsibilities</h2>
              <p className="text-gray-400 mb-4">
                Users agree to:
              </p>
              <ul className="text-gray-400 list-disc list-inside space-y-2">
                <li>Not upload illegal or infringing content</li>
                <li>Not spam or harass other users</li>
                <li>Not attempt to hack or compromise platform security</li>
                <li>Respect intellectual property rights</li>
                <li>Follow all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Content Ownership</h2>
              <p className="text-gray-400">
                Users retain ownership of content they upload. By uploading, users grant VoidForge a license to distribute their content on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
              <p className="text-gray-400">
                VoidForge is provided "as is" without warranties. We are not liable for any damages arising from platform use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
              <p className="text-gray-400">
                We may terminate user accounts that violate these terms or engage in harmful behavior.
              </p>
            </section>

            <div className="pt-8 border-t border-gray-800">
              <p className="text-gray-400 text-sm">Last Updated: May 15, 2026</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
