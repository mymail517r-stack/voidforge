'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <Card className="p-12 max-w-md">
          <div className="text-6xl font-black gradient-text mb-4">404</div>
          <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Link href="/">
            <Button variant="primary" size="lg" className="w-full">
              Back to Home
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
}
