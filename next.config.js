/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cloudflare-ipfs.com', 'localhost']
  },
  swcMinify: true
}

module.exports = nextConfig
