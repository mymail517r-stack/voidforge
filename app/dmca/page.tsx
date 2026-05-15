'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

export default function DMCAPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold mb-12">DMCA Notice</h1>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Copyright Infringement</h2>
              <p className="text-gray-400 mb-4">
                VoidForge respects intellectual property rights. If you believe content on our platform infringes your copyright, please submit a DMCA notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Filing a DMCA Notice</h2>
              <p className="text-gray-400 mb-4">
                Include the following information:
              </p>
              <ul className="text-gray-400 list-disc list-inside space-y-2">
                <li>Your identification and contact information</li>
                <li>Description of the copyrighted work</li>
                <li>Specific URL or description of infringing material</li>
                <li>Statement of good faith belief</li>
                <li>Your physical or electronic signature</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Submitting Your Notice</h2>
              <p className="text-gray-400">
                Send DMCA notices to: dmca@voidforge.dev
              </p>
              <p className="text-gray-400 mt-4">
                We will investigate all valid claims and remove infringing content as appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Counter Notification</h2>
              <p className="text-gray-400">
                If you believe content was wrongfully removed, you may submit a counter notification. Contact us for more information.
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
