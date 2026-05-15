import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'VoidForge - Premium Gaming & Creator Platform',
  description: 'Discover and share premium gaming resources, Discord tools, Minecraft mods, and digital assets on VoidForge.',
  keywords: 'gaming, discord, minecraft, resources, templates, graphics',
  openGraph: {
    title: 'VoidForge - Premium Gaming & Creator Platform',
    description: 'Discover and share premium gaming resources on VoidForge.',
    type: 'website',
    url: 'https://voidforge.dev',
    images: [{ url: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=630&fit=crop' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        </div>

        <Navbar />
        <main className="relative min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
