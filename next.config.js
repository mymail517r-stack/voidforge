/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'api.dicebear.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: '*.cloudinary.com' },
      { hostname: 'via.placeholder.com' },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
