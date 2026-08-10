/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'allahuakbarofficial.com',
      },
    ],
  },
};

module.exports = nextConfig;
