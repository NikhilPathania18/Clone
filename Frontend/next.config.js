/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'classroom-training-bucket.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/abc/**',
      },
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
