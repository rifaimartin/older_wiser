/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.focusonthefamily.com',
      },
      {
        protocol: 'https',
        hostname: '30dayfitness.app',
      },
      {
        protocol: 'https',
        hostname: 'blog.smarthealthshop.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bria.com.ph',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/api/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/apiundefined**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig