/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ],
  },
}

export default nextConfig